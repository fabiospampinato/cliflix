
/* IMPORT */

import * as execa from 'execa';
import * as parseTorrent from 'parse-torrent';
import * as path from 'path';
import * as TorrentSearch from 'torrent-search-api';
import Config from './config';
import Utils from './utils';

/* WATCH */

const Watch = {

  async wizard ( webtorrentOptions: string[] = [] ) {

    const query = await Utils.prompt.input ( 'What do you want to watch?' ),
          titles = await Watch.getTitles ( query );

    if ( !titles.length ) return console.error ( `No titles found for "${query}"` );

    const {magnet} = await Utils.prompt.title ( 'Which title?', titles );

    if ( !Utils.webtorrent.options.isAppSet ( webtorrentOptions ) ) {

      const app = await Utils.prompt.list ( 'Which app?', Config.outputs );

      webtorrentOptions = Utils.webtorrent.options.setApp ( webtorrentOptions, app );

    }

    Watch.stream ( magnet, webtorrentOptions );

  },

  async lucky ( queryOrTorrent, webtorrentOptions: string[] = [] ) {

    let torrent;

    try {

      parseTorrent ( queryOrTorrent );

      torrent = queryOrTorrent;

    } catch ( e ) {

      const titles = await Watch.getTitles ( queryOrTorrent, 1 );

      if ( !titles.length ) return console.error ( `No titles found for "${queryOrTorrent}"` );

      torrent = titles[0].magnet;

    }

    return Watch.stream ( torrent, webtorrentOptions );

  },

  async getTitles ( query, rows = Config.searchNr ) {

    const ts = new TorrentSearch ();

    ts.enableProvider ( 'ThePirateBay' );

    return await ts.search ( query, 'Video', rows );

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
