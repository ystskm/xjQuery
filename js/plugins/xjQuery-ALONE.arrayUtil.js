$(function() {
  $xj.add('ARRAY', {
    arrayToString: function(arr, sep, forbid_empty) {
      if(!sep)
        sep = ',';
      var str = '', i = 0;
      for(; i < arr.length; i++) {
        if(!forbid_empty
          || (arr[i] !== null && arr[i].toString && arr[i].toString() != "")) {
          if(!i == 0)
            str += sep;
          str += arr[i];
        }
      }
      return str;
    },
    isArray: function(arr) {
      return $.isArray(arr);
    },
    isInArray: function(value, arr) {
      if(arr && $.inArray(value, arr) != -1)
        return true;
      else
        return false;
    },
    inArrayFirstMatch: function(reg, arr) {
      for( var i = 0; i < arr.length; i++)
        if(arr[i].match(reg))
          return {
            idx: i,
            reg: arr[i].match(reg)
          };
      return {};
    },
    pushToArray: function(arr, val, o) {
      o = $.extend({
        idx: null
      }, o);
      if(!o['idx'])
        o['idx'] === 0 ? arr.unshift(val): arr.push(val);
      else
        arr = arr.slice(0, o['idx']).concat(val).concat(arr.slice(o['idx']));
      return arr;
    }
  });
});
