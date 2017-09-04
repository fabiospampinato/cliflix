
/* IMPORT */

import * as _ from 'lodash';
import * as chalk from 'chalk';
import {exec, spawn} from 'child_process';
import * as filesizeParser from 'filesize-parser';
import * as inquirer from 'inquirer';
import * as isOnline from 'is-online';
import * as path from 'path';
import * as pify from 'pify';
import * as prettySize from 'prettysize';
import Config from './config';

/* UTILS */

const Utils = {

  exec ( command, options = {} ) {

    const cwd = path.resolve ( __dirname, '..' ); // In order to properly call programs under `/node_modules/.bin`

    return pify ( exec )( command, _.extend ( {cwd}, options ) );

  },

  spawn ( command, args: string[] = [], options = {} ) {

    const cwd = path.resolve ( __dirname, '..' ); // In order to properly call programs under `/node_modules/.bin`

    spawn ( command, args, _.extend ( {cwd}, options ) ); //TSC: can't return

  },

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

      /* TABLE */

      const table: string[][] = [];

      titles.forEach ( title => {

        const row: string[] = [];

        row.push ( Utils.torrent.parseTitle ( title.title ) );

        if ( Config.details.seeders ) row.push ( chalk.green ( `${title.seeds}` ) );
        if ( Config.details.leechers ) row.push ( chalk.red ( `${title.peers}` ) );
        if ( Config.details.size ) row.push ( chalk.yellow ( Utils.torrent.parseSize ( title.size ) ) );
        if ( Config.details.time ) row.push ( chalk.magenta ( title.time ) );

        table.push ( row );

      });

      /* PADDING */

      const row = table[0];

      row.forEach ( ( x, index ) => {

        const maxLength = _.max ( table.map ( row => row[index].length ) ),
              padFN = index > 0 ? 'padStart' : 'padEnd';

        table.forEach ( row => row[index] = _[padFN]( row[index], maxLength ) );

      });

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
                  .replace ( /- -/, '-' ) // Empty block between dashes
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

  }

};

/* EXPORT */

export default Utils;
