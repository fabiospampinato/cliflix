
/* IMPORT */

import * as parseTorrent from 'parse-torrent';
import * as path from 'path';
import * as TorrentSearch from 'torrent-search-api';
import * as opensubtitles from 'subtitler';
import Config from './config';
import Utils from './utils';
import * as child_process from 'child_process';

/* WATCH */

const Watch = {

  async wizard ( webtorrentOptions: string[] = [] ) {

    const query = await Utils.prompt.input ( 'What do you want to watch?' ),
          titles = await Watch.getTitles ( query );

    if ( !titles.length ) return console.error ( `No titles found for "${query}"` );

    const { magnet, title } = await Utils.prompt.title ( 'Which title?', titles );

    const useSubtitles = await Utils.prompt.yesOrNo('Do you want to watch with subtitles?');
    let subtitleFile: string = '';
    if (useSubtitles) {
      const subtitleLang = await Utils.prompt.input ( 'What language do you want your subtitles to be in?' );
      // check if lang is correct
      subtitleFile = await Watch.getSubtitles(title, subtitleLang);
      if ( !subtitleFile ) return console.error ( `No subtitles found for "${title}"` );

      webtorrentOptions.push(`--subtitles ${subtitleFile}`);
    }

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

  async getSubtitles (movieName, lang) {
    const token = await opensubtitles.api.login();
    const results = await opensubtitles.api.searchForTitle(token, lang, movieName);

    if (results.length === 0 || !results[0].SubDownloadLink) return '';

    const subtitleDownloadLink = results[0].SubDownloadLink;
    
    const subtitlesFile = await Utils.downloadGunzip(subtitleDownloadLink);
    return subtitlesFile;
  },

  async stream ( torrent, webtorrentOptions: string[] = [] ) {

    webtorrentOptions = Utils.webtorrent.options.parse ( webtorrentOptions );

    return child_process.spawn(`./node_modules/.bin/webtorrent "${torrent.replace('\n', '')}" ${webtorrentOptions.join(' ')}`, [], {
      cwd: path.resolve ( __dirname, '..' ),
      shell: true,
      stdio: 'inherit'
    });

  }

};

/* EXPORT */

export default Watch;
