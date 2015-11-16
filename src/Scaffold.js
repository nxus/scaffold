/* 
* @Author: Mike Reich
* @Date:   2015-11-05 19:16:22
* @Last Modified 2015-11-15
*/

'use strict';

import Generator from 'scaffold-generator';
import sanitize from 'sanitize-filename';
import npm from 'npm';
import _ from 'underscore';

class Scaffold {
  constructor (app, loaded) {
    this.app = app;
    this._scaffolds = {}

    app.on('app.load', () => {
      app.emit('scaffold.register', this._register.bind(this))
    })

    app.on('cli.register', (handler) => {
      handler('create <name> [scaffold]', 'Create a new project, optionally from a scaffold', this._handleScaffold.bind(this))
      handler('scaffolds', 'List all available scaffolds', this._listScaffolds.bind(this))
    });
  }

  _register (name, opts, dir) {
    this._scaffolds[name] = { opts: opts, dir: dir};
  }

  _sanitize (name) {
    return sanitize(name).replace(" ", "_")
  }

  _listScaffolds () {
    _.each(this._scaffolds, (value, key) => {
      this.app.emit('cli.info', value.opts.name+": "+value.opts.description);
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

    var dest = process.cwd()+"/"+name;

    var source = scaffoldOpts.dir;
    Generator({data: scaffoldOpts.opts}).copy(source, dest, (err) => {
      if(err) return console.error('Error copying scaffold', err)
      this.app.emit('cli.info', 'Successfully installed '+scaffold+" app at ./"+name)
      this.app.emit('cli.info', 'Installing dependencies...')
      npm.load({
          prefix: dest
      }, (err) => {
        npm.commands.install([], (er, data) => {
          this.app.emit('cli.info', 'Done installing!')
        })
      });
    });
  }
}

export default Scaffold