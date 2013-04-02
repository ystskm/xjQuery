// window debug function set (both Node and client version) >>
var util, debug;
if(typeof global == 'undefined') {
  // client js
  util = console;
  debug = window.xdebug;
  window.xdebug = debug_module;
} else {
  // node js
  util = require('util');
  debug = process.env.NODE_DEBUG;
  module.exports = debug_module;
}
function debug_module(category, filename) {
  if(!filename)
    filename = category;
  if(debug
    && (debug == 'true' || (new RegExp(category + '|' + filename).test(debug)))) {
    return function(s) {
      util.error(filename + '.js : ' + (typeof s == 'function' ? s(): s));
    };
  } else
    return function() {
    };
};
