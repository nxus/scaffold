/* 
* @Author: Mike Reich
* @Date:   2015-11-05 19:17:03
* @Last Modified 2015-12-08
*/

'use strict';

import Scaffold from './Scaffold'

import BasicScaffold from './BasicScaffold'

export default (app) => {
  new Scaffold(app)
  new BasicScaffold(app)
}