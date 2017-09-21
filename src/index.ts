
/* IMPORT */

import * as execa from 'execa';
import * as OpenSubtitles from 'opensubtitles-api';
import * as parseTorrent from 'parse-torrent';
import * as path from 'path';
import prompt from 'inquirer-helpers';
import * as TorrentSearch from 'torrent-search-api';
import Config from './config';
import Utils from './utils';
import './temp';

/* CLIFIX */

const CLIFlix = {

  async wizard ( webtorrentOptions: string[] = [] ) {

    let query, titles;

    while ( !titles || !titles.length ) {

      query = await prompt.input ( 'What do you want to watch?' );
      titles = await CLIFlix.getTorrents ( query );

      if ( !titles.length ) console.error ( `No titles found for "${query}", try again.` );

    }

    const {title, magnet} = await Utils.prompt.title ( 'Which title?', titles );

    if ( ( Config.subtitles.languages.available.length || Config.subtitles.languages.favorites.length ) && !Utils.webtorrent.options.isSubtitlesSet ( webtorrentOptions ) ) {

      const subbed = await prompt.noYes ( 'Do you want subtitles?' );

      if ( subbed ) {

        const languageName = await prompt.list ( 'Which language?', Utils.prompt.parseList ( Config.subtitles.languages.available, Config.subtitles.languages.favorites ) ),
              languageCode = Utils.language.getCode ( languageName ),
              subtitlesAll = await CLIFlix.getSubtitles ( title, languageCode );

        if ( !subtitlesAll.length ) {

          const okay = await prompt.noYes ( `No subtitles found for "${languageName}", play it anyway?` );

          if ( !okay ) return;

        } else {

          const subtitles = await Utils.prompt.subtitles ( 'Which subtitles?', subtitlesAll ),
                stream = await Utils.subtitles.download ( subtitles );

          Utils.webtorrent.options.setSubtitles ( webtorrentOptions, stream.path );

        }

      }

    }

    if ( ( Config.outputs.available.length || Config.outputs.favorites.length ) && !Utils.webtorrent.options.isAppSet ( webtorrentOptions ) ) {

      const app = await prompt.list ( 'Which app?', Utils.prompt.parseList ( Config.outputs.available, Config.outputs.favorites ) );

      webtorrentOptions = Utils.webtorrent.options.setApp ( webtorrentOptions, app );

    }

    CLIFlix.stream ( magnet, webtorrentOptions );

  },

  async lucky ( queryOrTorrent, webtorrentOptions: string[] = [] ) { //TODO: Maybe add subtitles support

    let torrent;

    try {

      parseTorrent ( queryOrTorrent );

      torrent = queryOrTorrent;

    } catch ( e ) {

      const torrents = await CLIFlix.getTorrents ( queryOrTorrent, 1 );

      if ( !torrents.length ) return console.error ( `No titles found for "${queryOrTorrent}"` );

      torrent = torrents[0].magnet;

    }

    return CLIFlix.stream ( torrent, webtorrentOptions );

  },

  async getTorrents ( query, rows = Config.torrents.limit, provider = Config.torrents.providers.active ) {

    if ( !provider ) {

      provider = await prompt.list ( 'Which torrents provider?', Config.torrents.providers.available );

    }

    const categories = {
            ThePirateBay: 'Video',
            TorrentProject: 'Video'
          },
          category = categories[provider] || 'All';

    try {

      const TS = new TorrentSearch ();

      TS.enableProvider ( provider );

      return await TS.search ( query, category, rows );

    } catch ( e ) {

      return [];

    }

  },

  async getSubtitles ( query, language ) {

    try {

      const OS = new OpenSubtitles ( Config.subtitles.opensubtitles );
      const results = await OS.search ({
        sublanguageid: language,
        limit: Config.subtitles.limit,
        query
      });

      return results[Object.keys ( results )[0]] || [];

    } catch ( e ) {

      return [];

    }

  },

  async stream ( torrent, webtorrentOptions: string[] = [] ) {

    webtorrentOptions = Utils.webtorrent.options.parse ( webtorrentOptions, Config.webtorrent.options );

    const execArgs = ['download', torrent, ...webtorrentOptions],
          execOpts = {
            cwd: path.resolve ( __dirname, '..' ),
            stdio: 'inherit'
          };

    execa.sync ( 'webtorrent', execArgs, execOpts );

  }

};

/* EXPORT */

export default CLIFlix;
