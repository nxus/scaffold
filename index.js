/* 
* @Author: Mike Reich
* @Date:   2015-11-05 19:17:03
* @Last Modified 2015-11-06
*/

'use strict';

var Scaffold = require('./lib/Scaffold')

var BasicScaffold = require('./lib/BasicScaffold')

module.exports = function(app, loaded) {
  new Scaffold(app, loaded)
  new BasicScaffold(app, loaded)
}