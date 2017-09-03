
/* IMPORT */

import * as _ from 'lodash';
import Utils from './utils';

/* WATCH */

const Watch = {

  rows: 10,

  async wizard () {

    const query = await Utils.prompt.input ( 'What do you want to watch?' ),
          titles = await Watch.getTitles ( query );

    if ( !titles.length ) return console.error ( `No titles found for "${query}"` );

    const title = await Utils.prompt.list ( 'Which title?', titles ),
          index = titles.findIndex ( t => t === title ),
          magnet = await Watch.getMagnet ( query, index );

    if ( !magnet ) return console.error ( `No magnet found for "${title}"` );

    // const outputs = ['Airplay', 'Chromecast', 'DLNA', 'MPlayer', 'mpv', 'OMXPlayer', 'VLC', 'IINA', 'XBMC'],
    const outputs = ['IINA', 'VLC', 'XBMC'],
          output = await Utils.prompt.list ( 'Which app?', outputs );

    Watch.stream ( magnet, output );

  },

  async getTitles ( query, rows = Watch.rows ) {

    const titles = await Utils.exec ( `./node_modules/.bin/magnet --rows ${rows} "${query}"` );

    return titles.split ( '\n' )
                 .filter ( _.identity )
                 .map ( title => title.replace ( /\d+:\s+/, '' ) );

  },

  async getMagnet ( query, index = 1, rows = Watch.rows ) {

    return Utils.exec ( `./node_modules/.bin/magnet --rows ${rows} "${query}" ${index}` );

  },

  async stream ( magnet, output ) {

    return Utils.exec ( `./node_modules/.bin/webtorrent download "${magnet}" --${output.toLowerCase ()}` );

  },

  async lucky ( query, output = 'IINA' ) {

    const magnet = await Watch.getMagnet ( query );

    if ( !magnet ) return console.error ( `No magnet found for "${query}"` );

    return Watch.stream ( magnet, output );

  }

};

/* EXPORT */

export default Watch;
