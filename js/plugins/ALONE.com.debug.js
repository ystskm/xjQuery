// window debug function set (both Node and client version) >>
var util, debug;

// window
if(typeof window != 'undefined' && typeof console != 'undefined') {
  try {
    util = console;
    debug = window.env && window.env.DEBUG;
    window.xdebug = debug_module;
  } catch(e) {
  }
}

// node.js module
if(typeof module != 'undefined' && typeof process != 'undefined') {
  try {
    util = require('util');
    debug = process.env.NODE_DEBUG;
    module.exports = debug_module;
  } catch(e) {
  }
}

function debug_module(category, filename) {
  !filename && (filename = category);
  try {
    if(debug == 'true' || (new RegExp(category + '|' + filename).test(debug)))
      return function(s) {
        util.error(filename + '.js : ' + (typeof s == 'function' ? s(): s));
      };
  } catch(e) {
  }
  return Function()
};
