/***/
/*
 *  Create by Y.Sakamoto 2013/06/12
 */
$(function() {

  $xj.add('ARRAY', {
    arrayToString: arrayToString,
    isInArray: isInArray,
    inArrayFirstMatch: inArrayFirstMatch,
    pushToArray: pushToArray
  });

  function arrayToString(arr, sep, forbid_empty) {
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
  }

  function isInArray(value, arr) {
    if(arr && $.inArray(value, arr) != -1)
      return true;
    else
      return false;
  }

  function inArrayFirstMatch(reg, arr) {
    for( var i = 0; i < arr.length; i++)
      if(arr[i].match(reg))
        return {
          idx: i,
          reg: arr[i].match(reg)
        };
    return {};
  }

  function pushToArray(arr, val, o) {
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
