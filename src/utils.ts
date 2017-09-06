
/* IMPORT */

import * as _ from 'lodash';
import * as chalk from 'chalk';
import * as filesizeParser from 'filesize-parser';
import * as inquirer from 'inquirer';
import prompt from 'inquirer-helpers';
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

    parseList ( list: string[], favorites: string[] = [] ) {

      list = _.difference ( list, favorites );

      if ( !list.length ) return favorites;
      if ( !favorites.length ) return list;

      return [...favorites, new inquirer.Separator (), ...list]; //FIXME: Proper separator width

    },

    async title ( message, titles ) {

      /* TABLE */

      let table: string[][] = [];

      titles.forEach ( title => {

        const row: string[] = [];

        row.push ( Utils.torrent.parseTitle ( title.title ) );

        if ( Config.torrents.details.seeders ) row.push ( title.seeds );
        if ( Config.torrents.details.leechers ) row.push ( title.peers );
        if ( Config.torrents.details.size ) row.push ( Utils.torrent.parseSize ( title.size ) );
        if ( Config.torrents.details.time ) row.push ( title.time );

        table.push ( row );

      });

      /* COLORS */

      const colors = [undefined, 'green', 'red', 'yellow', 'magenta'];

      return await prompt.table ( message, table, titles, colors );

    },

    async subtitles ( message, subtitlesAll ) {

      /* TABLE */

      let table: string[][] = [];

      subtitlesAll.forEach ( subtitles => {

        const row: string[] = [];

        row.push ( Utils.subtitles.parseTitle ( subtitles.filename ) );

        if ( Config.subtitles.details.downloads ) row.push ( subtitles.downloads );

        table.push ( row );

      });

      /* COLORS */

      const colors = [undefined, 'green'];

      return await prompt.table ( message, table, subtitlesAll, colors );

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

      appRe: new RegExp ( `^--(${Config.outputs.supported.join ( '|' )})$`, 'i' ),
      subtitlesRe: /--subtitles/i,

      isOptionSet ( options: string[], regex ) {

        return !!options.find ( option => !!option.match ( regex ) );

      },

      isAppSet ( options: string[] ) {

        return Utils.webtorrent.options.isOptionSet ( options, Utils.webtorrent.options.appRe );

      },

      isSubtitlesSet ( options: string[] ) {

        return Utils.webtorrent.options.isOptionSet ( options, Utils.webtorrent.options.subtitlesRe );

      },

      setApp ( options: string[], app: string ) {

        options.push ( `--${app.toLowerCase ()}` );

        return options;

      },

      setSubtitles ( options: string[], subtitles: string ) {

        options.push ( `--subtitles`, subtitles );

        return options;

      },

      parse ( dynamics: string[], defaults: string[] = [] ) {

        /* ENSURING NO DUPLICATE --APP SWITCH */

        if ( Utils.webtorrent.options.isAppSet ( dynamics ) && Utils.webtorrent.options.isAppSet ( defaults ) ) {

          defaults = defaults.filter ( option => !option.match ( Utils.webtorrent.options.appRe ) );

        }

        /* OPTIONS */

        const options = defaults.concat ( dynamics );

        /* ENSURING --APP SWITCH */

        if ( ( Config.outputs.available.length || Config.outputs.favorites.length ) && !Utils.webtorrent.options.isAppSet ( dynamics ) ) {

          dynamics = Utils.webtorrent.options.setApp ( dynamics, Config.outputs.favorites[0] || Config.outputs.supported[0] );

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
