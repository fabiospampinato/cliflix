
/* IMPORT */

import * as _ from 'lodash';
import chalk from 'chalk';
import * as execa from 'execa';
import * as OpenSubtitles from 'opensubtitles-api';
import * as parseTorrent from 'parse-torrent';
import * as path from 'path';
import prompt from 'inquirer-helpers';
import * as torrentSearch from 'torrent-search-api';
import * as ora from 'ora';
import Config from './config';
import Utils from './utils';
import './temp';

/* CLIFIX */

const CLIFlix = {

  async wizard ( webtorrentOptions: string[] = [] ) {

    const torrent = await CLIFlix.getTorrent (),
          magnet = await CLIFlix.getMagnet ( torrent );

    if ( !magnet ) return console.error ( chalk.red ( 'Magnet not found.' ) );

    if ( ( Config.subtitles.languages.available.length || Config.subtitles.languages.favorites.length ) && !Utils.webtorrent.options.isSubtitlesSet ( webtorrentOptions ) ) {

      const subbed = await prompt.noYes ( 'Do you want subtitles?' );

      if ( subbed ) {

        const languageName = await prompt.list ( 'Which language?', Utils.prompt.parseList ( Config.subtitles.languages.available, Config.subtitles.languages.favorites ) ),
              languageCode = Utils.language.getCode ( languageName );

        const spinner = ora ( `Waiting for "${chalk.bold ( 'OpenSubtitles' ) }"...` ).start ();

        const subtitlesAll = await CLIFlix.getSubtitles ( torrent.title, languageCode );

        spinner.stop ();

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

      if ( !torrents.length ) return console.error ( chalk.red ( `No torrents found for "${chalk.bold ( queryOrTorrent )}"` ) );

      torrent = await CLIFlix.getMagnet ( torrents[0] );

      if ( !torrent ) return console.error ( chalk.red ( 'Magnet not found.' ) );

    }

    return CLIFlix.stream ( torrent, webtorrentOptions );

  },

  async getTorrents ( query, rows = Config.torrents.limit, provider = Config.torrents.providers.active, providers = Config.torrents.providers.available ) {

    const hasProvider = !!provider;

    if ( !provider ) {

      provider = await prompt.list ( 'Which torrents provider?', providers );

    }

    const categories = {
            ThePirateBay: 'Video',
            TorrentProject: 'Video'
          },
          category = categories[provider] || 'All';

    const spinner = ora ( `Waiting for "${chalk.bold ( provider )}"...` ).start ();

    try {

      torrentSearch.disableAllProviders ();
      torrentSearch.enableProvider ( provider );

      const torrents = await torrentSearch.search ( query, category, rows );

      spinner.stop ();

      if ( !torrents.length ) throw new Error ( 'No torrents found.' );

      return torrents;

    } catch ( e ) {

      console.error ( chalk.yellow ( `No torrents found via "${chalk.bold ( provider )}"` ) );

      const nextProviders = _.without ( providers, provider ),
            nextProvider = hasProvider ? providers[providers.indexOf ( provider ) + 1] : '';

      if ( !nextProvider && !nextProviders.length ) return [];

      return await CLIFlix.getTorrents ( query, rows, nextProvider, nextProviders );

    }

  },

  async getTorrent () {

    while ( true ) {

      const query = await prompt.input ( 'What do you want to watch?' ),
            torrents = await CLIFlix.getTorrents ( query );

      if ( !torrents.length ) {

        console.error ( chalk.yellow ( `No torrents found for "${chalk.bold ( query )}", try another query.` ) );

        continue;

      }

      return await Utils.prompt.title ( 'Which torrent?', torrents );

    }

  },

  async getMagnet ( torrent ) {

    try {

      return await torrentSearch.getMagnet ( torrent );

    } catch ( e ) {

      return;

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
