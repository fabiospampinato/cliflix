
/* IMPORT */

import * as _ from 'lodash';
import * as chalk from 'chalk';
import * as cliWidth from 'cli-width';
import * as truncate from 'cli-truncate';
import * as filesizeParser from 'filesize-parser';
import * as inquirer from 'inquirer';
import * as isOnline from 'is-online';
import * as prettySize from 'prettysize';
import * as request from 'request-promise-native';
import * as temp from 'temp';
import Config from './config';

/* UTILS */

const Utils = {

  async checkConnection () {

    const online = await isOnline ();

    if ( !online ) throw new Error ( chalk.red ( `Looks like you are offline, try again later.\n` ) ) ;

  },

  prompt: {

    parseArr ( arr, favorites: string[] = [] ) {

      arr = _.difference ( arr, favorites );

      if ( !arr.length ) return favorites;
      if ( !favorites.length ) return arr;

      return [...favorites, new inquirer.Separator (), ...arr]; //FIXME: Proper separator width

    },

    async confirm ( message: string, fallback = false ) {

      const {result} = await inquirer.prompt ({
        type: 'confirm',
        name: 'result',
        message,
        default: fallback
      });

      return !!result;

    },

    async noYes ( message: string ) {

      return await Utils.prompt.list ( message, ['No', 'Yes'] ) === 'Yes';

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

      if ( arr.length > Config.inquirer.rows ) arr.push ( new inquirer.Separator ( '\n' ) );

      const {result} = await inquirer.prompt ({
        type: 'list',
        name: 'result',
        choices: arr,
        pageSize: Config.inquirer.rows,
        message,
        default: fallback,
        validate: x => !_.isUndefined ( fallback ) || ( _.isString ( x ) && x.trim () )
      });

      return result;

    },

    async title ( message, titles ) {

      const maxWidth = cliWidth ({ defaultWidth: 80 }) - 6; // Accounting for inquirer's characters too

      /* TABLE */

      let table: string[][] = [];

      titles.forEach ( title => {

        const row: string[] = [];

        row.push ( truncate ( Utils.torrent.parseTitle ( title.title ), maxWidth ) );

        if ( Config.torrents.details.seeders ) row.push ( `${title.seeds}` );
        if ( Config.torrents.details.leechers ) row.push ( `${title.peers}` );
        if ( Config.torrents.details.size ) row.push ( Utils.torrent.parseSize ( title.size ) );
        if ( Config.torrents.details.time ) row.push ( title.time );

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

    },

    async subtitles ( message, subtitles ) { //TODO

      const list = subtitles.map ( subtitle => ({
        name: Utils.subtitles.parseTitle ( subtitle.filename ),
        value: subtitle
      }));

      return Utils.prompt.list ( 'Which subtitles?', list );

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

  subtitles: {

    parseTitle ( title ) {

      return title.replace ( /\.srt$/i, '' ); // Extension

    },

    async download ( url ) {

      temp.track ();

      const content = await request ( url ),
            stream = temp.createWriteStream ();

      stream.write ( content );
      stream.end ();

      return stream;

    }

  },

  webtorrent: {

    options: {

      isOptionSet ( options: string[], regex ) {

        return !!options.find ( option => !!option.match ( regex ) );

      },

      isAppSet ( options: string[] ) {

        const appRe = new RegExp ( `^--(${Config.outputs.supported.join ( '|' )})$`, 'i' );

        return Utils.webtorrent.options.isOptionSet ( options, appRe );

      },

      isSubtitlesSet ( options: string[] ) {

        const subtitlesRe = /--subtitles/i;

        return Utils.webtorrent.options.isOptionSet ( options, subtitlesRe );

      },

      setApp ( options: string[], app: string ) {

        options.push ( `--${app.toLowerCase ()}` );

        return options;

      },

      setSubtitles ( options: string[], subtitles: string ) {

        options.push ( `--subtitles`, subtitles );

        return options;

      },

      parse ( options: string[] ) {

        /* ENSURING --APP SWITCH */

        if ( !Utils.webtorrent.options.isAppSet ( options ) ) {

          options = Utils.webtorrent.options.setApp ( options, Config.outputs.favorites[0] );

        }

        /* RETURN */

        return options;

      }

    }

  },

  language: {

    codes: ['afr', 'alb', 'ara', 'arm', 'ast', 'aze', 'baq', 'bel', 'ben', 'bos', 'bre', 'bul', 'bur', 'cat', 'chi', 'zht', 'zhe', 'hrv', 'cze', 'dan', 'dut', 'eng', 'epo', 'est', 'ext', 'fin', 'fre', 'glg', 'geo', 'ger', 'ell', 'heb', 'hin', 'hun', 'ice', 'ind', 'ita', 'jpn', 'kan', 'kaz', 'khm', 'kor', 'kur', 'lav', 'lit', 'ltz', 'mac', 'may', 'mal', 'mni', 'mon', 'mne', 'nor', 'oci', 'per', 'pol', 'por', 'pob', 'pom', 'rum', 'rus', 'scc', 'sin', 'slo', 'slv', 'spa', 'swa', 'swe', 'syr', 'tgl', 'tam', 'tel', 'tha', 'tur', 'ukr', 'urd', 'vie'],
    names: ['Afrikaans', 'Albanian', 'Arabic', 'Armenian', 'Asturian', 'Azerbaijani', 'Basque', 'Belarusian', 'Bengali', 'Bosnian', 'Breton', 'Bulgarian', 'Burmese', 'Catalan', 'Chinese (simplified)', 'Chinese (traditional)', 'Chinese bilingual', 'Croatian', 'Czech', 'Danish', 'Dutch', 'English', 'Esperanto', 'Estonian', 'Extremaduran', 'Finnish', 'French', 'Galician', 'Georgian', 'German', 'Greek', 'Hebrew', 'Hindi', 'Hungarian', 'Icelandic', 'Indonesian', 'Italian', 'Japanese', 'Kannada', 'Kazakh', 'Khmer', 'Korean', 'Kurdish', 'Latvian', 'Lithuanian', 'Luxembourgish', 'Macedonian', 'Malay', 'Malayalam', 'Manipuri', 'Mongolian', 'Montenegrin', 'Norwegian', 'Occitan', 'Persian', 'Polish', 'Portuguese', 'Portuguese (BR)', 'Portuguese (MZ)', 'Romanian', 'Russian', 'Serbian', 'Sinhalese', 'Slovak', 'Slovenian', 'Spanish', 'Swahili', 'Swedish', 'Syriac', 'Tagalog', 'Tamil', 'Telugu', 'Thai', 'Turkish', 'Ukrainian', 'Urdu', 'Vietnamese'],

    getCode ( name ) {

      const {codes, names} = Utils.language;

      return codes[_.indexOf ( names, name )];

    },

    getName ( code ) {

      const {codes, names} = Utils.language;

      return names[_.indexOf ( codes, code )];

    }

  }

};

/* EXPORT */

export default Utils;
