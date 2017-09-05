
/* IMPORT */

import * as execa from 'execa';
import * as OpenSubtitles from 'opensubtitles-api';
import * as parseTorrent from 'parse-torrent';
import * as path from 'path';
import * as TorrentSearch from 'torrent-search-api';
import Config from './config';
import Utils from './utils';

/* WATCH */

const Watch = {

  async wizard ( webtorrentOptions: string[] = [] ) {

    const query = await Utils.prompt.input ( 'What do you want to watch?' ),
          titles = await Watch.getTorrents ( query );

    if ( !titles.length ) return console.error ( `No titles found for "${query}"` );

    const {magnet} = await Utils.prompt.title ( 'Which title?', titles );

    if ( Config.subtitles.enabled && !Utils.webtorrent.options.isSubtitlesSet ( webtorrentOptions ) ) {

      const subbed = await Utils.prompt.confirm ( 'Do you want subtitles?' );

      if ( subbed ) {

        const languageName = await Utils.prompt.list ( 'Which language?', Config.subtitles.languages ),
              languageCode = Utils.language.getCode ( languageName ),
              subtitlesAll = await Watch.getSubtitles ( query, languageCode );

        if ( !subtitlesAll.length ) {

          const okay = await Utils.prompt.confirm ( `No subtitles found for "${languageName}", play it anyway?` );

          if ( !okay ) return;

        } else {

          const subtitles = await Utils.prompt.subtitles ( 'Which subtitles?', subtitlesAll ),
                stream = await Utils.subtitles.download ( subtitles.url );

          Utils.webtorrent.options.setSubtitles ( webtorrentOptions, stream.path );

        }

      }

    }

    if ( !Utils.webtorrent.options.isAppSet ( webtorrentOptions ) ) {

      const app = await Utils.prompt.list ( 'Which app?', Config.outputs );

      webtorrentOptions = Utils.webtorrent.options.setApp ( webtorrentOptions, app );

    }

    Watch.stream ( magnet, webtorrentOptions );

  },

  async lucky ( queryOrTorrent, webtorrentOptions: string[] = [] ) { //TODO: Maybe add subtitles support

    let torrent;

    try {

      parseTorrent ( queryOrTorrent );

      torrent = queryOrTorrent;

    } catch ( e ) {

      const torrents = await Watch.getTorrents ( queryOrTorrent, 1 );

      if ( !torrents.length ) return console.error ( `No titles found for "${queryOrTorrent}"` );

      torrent = torrents[0].magnet;

    }

    return Watch.stream ( torrent, webtorrentOptions );

  },

  async getTorrents ( query, rows = Config.searchNr ) {

    try {

      const TS = new TorrentSearch ();

      TS.enableProvider ( 'ThePirateBay' );

      return await TS.search ( query, 'Video', rows );

    } catch ( e ) {

      return [];

    }

  },

  async getSubtitles ( query, language ) {

    try {

      const OS = new OpenSubtitles ( Config.opensubtitles.userAgent );
      const results = await OS.search ({
        sublanguageid: language,
        limit: Config.subtitlesNr,
        query
      });

      return results[Object.keys ( results )[0]] || [];

    } catch ( e ) {

      return [];

    }

  },

  async stream ( torrent, webtorrentOptions: string[] = [] ) {

    webtorrentOptions = Utils.webtorrent.options.parse ( webtorrentOptions );

    const execArgs = ['download', torrent, ...webtorrentOptions],
          execOpts = {
            cwd: path.resolve ( __dirname, '..' ),
            stdio: 'inherit'
          };

    execa.sync ( 'webtorrent', execArgs, execOpts );

  }

};

/* EXPORT */

export default Watch;
