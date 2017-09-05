
/* IMPORT */

import * as _ from 'lodash';
import * as chalk from 'chalk';
import {exec, spawn} from 'child_process';
import * as inquirer from 'inquirer';
import * as isOnline from 'is-online';
import * as path from 'path';
import * as pify from 'pify';
import * as temp from 'temp';
import * as fs from 'fs';
import * as zlib from 'zlib';
import * as request from 'request';


/* UTILS */
temp.track(); // Delete temp files on process exit

const Utils = {

  exec ( command, options = {} ) {

    const cwd = path.resolve ( __dirname, '..' ); // In order to properly call programs under `/node_modules/.bin`

    return pify ( exec )( command, _.extend ( {cwd}, options ) );

  },

  spawn ( command, options = {} ) {

    const cwd = path.resolve ( __dirname, '..' ); // In order to properly call programs under `/node_modules/.bin`

    spawn ( command, _.extend ( {cwd, shell: true }, options ) ); //TSC: can't return

  },

  async checkConnection () {

    const online = await isOnline ();

    if ( !online ) throw new Error ( chalk.red ( `Looks like you are offline, try again later.\n` ) ) ;

  },

  prompt: {

    async confirm ( message: string, fallback = false ) {

      const {result} = await inquirer.prompt ({
        type: 'confirm',
        name: 'result',
        message,
        default: fallback
      });

      return !!result;

    },

    async input ( message, fallback? ) {

      const {result} = await inquirer.prompt ({
        type: 'input',
        name: 'result',
        message,
        default: fallback,
        validate: x => !_.isUndefined ( fallback ) || ( _.isString ( x ) && !!x.trim () )
      });

      return result;

    },

    async list ( message, arr, fallback? ) {

      const {result} = await inquirer.prompt ({
        type: 'list',
        name: 'result',
        choices: arr,
        pageSize: 10,
        message,
        default: fallback,
        validate: x => !_.isUndefined ( fallback ) || ( _.isString ( x ) && x.trim () )
      });

      return result;

    },

    async yesOrNo ( message, fallback? ): Promise<Boolean> {
      const result: String = await Utils.prompt.list(message, ['yes', 'no'], fallback);

      return result === 'yes';
    }

  },

  async generateTempFile(options: Object = {}): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      temp.open(options, (err, { path: tempFile }) => {
        if (err) return reject(err);

        return resolve(tempFile);
      });
    });
  },

  async downloadGunzip(url: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      const tempFile = await Utils.generateTempFile();
        request(url)
          .pipe(zlib.createGunzip())
          .pipe(
            fs
              .createWriteStream(tempFile)
              .on('finish', () => resolve(tempFile))
              .on('error', (err) => reject(err))
          );
    });
  }

};

/* EXPORT */

export default Utils;
