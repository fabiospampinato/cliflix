
/* IMPORT */

import * as execa from 'execa';
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

  async lucky ( query, webtorrentOptions: string[] = [] ) {

    const titles = await Watch.getTitles ( query, 1 );

    if ( !titles.length ) return console.error ( `No titles found for "${query}"` );

    const {magnet} = titles[0];

    return Watch.stream ( magnet, webtorrentOptions );

  },

  async getTitles ( query, rows = Config.searchNr ) {

    const ts = new TorrentSearch ();

    ts.enableProvider ( 'ThePirateBay' );

    return await ts.search ( query, 'Video', rows );

  },

  async stream ( torrent, webtorrentOptions: string[] = [] ) {

    webtorrentOptions = Utils.webtorrent.options.parse ( webtorrentOptions );

    const execArgs = ['download', torrent, ...webtorrentOptions],
          execOpts = { stdio: 'inherit' };

    execa.sync ( 'webtorrent', execArgs, execOpts );

  }

};

/* EXPORT */

export default Watch;
