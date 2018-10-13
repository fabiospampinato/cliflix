
/* IMPORT */

import * as _ from 'lodash';
import chalk from 'chalk';
import * as fs from 'fs';
import * as JSON5 from 'json5';
import * as localeCode from 'locale-code';
import * as os from 'os';
import * as osLocale from 'os-locale';
import * as path from 'path';
import prompt from 'inquirer-helpers';

/* CONFIG */

const Config = {
  localConfigPath: path.join ( os.homedir (), '.cliflix.json' ),
  downloads: {
    path: path.join ( os.homedir (), 'Downloads' ),
    save: true
  },
  outputs: {
    supported: ['Airplay', 'Chromecast', 'DLNA', 'MPlayer', 'mpv', 'omx', 'VLC', 'IINA', 'XBMC', 'stdout'],
    available: ['Airplay', 'Chromecast', 'DLNA', 'MPlayer', 'mpv', 'VLC', 'IINA', 'XBMC'],
    favorites: ['VLC']
  },
  torrents: {
    limit: 30,
    details: {
      seeders: true,
      leechers: true,
      size: true,
      time: false
    },
    providers: {
      available: ['1337x', 'ThePirateBay', 'ExtraTorrent', 'Rarbg', 'Torrent9', 'KickassTorrents', 'TorrentProject', 'Torrentz2'],
      active: '1337x'
    }
  },
  subtitles: {
    limit: 30,
    details: {
      downloads: true
    },
    languages: {
      available: ['Afrikaans', 'Albanian', 'Arabic', 'Armenian', 'Asturian', 'Azerbaijani', 'Basque', 'Belarusian', 'Bengali', 'Bosnian', 'Breton', 'Bulgarian', 'Burmese', 'Catalan', 'Chinese (simplified)', 'Chinese (traditional)', 'Chinese bilingual', 'Croatian', 'Czech', 'Danish', 'Dutch', 'English', 'Esperanto', 'Estonian', 'Extremaduran', 'Finnish', 'French', 'Galician', 'Georgian', 'German', 'Greek', 'Hebrew', 'Hindi', 'Hungarian', 'Icelandic', 'Indonesian', 'Italian', 'Japanese', 'Kannada', 'Kazakh', 'Khmer', 'Korean', 'Kurdish', 'Latvian', 'Lithuanian', 'Luxembourgish', 'Macedonian', 'Malay', 'Malayalam', 'Manipuri', 'Mongolian', 'Montenegrin', 'Norwegian', 'Occitan', 'Persian', 'Polish', 'Portuguese', 'Portuguese (BR)', 'Portuguese (MZ)', 'Romanian', 'Russian', 'Serbian', 'Sinhalese', 'Slovak', 'Slovenian', 'Spanish', 'Swahili', 'Swedish', 'Syriac', 'Tagalog', 'Tamil', 'Telugu', 'Thai', 'Turkish', 'Ukrainian', 'Urdu', 'Vietnamese'],
      favorites: ['English', 'French', 'German', 'Hindi', 'Italian', 'Japanese', 'Portuguese', 'Russian', 'Spanish']
    },
    opensubtitles: {
      useragent: 'PlayMe v1',
      username: null,
      password: null,
      ssl: true
    }
  },
  webtorrent: {
    options: []
  },
  prompt: {
    fullscreen: true,
    rows: 10
  }
};

/* INIT */

function initPrompt () {

  prompt.FULLSCREEN = Config.prompt.fullscreen;
  prompt.PAGE_SIZE = Config.prompt.rows;

}

function initLocale () {

  const locale = osLocale.sync ().replace ( '_', '-' ),
        languageName = localeCode.getLanguageName ( locale ),
        language = Config.subtitles.languages.available.find ( language => language.startsWith ( languageName ) );

  if ( !language ) return;

  Config.subtitles.languages.favorites = _.uniq ([ language, ...Config.subtitles.languages.favorites ]);

}

function initLocalConfig () {

  try {

    const content = fs.readFileSync ( Config.localConfigPath, { encoding: 'utf8' } ).toString ();

    if ( !content || !content.trim () ) return;

    const localConfig = _.attempt ( JSON5.parse, content );

    if ( _.isError ( localConfig ) ) {

      console.error ( chalk.red ( `Error reading the configuration file (${chalk.bold ( Config.localConfigPath )}). Is it properly formatted JSON?` ) );

    } else {

      _.mergeWith ( Config, localConfig, ( prev, next ) => {
        if ( !_.isArray ( prev ) || !_.isArray ( next ) ) return;
        return next;
      });

    }

  } catch ( e ) {}

}

initLocale ();
initLocalConfig ();
initPrompt ();

/* EXPORT */

export default Config;
