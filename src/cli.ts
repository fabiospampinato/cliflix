
/* IMPORT */

import * as caporal from 'caporal';
import * as readPkg from 'read-pkg-up';
import Watch from '.';

/* CLI */

async function CLI () {

  const {pkg} = await readPkg ({ cwd: __dirname });

  caporal
    .version ( pkg.version )
    .argument ( '[title]', 'Item title' )
    .option ( '--app <app>', 'App to open' )
    .action ( ( args, options ) => {
      if ( !args.title ) return Watch.wizard ();
      return Watch.lucky ( args.title, options.app );
    });

  caporal.parse ( process.argv );

}

/* EXPORT */

export default CLI;
