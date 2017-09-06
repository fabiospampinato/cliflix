
/* IMPORT */

import * as temp from 'temp';

/* TEMP */

temp.track ();

/* EXIT */

const exitEvents: any[] = ['exit', 'SIGINT', 'SIGTERM'];

exitEvents.forEach ( e => {
  process.on ( e, () => {
    temp.cleanupSync ()
  });
});
