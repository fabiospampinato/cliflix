
/* IMPORT */

import * as _ from 'lodash';
import Config from './config';
import Utils from './utils';

/* WATCH */

const Watch = {

  async wizard ( webtorrentOptions: string[] = [] ) {

    const query = await Utils.prompt.input ( 'What do you want to watch?' ),
          titles = await Watch.getTitles ( query );

    if ( !titles.length ) return console.error ( `No titles found for "${query}"` );

    const title = await Utils.prompt.list ( 'Which title?', titles ),
          index = titles.findIndex ( t => t === title ),
          magnet = await Watch.getMagnet ( query, index );

    if ( !magnet ) return console.error ( `No magnet found for "${title}"` );

    if ( !webtorrentOptions.length ) { //FIXME: Actually check if an `--{app}` switch has been passed

      const output = await Utils.prompt.list ( 'Which app?', Config.outputs );

      webtorrentOptions = [`--${output.toLowerCase ()}`];

    }

    Watch.stream ( magnet, webtorrentOptions );

  },


    const titles = await Utils.exec ( `./node_modules/.bin/magnet --rows ${rows} "${query}"` );

    return titles.split ( '\n' )
                 .filter ( _.identity )
                 .map ( title => title.replace ( /\d+:\s+/, '' ) );

  },

  async getMagnet ( query, index = 1, rows = Config.rows ) {
  async getTitles ( query, rows = Config.searchNr ) {

    return Utils.exec ( `./node_modules/.bin/magnet --rows ${rows} "${query}" ${index}` );

  },

  async stream ( magnet, webtorrentOptions: string[] = [] ) {

    if ( !webtorrentOptions.length ) { //FIXME: Actually check if an `--{app}` switch has been passed

      webtorrentOptions = [`--${Config.output.toLowerCase ()}`];

    }

    return Utils.spawn ( './node_modules/.bin/webtorrent', ['download', magnet, ...webtorrentOptions], { stdio: 'inherit' } );

  },

  async lucky ( query, webtorrentOptions: string[] = [] ) {

    const magnet = await Watch.getMagnet ( query );

    if ( !magnet ) return console.error ( `No magnet found for "${query}"` );

    return Watch.stream ( magnet, webtorrentOptions );

  }

};

/* EXPORT */

export default Watch;
