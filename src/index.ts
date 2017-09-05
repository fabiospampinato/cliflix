
/* IMPORT */

import * as _ from 'lodash';
import Config from './config';
import Utils from './utils';
import * as opensubtitles from 'subtitler';

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

    const useSubtitles = await Utils.prompt.yesOrNo('Do you want to watch with subtitles?');
    let subtitleFile: string = "";
    if (useSubtitles) {
      const subtitleLang = await Utils.prompt.input ( 'What language do you want your subtitles to be in?' );
      // check if lang is correct
      subtitleFile = await Watch.getSubtitles(title, subtitleLang);
      if ( !subtitleFile ) return console.error ( `No subtitles found for "${title}"` );
    }

    if ( !webtorrentOptions.length ) { //FIXME: Actually check if an `--{app}` switch has been passed

      const output = await Utils.prompt.list ( 'Which app?', Config.outputs );

      webtorrentOptions = [`--${output.toLowerCase ()}`];

    }

    Watch.stream ( magnet, webtorrentOptions, subtitleFile );

  },

  async getTitles ( query, rows = Config.rows ) {

    const titles = await Utils.exec ( `./node_modules/.bin/magnet --rows ${rows} "${query}"` );

    return titles.split ( '\n' )
                 .filter ( _.identity )
                 .map ( title => title.replace ( /\d+:\s+/, '' ) );

  },

  async getMagnet ( query, index = 1, rows = Config.rows ) {

    return Utils.exec ( `./node_modules/.bin/magnet --rows ${rows} "${query}" ${index}` );

  },

  async getSubtitles (movieName, lang) {
    const token = await opensubtitles.api.login();
    const results = await opensubtitles.api.searchForTitle(token, lang, movieName);

    if (results.length === 0 || !results[0].SubDownloadLink) return "";

    const subtitleDownloadLink = results[0].SubDownloadLink;
    
    const subtitlesFile = await Utils.downloadGunzip(subtitleDownloadLink);
    return subtitlesFile;
  },

  async stream ( magnet, webtorrentOptions: string[] = [], subtitleFile?: string ) {

    if (!webtorrentOptions.length) { //FIXME: Actually check if an `--{app}` switch has been passed

        webtorrentOptions = [`--${Config.output.toLowerCase()}`];
    }

    if (subtitleFile) webtorrentOptions.push(`--subtitles "${subtitleFile}"`);

    return Utils.spawn (`./node_modules/.bin/webtorrent "${magnet.replace('\n', '')}" ${webtorrentOptions.join(" ")}`, { stdio: 'inherit' } );

  },

  async lucky ( query, webtorrentOptions: string[] = [] ) {

    const magnet = await Watch.getMagnet ( query );

    if ( !magnet ) return console.error ( `No magnet found for "${query}"` );

    return Watch.stream ( magnet, webtorrentOptions );

  }

};

/* EXPORT */

export default Watch;
