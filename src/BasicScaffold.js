/* 
* @Author: Mike Reich
* @Date:   2015-11-06 11:58:12
* @Last Modified 2015-12-08
*/

'use strict';

class BasicScaffold {

  constructor (app) {
    this._options = {
      name: 'basic',
      description: 'A barebones template for Nxus apps.'
    }

    this._dir = __dirname+"/../dist/basic"

    app.get('scaffold').send("scaffolds").with("basic", this._options, this._dir)
  }

}

export default BasicScaffold