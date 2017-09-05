

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
    languages: {
      available: ['Afrikaans', 'Albanian', 'Arabic', 'Armenian', 'Asturian', 'Azerbaijani', 'Basque', 'Belarusian', 'Bengali', 'Bosnian', 'Breton', 'Bulgarian', 'Burmese', 'Catalan', 'Chinese (simplified)', 'Chinese (traditional)', 'Chinese bilingual', 'Croatian', 'Czech', 'Danish', 'Dutch', 'English', 'Esperanto', 'Estonian', 'Extremaduran', 'Finnish', 'French', 'Galician', 'Georgian', 'German', 'Greek', 'Hebrew', 'Hindi', 'Hungarian', 'Icelandic', 'Indonesian', 'Italian', 'Japanese', 'Kannada', 'Kazakh', 'Khmer', 'Korean', 'Kurdish', 'Latvian', 'Lithuanian', 'Luxembourgish', 'Macedonian', 'Malay', 'Malayalam', 'Manipuri', 'Mongolian', 'Montenegrin', 'Norwegian', 'Occitan', 'Persian', 'Polish', 'Portuguese', 'Portuguese (BR)', 'Portuguese (MZ)', 'Romanian', 'Russian', 'Serbian', 'Sinhalese', 'Slovak', 'Slovenian', 'Spanish', 'Swahili', 'Swedish', 'Syriac', 'Tagalog', 'Tamil', 'Telugu', 'Thai', 'Turkish', 'Ukrainian', 'Urdu', 'Vietnamese'],
      favorites: ['English', 'French', 'German', 'Hindi', 'Italian', 'Japanese', 'Portuguese', 'Russian', 'Spanish']
    },
    opensubtitles: {
      userAgent: 'My Application v0.1', //TODO: Register app
      token: false //TODO: Implement this
    }
  },
  inquirer: {
    rows: 10
  }
};

/* EXPORT */

export default Config;
