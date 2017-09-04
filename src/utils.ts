
/* IMPORT */

import * as _ from 'lodash';
import * as chalk from 'chalk';
import {exec, spawn} from 'child_process';
import * as inquirer from 'inquirer';
import * as isOnline from 'is-online';
import * as path from 'path';
import * as pify from 'pify';
import Config from './config';

/* UTILS */

const Utils = {

  exec ( command, options = {} ) {

    const cwd = path.resolve ( __dirname, '..' ); // In order to properly call programs under `/node_modules/.bin`

    return pify ( exec )( command, _.extend ( {cwd}, options ) );

  },

  spawn ( command, args: string[] = [], options = {} ) {

    const cwd = path.resolve ( __dirname, '..' ); // In order to properly call programs under `/node_modules/.bin`

    spawn ( command, args, _.extend ( {cwd}, options ) ); //TSC: can't return

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

      if ( arr.length > Config.listNr ) arr.push ( new inquirer.Separator ( '\n' ) );

      const {result} = await inquirer.prompt ({
        type: 'list',
        name: 'result',
        choices: arr,
        pageSize: Config.listNr,
        message,
        default: fallback,
        validate: x => !_.isUndefined ( fallback ) || ( _.isString ( x ) && x.trim () )
      });

      return result;

    }

  }

};

/* EXPORT */

export default Utils;
