/* 
* @Author: Mike Reich
* @Date:   2015-11-06 11:58:12
* @Last Modified 2015-11-15
*/

'use strict';

class BasicScaffold {

  constructor (app, loaded) {
    this._options = {
      name: 'basic',
      description: 'A barebones template for Nxus apps.'
    }

    this._dir = __dirname+"/../dist/basic"

    app.on('scaffold.register', (handler) => handler("basic", this._options, this._dir))
  }

}

export default BasicScaffold