/***/
// THIS FILE IS USED EFFICIENTLY UNDER THE FOONYAH ARCHITECTURE.
(function() {

  //If read on browser, do nothing.
  var onBws = typeof global == 'undefined';
  if(onBws)
    return;

  //READ EXTERNAL_CONDITION
  var _C = global.EXTERNAL_CONDITION || {}, Cons = {
    Version: _C.xjQuery_version,
    HttpRoot: _C.http_root || '/',
    DircName: _C.xjQuery_dirname || 'xjQuery',
    Xjquery: 'xjQuery',
    Js: 'js',
    Plugind: 'plugins'
  };

  var d = __dirname.split('/').slice(0, -1).join('/'), n = Cons.DircName;
  var r = '', p = require('path');

  var js = Cons.Js, Files = {
    xjq: Cons.Xjquery
  };

  var paths = {
    root: d,
    http_root: Cons.HttpRoot,
    plugind: p.join(js, Cons.Plugind),
    xjquery: p.join(js, Files.xjq)
  };

  module.exports = function() {
    return {
      svr: svr,
      bws: bws
    };
  }();

  function svr(target, options) {
    options = mixin({}, options);
    if(target == 'root')
      target = options.withroot = 'root';
    if(options.withroot == true)
      options.withroot = 'root';
    return makePath(target, options);
  }

  function bws(target, options) {
    options = mixin({}, options);
    if(target == 'root')
      target = options.withroot = 'http_root';
    if(options.withroot == true)
      options.withroot = 'http_root';
    return makePath(target, options);
  }

  function makePath(target, options) {

    if(!target)
      return __dirname;

    options = mixin({
      version: Cons.Version,
      withroot: false,
      withname: false,
      withext: true
    }, options);

    var prefix = '', keys = target.split('/'), ret = keys.pop();
    if(options.withroot) {
      prefix = Cons.HttpRoot, options.withname = true;
      switch(options.withroot) {
      case 'root':
        prefix = d;
        break;
      }
    }

    if(options.withname == true)
      prefix = p.join(prefix, n);

    // return root
    if(/root$/.test(target))
      return p.join(prefix, '/');

    // directory
    if(ret == 'plugind')
      return p.join(prefix, paths.plugind);

    // file
    if(keys[0] == 'plugin')
      ret = p.join(paths.plugind, ret);
    else
      ret = paths.xjquery;

    return p.join(prefix, ret) + (options.version ? '-' + options.version: '')
      + (options.withext ? '.' + js: '');

  };

  function mixin(tgt, obj) {
    tgt = tgt || {}, obj = obj || {};
    for( var i in obj)
      if(typeof obj[i] != 'undefined')
        tgt[i] = obj[i];
    return tgt;
  };

})();
