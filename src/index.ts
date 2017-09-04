
/* IMPORT */

import {spawn} from 'child_process';
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

    if ( !webtorrentOptions.length ) { //FIXME: Actually check if an `--{app}` switch has been passed

      const output = await Utils.prompt.list ( 'Which app?', Config.outputs );

      webtorrentOptions = [`--${output.toLowerCase ()}`];

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

  async stream ( magnet, webtorrentOptions: string[] = [] ) {

    if ( !webtorrentOptions.length ) { //FIXME: Actually check if an `--{app}` switch has been passed

      webtorrentOptions = [`--${Config.output.toLowerCase ()}`];

    }

    const cwd = path.resolve ( __dirname, '.' ); // In order to properly call programs under `/node_modules/.bin`

    spawn ( './node_modules/.bin/webtorrent', ['download', magnet, ...webtorrentOptions], { cwd: cwd, stdio: 'inherit' } ); //TSC: can't return

  }

};

/* EXPORT */

export default Watch;
