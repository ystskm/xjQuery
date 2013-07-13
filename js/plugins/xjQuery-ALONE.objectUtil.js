/***/
$(function() {
  // constants
  /* nothing */
  // closure singleton
  /* nothing */
  // xjQuery components
  var name = 'OBJECT', components = {
    keys: function(obj, except) {
      if(!except && Object.keys)
        return Object.keys(obj);
      var a = [];
      for( var i in obj)
        if(!except || !except[i])
          a.push(i);
      return a;
    },
    vals: function(obj, except) {
      if(!except)
        except = {};
      var a = [];
      for( var i in obj)
        if(!except[i])
          a.push(obj[i]);
      return a;
    },
    firstKey: function(obj) {
      return Object.keys(obj).shift();
    },
    firstVal: function(obj) {
      return obj[components.firstKey(obj)];
    },
    lastKey: function(obj) {
      return Object.keys(obj).pop();
    },
    minKey: function(obj, o) {
      return Math.min.apply(null, xjQuery.OBJECT.keys(obj, o));
    },
    maxKey: function(obj, o) {
      return Math.max.apply(null, xjQuery.OBJECT.keys(obj, o));
    },
    sizeOf: function(obj) {
      return Object.keys(obj).length;
    },
    isObject: function(obj) {
      console.warn('will be deplicated :: use $.isPlainObject');
      return $.isPlainObject(obj);
    },
    isjQueryObj: function(obj) {
      return obj instanceof $;
    },
    isNumeric: function(obj) {
      return $.isNumeric(obj);
    },
    inObject: function(obj, value) {
      for( var i in obj)
        if(obj[i] == value)
          return i;
      return false;
    },
    keyInObject: function(obj, key) {
      for( var i in obj)
        if(i == key)
          return obj[i];
      return false;
    },
    asort: function(as, o) {
      o = $.extend({
        sortKey: null,
        dirc: true,
        type: 'string'
      }, o);
      var sortKey = [].concat(o['sortKey']), dirc = o['dirc'] ? 1: -1, type = o['type'];
      var length = as.length;
      var a = [];
      for( var i in as)
        a.push({
          key: i,
          val: as[i]
        });
      a.sort(function(x, y) {
        var xVal = null, yVal = null;
        for( var i = 0; i < sortKey.length; i++) {
          var sortBy = sortKey[i];
          if(sortBy) {
            if(sortBy === true) {
              xVal = x.val;
              yVal = y.val;
            } else {
              xVal = x.val[sortBy];
              yVal = y.val[sortBy];
            }
          } else {
            xVal = x.key;
            yVal = y.key;
          };
          switch(type) {
          case 'numeric':
            xVal = parseFloat(xVal);
            yVal = parseFloat(yVal);
            break;
          }
          if(xVal != yVal)
            break;
        }
        return xVal > yVal ? dirc: -1 * dirc;
      });
      var r = {};
      for( var i = 0; i < a.length; i++)
        r[a[i].key] = a[i].val;
      if(typeof length != 'undefined')
        r.length = length;
      return r;
    },
    obj2str: function(obj, kvsep, rowsep, head) {
      if(typeof obj != 'object')
        return obj;
      var s = "";
      if(!kvsep)
        kvsep = ' : ';
      if(!rowsep)
        rowsep = '\n';
      if(!head)
        head = '\t';
      s = toStr(obj, kvsep, rowsep, head);
      function toStr(a, kv, ro, he, h) {
        var s = "";
        (h || h == "") ? h = h + he: h = "";
        for( var i in a) {
          if(typeof a[i] == 'undefined')
            continue;
          (typeof a[i] == 'object') ? s = [s, h, i, kv, ro,
            toStr(a[i], kv, ro, he, h)].join(""): s = [s, h, i, kv,
            a[i].toString(), ro].join("");
        }
        return s.toString();
      }
      return s;
    },
    isError: function(e) {
      return e instanceof Error;
    }
  };
  // add to xjQuery
  $xj.add(name, components);
  // add to jQuery
  $.fn.inObject = function(obj) {
    return $xj.inObject(obj);
  };
});
