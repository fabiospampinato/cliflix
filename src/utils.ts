
/* IMPORT */

import * as _ from 'lodash';
import * as chalk from 'chalk';
import * as cliWidth from 'cli-width';
import * as truncate from 'cli-truncate';
import * as filesizeParser from 'filesize-parser';
import * as inquirer from 'inquirer';
import * as isOnline from 'is-online';
import * as prettySize from 'prettysize';
import Config from './config';

/* UTILS */

const Utils = {

  async checkConnection () {

    const online = await isOnline ();

    if ( !online ) throw new Error ( chalk.red ( `Looks like you are offline, try again later.\n` ) ) ;

  },

  prompt: {

    async confirm ( message: string, fallback = false ) {

      const {result} = await inquirer.prompt ({
        type: 'confirm',
        name: 'result',
        message,
        default: fallback
      });

      return !!result;

    },

    async input ( message, fallback? ) {

      const {result} = await inquirer.prompt ({
        type: 'input',
        name: 'result',
        message,
        default: fallback,
        validate: x => !_.isUndefined ( fallback ) || ( _.isString ( x ) && !!x.trim () )
      });

      return result;

    },

    async list ( message, arr, fallback? ) {

      if ( arr.length > Config.listNr ) arr.push ( new inquirer.Separator ( '\n' ) );

      const {result} = await inquirer.prompt ({
        type: 'list',
        name: 'result',
        choices: arr,
        pageSize: Config.listNr,
        message,
        default: fallback,
        validate: x => !_.isUndefined ( fallback ) || ( _.isString ( x ) && x.trim () )
      });

      return result;

    },

    async title ( message, titles ) {

      const maxWidth = cliWidth () - 6; // Accounting for inquirer's characters too

      /* TABLE */

      let table: string[][] = [];

      titles.forEach ( title => {

        const row: string[] = [];

        row.push ( truncate ( Utils.torrent.parseTitle ( title.title ), maxWidth ) );

        if ( Config.details.seeders ) row.push ( `${title.seeds}` );
        if ( Config.details.leechers ) row.push ( `${title.peers}` );
        if ( Config.details.size ) row.push ( Utils.torrent.parseSize ( title.size ) );
        if ( Config.details.time ) row.push ( title.time );

        table.push ( row );

      });

      /* FORMATTING */

      if ( table[0].length > 1 ) {

        /* MAX LENGHTS  */

        const maxLenghts = table[0].map ( ( val, index ) => _.max ( table.map ( row => row[index].length ) ) ),
              overflowColumn = maxLenghts.findIndex ( ( length, index ) => ( _.sum ( maxLenghts.slice ( 0, index + 1 ) ) + ( index * 4 ) ) > maxWidth ),
              maxColumn = overflowColumn >= 0 ? Math.max ( 0, overflowColumn - 1 ) : maxLenghts.length - 1;

        /* FILTERING */

        table = table.map ( row => row.slice ( 0, maxColumn + 1) );

        /* PADDING */

        table = table.map ( row => {
          return row.map ( ( val, index ) => {
            const padFN = index > 0 ? 'padStart' : 'padEnd';
            return _[padFN]( val, maxLenghts[index] );
          });
        });

        /* COLORIZE */

        const colors = [undefined, 'green', 'red', 'yellow', 'magenta'];

        table = table.map ( row => {
          return row.map ( ( val, index ) => {
            const color = colors[index];
            if ( !color ) return val;
            return chalk[color]( val );
          });
        });

      }

      /* JOINING */

      const list = table.map ( ( row, index ) => ({
        name: row.length > 1 ? `| ${row.join ( ' | ' )} |` : row[0],
        value: titles[index]
      }));

      /* INQUIRER */

      return await Utils.prompt.list ( message, list );

    }

  },

  torrent: {

    parseTitle ( title ) {

      return title.replace ( /\d+(\.\d+)? ?[k|m|g|t]b/gi, '' ) // Size info
                  .replace ( /\s\s+/g, ' ' ) // Multiple spaces
                  .replace ( /- -/g, '-' ) // Empty blocks between dashes
                  .replace ( /\s*-$/, '' ); // Ending dash

    },

    parseSize ( size ) {

      try {

        const bytes = filesizeParser ( size );

        return prettySize ( bytes, true, true, 1 );

      } catch ( e ) {

        return size;

      }

    }

  },

  webtorrent: {

    options: {

      isAppSet ( options: string[] ) {

        const appRe = new RegExp ( `^--(${Config.outputs.join ( '|' )})$`, 'i' ),
              isAppSet = !!options.find ( option => !!option.match ( appRe ) );

        return isAppSet;

      },

      setApp ( options: string[], app: string ) {

        options.push ( `--${app.toLowerCase ()}` );

        return options;

      },

      parse ( options: string[] ) {

        /* ENSURING --APP SWITCH */

        if ( !Utils.webtorrent.options.isAppSet ( options ) ) {

          options = Utils.webtorrent.options.setApp ( options, Config.output );

        }

        /* RETURN */

        return options;

      }

    }

  }

};

/* EXPORT */

export default Utils;
