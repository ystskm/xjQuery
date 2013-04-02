$(function() {

  var _RandomSign = 'RANDOM_';

  var _UsedNamespace = {}, _UsedDomId = {}, _UsedDomClass = {};

  $xj.add('KEYGEN', {
    createRandomString: createRandomString,
    createNamespace: createNamespace,
    createDomId: createDomId,
    createDomClass: createDomClass,
    baseparamIdCheck: baseparamIdCheck
  });

  function createRandomString(n, o) {

    o = $.extend({
      type: "all"
    }, o);

    var s = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    switch(o['type']) {

    case "number":
      s = "0123456789";
      break;

    }

    var p = "", cnt = s.length;

    for( var i = 0; i < n; i++)
      p += s.substr(Math.floor(Math.random() * cnt), 1).toString();

    return p;

  }

  function createNamespace(fix, n, parent) {

    if(!fix)
      fix = '';

    if(!n)
      n = 4;

    if(!parent)
      parent = window;

    var namespace;
    do
      namespace = [_RandomSign, fix, createRandomStr(n)].join("");
    while(typeof parent[namespace] != 'undefined' && !_UsedNamespace[namespace]);

    _UsedNamespace[namespace] = true;
    return namespace;

  }

  function createDomId(fix, n) {

    if(!fix)
      fix = '';

    if(!n)
      n = 4;

    var id;
    do
      id = [_RandomSign, fix, createRandomStr(n)].join("");
    while($('#' + id).length != 0 && !_UsedDomId[id]);

    return _UsedDomId[id] = true, id;

  }

  function createDomClass(fix, n) {

    if(!fix)
      fix = '';

    if(!n)
      n = 4;

    var cls;
    do
      cls = [_RandomSign, fix, createRandomStr(n)].join("");
    while($('.' + cls).length != 0 && !_UsedDomClass[cls]);

    return _UsedDomClass[cls] = true, cls;

  }

  function baseparamIdCheck(param, fix) {
    // TODO what?
    if(!param['attr'])
      param['attr'] = {};

    if(!param['attr']['id'])
      param['attr']['id'] = createDomId(fix);

  }

});
