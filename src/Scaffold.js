/* 
* @Author: Mike Reich
* @Date:   2015-11-05 19:16:22
* @Last Modified 2015-12-08
*/

'use strict';

import Generator from 'scaffold-generator';
import sanitize from 'sanitize-filename';
import npm from 'npm';
import _ from 'underscore';
import fs from 'fs';
import path from 'path';

class Scaffold {
  constructor (app) {
    this.app = app;
    this._scaffolds = {}

    app.get('scaffold').gather('scaffolds').each(this._register.bind(this))

    app.get('cli').send("command")
    .with('create <name> [scaffold]', 'Create a new project, optionally from a scaffold', this._handleScaffold.bind(this))
    app.get('cli').send("command")
    .with('scaffolds', 'List all available scaffolds', this._listScaffolds.bind(this))
  }

  _register ([name, opts, dir]) {
    this._scaffolds[name] = { opts: opts, dir: dir};
  }

  _sanitize (name) {
    return sanitize(name).replace(" ", "_")
  }

  _listScaffolds () {
    _.each(this._scaffolds, (value, key) => {
      this.app.get('cli').emit('info').with(value.opts.name+": "+value.opts.description);
    })
  }

  _handleScaffold (name, scaffold) {
    if(!scaffold) {
      scaffold = 'basic'
    }

    name = this._sanitize(name)

    var scaffoldOpts = this._scaffolds[scaffold]

    if(!scaffoldOpts)
      return console.error('Scaffold '+scaffold+' is not valid');

    var dest = path.join(process.cwd(), name);

    var source = fs.realpathSync(scaffoldOpts.dir);
    console.log('source', source)
    console.log('dest', dest)
    Generator({data: scaffoldOpts.opts}).copy(source, dest, (err) => {
      if(err) return console.error('Error copying scaffold', err)
      this.app.get('cli').emit('info').with('Successfully installed '+scaffold+" app at ./"+name)
      this.app.get('cli').emit('info').with('Installing dependencies...')
      npm.load({
          prefix: dest
      }, (err) => {
        npm.commands.install([], (er, data) => {
          this.app.get('cli').emit('info').with('Done installing!')
        })
      });
    });
  }
}

export default Scaffold