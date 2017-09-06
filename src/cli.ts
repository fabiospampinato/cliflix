
/* IMPORT */

import * as _ from 'lodash';
import * as caporal from 'caporal';
import * as readPkg from 'read-pkg-up';
import * as updateNotifier from 'update-notifier';
import Utils from './utils';
import CLIFlix from '.';

/* CLI */

async function CLI () {

  const {pkg} = await readPkg ({ cwd: __dirname });

  caporal
    .version ( pkg.version )
    .argument ( '[title|torrent]', 'Video title or torrent identifier' )
    .argument ( '[-- webtorrent options...]', 'WebTorrent options' )
    .action ( async ( args ) => {

      await Utils.checkConnection ();

      updateNotifier ({ pkg }).notify ();

      args = _.castArray ( args.title || [] ).concat ( args.webtorrentOptions );

      const doubleDashIndex = args.findIndex ( x => x === '--' ),
            hasWebtorrentOptions = ( doubleDashIndex >= 0 ),
            titleOrTorrent = hasWebtorrentOptions ? args.slice ( 0, doubleDashIndex ).join ( ' ' ) : args.join ( ' ' ),
            webtorrentOptions = hasWebtorrentOptions ? args.slice ( doubleDashIndex + 1 ) : [];

      if ( !titleOrTorrent ) return CLIFlix.wizard ( webtorrentOptions );

      return CLIFlix.lucky ( titleOrTorrent, webtorrentOptions );

    });

  caporal.parse ( process.argv );

}

/* EXPORT */

export default CLI;
