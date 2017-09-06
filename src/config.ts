
/* IMPORT */

import * as _ from 'lodash';
import * as localeCode from 'locale-code';
import * as osLocale from 'os-locale';
import prompt from 'inquirer-helpers';

/* CONFIG */

const Config = {
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
    }
  },
  subtitles: {
    enabled: false, //FIXME: Not production-ready
    limit: 30,
    details: {
      downloads: true
    },
    languages: {
      available: ['Afrikaans', 'Albanian', 'Arabic', 'Armenian', 'Asturian', 'Azerbaijani', 'Basque', 'Belarusian', 'Bengali', 'Bosnian', 'Breton', 'Bulgarian', 'Burmese', 'Catalan', 'Chinese (simplified)', 'Chinese (traditional)', 'Chinese bilingual', 'Croatian', 'Czech', 'Danish', 'Dutch', 'English', 'Esperanto', 'Estonian', 'Extremaduran', 'Finnish', 'French', 'Galician', 'Georgian', 'German', 'Greek', 'Hebrew', 'Hindi', 'Hungarian', 'Icelandic', 'Indonesian', 'Italian', 'Japanese', 'Kannada', 'Kazakh', 'Khmer', 'Korean', 'Kurdish', 'Latvian', 'Lithuanian', 'Luxembourgish', 'Macedonian', 'Malay', 'Malayalam', 'Manipuri', 'Mongolian', 'Montenegrin', 'Norwegian', 'Occitan', 'Persian', 'Polish', 'Portuguese', 'Portuguese (BR)', 'Portuguese (MZ)', 'Romanian', 'Russian', 'Serbian', 'Sinhalese', 'Slovak', 'Slovenian', 'Spanish', 'Swahili', 'Swedish', 'Syriac', 'Tagalog', 'Tamil', 'Telugu', 'Thai', 'Turkish', 'Ukrainian', 'Urdu', 'Vietnamese'],
      favorites: ['English', 'French', 'German', 'Hindi', 'Italian', 'Japanese', 'Portuguese', 'Russian', 'Spanish']
    },
    opensubtitles: {
      useragent: 'My Application v0.1', //TODO: Register app
      username: null,
      password: null,
      ssl: true
    }
  },
  prompt: {
    rows: 10
  }
};

/* INIT */

function initPrompt () {

  prompt.PAGE_SIZE = Config.prompt.rows;

}

function initLocale () {

  const locale = osLocale.sync ().replace ( '_', '-' ),
        languageName = localeCode.getLanguageName ( locale ),
        language = Config.subtitles.languages.available.find ( language => language.startsWith ( languageName ) );

  if ( !language ) return;

  Config.subtitles.languages.favorites = _.uniq ([ language, ...Config.subtitles.languages.favorites ]);

}

initPrompt ();
initLocale ();

/* EXPORT */

export default Config;
