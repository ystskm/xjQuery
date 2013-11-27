$(function() {

  $xj.add('STRING', {

    // handling
    urlHashRemove: urlHashRemove,
    javascriptFormatParsable: javascriptFormatParsable,
    popedString: popedString,
    doubleByte: doubleByte,
    byteCount: byteCount,
    zeroSupply: zeroSupply,
    zeroSuppless: zeroSuppless,
    toTypingString: toTypingString,

    // format
    format: format,
    formatFloat: formatFloat,
    formatNumber: formatNumber,

    // judging
    isString: isString

  });

  var alphabets = 'abcdefghijklmnopqrstuvwxyz';
  var typing_map = {};

  var typings = {
    ja: {
      offset: [12353, 12449],
      vowels: ['a', 'i', 'u', 'e', 'o'],
      consos: [['x', ''], ['k', 'g'], ['s', 'z'], [{
        'u': 'xtu'
      }, 't', 'd'], ['n'], ['h', 'b', 'p'], ['m'], [{
        'a': 'ya',
        'u': 'yu',
        'o': 'yo'
      }, {
        'a': 'xya',
        'u': 'xyu',
        'o': 'xyo'
      }], ['r'], [{
        'a': 'xwa'
      }, {
        'a': 'wa',
        'i': 'i',
        'e': 'e',
        'o': 'wo'
      }], [{
        'a': 'n'
      }]]
    }
  };

  var typing_mark = {
    '＠': '@',
    '＋': '+',
    '－': '-',
    'ー': '-',
    '．': '.',
    '：': ':',
    '；': ';',
    '。': '.',
    '・': '/',
    '−': '-',
    '　': ' ',
    '！': '!',
    '＃': '#',
    '＄': '$',
    '％': '%',
    '＆': '&',
    '（': '(',
    '）': ')',
    '＊': '*',
    '／': '/',
    '＜': '<',
    '＝': '=',
    '＞': '>',
    '？': '?',
    '［': '[',
    '］': ']',
    '＾': '^',
    '＿': '_',
    '｛': '{',
    '｜': '|',
    '｝': '}'
  };

  var i = null;

  // numeric
  i = 0;
  while(i < 10)
    registToMap(65296 + i, i.toString()), i++;

  // large alphabet
  i = 0;
  while(i < 26)
    registToMap(65313 + i, alphabets[i].toUpperCase()), i++;

  // small alphabet
  i = 0;
  while(i < 26)
    registToMap(65345 + i, alphabets[i]), i++;

  for( var ln in typings) {

    var t = typings[ln];
    var oss = t.offset, vws = t.vowels, cos = t.consos;

    $.each(oss, function(x, os) {
      i = 0, $.each(cos, function(j, co_arr) {
        $.each(vws, function(k, vw) {
          co_arr.forEach(function(co, l) {
            var type_str = null;
            type_str = typeof co == 'string' ? co + vw: co[vw] ? co[vw]: null;
            if(type_str)
              registToMap(os + i, type_str), i++;
          });
        });
      });
    });

  }

  function registToMap(n, c) {
    typing_map[unescape('%u' + (n).toString(16))] = c;
  }

  function urlHashRemove(url) {
    return url.replace(location.hash, '');
  }

  function javascriptFormatParsable(s) {
    try {
      eval('(' + s + ')');
      return s;
    } catch(e) {
      return false;
    }
  }

  function popedString(str, sep, poping, last, direction) {

    sep = sep ? sep: ',', poping = poping ? poping: 1;

    var a = str.split(sep), s = '', i;
    a = (direction) ? a.slice(poping, a.length): a.slice(0, a.length - poping);

    for(i = 0; i < a.length; i++) {
      s += a[i];
      if(!(i == a.length - 1 && !last))
        s += sep;
    }

    return s;

  }

  function doubleByte(s) {
    for( var i = 0; i < s.length; ++i) {
      var c = s.charCodeAt(i);
      if(c < 256 || (c >= 0xff61 && c <= 0xff9f))
        return false;
    }
    return true;
  }

  function byteCount(s) {
    // TODO affect encoding
    var count = 0;
    for( var i = 0; i < s.length; ++i)
      count += (doubleByte(s.substring(i, i + 1))) ? 2: 1;
    return count;
  }

  function zeroSupply(s, n, emptyForbid) {
    if(!s && emptyForbid)
      return s;
    s = s.toString();
    if(n < 2)
      return s.slice(1);
    n = n - s.length;
    for( var i = 0; i < n; i++)
      s = ['0', s].join("");
    return s;
  }

  function zeroSuppless(s, zeroForbid) {
    var less = s.toString().replace(/^0+([^0])/, function(a, b) {
      return b;
    });
    if(zeroForbid)
      return less.replace(/^0+$/, '');
    else
      return less;
  }

  function isString(obj) {
    return obj != null && (typeof obj == "string" || obj instanceof String);
  }

  function toTypingString(bs) {

    var ns = '';
    for( var i = 0; i < bs.length; i++)
      ns += f2h(bs[i]);
    return typeof ns == 'string' ? ns: '';

    function f2h(c) {
      var ret = typing_map[c] || typing_mark[c];
      if(!ret)
        ret = escape(c) == c ? c: escape(c) == '%20' ? c: null;
      if(ret)
        return ret;
      return console.warn('Unexpected string: ' + c), c;
    }

  }

  function format(n, decimal, operation) {
    if(parseInt(n, 10) == n)
      return formatNumber(n, decimal, operation);
    return formatFloat(n, decimal, operation);
  }

  function formatNumber(n, decimal, operation) {
    // TODO not stand alone
    n = $xj.round(n, decimal, operation);
    if(!n && parseInt(n, 10) !== 0)
      return "";

    var p = n.toString().split('.');
    !p[0] && (p[0] = "0"), !p[1] && (p[1] = "");

    var np = "", cnt = p[0].length - 1;
    while(p[0][cnt]) {
      if((p[0].length - 1 - cnt) % 3 == 0 && p[0].length - 1 != cnt)
        if(!isNaN(parseInt(p[0][cnt].charAt(0))))
          np = [',', np].join("");
      np = [p[0][cnt--], np].join("");
    }

    if(p[1] || 0 < decimal)
      np = [np, '.'].join("");

    cnt = 0;
    while(p[1][cnt] || cnt < decimal) {
      if(p[1][cnt])
        np = [np, p[1][cnt++]].join("");
      else {
        np = [np, "0"].join("");
        cnt++;
      }
    }

    return np.toString();

  }

  function formatFloat(n, c) {

    if(!n && n !== 0)
      return n;

    if(!c)
      c = {};

    var exp = 0, v = Math.abs(n), flag = n < 0 ? "-": "";
    while(v >= 10)
      v /= 10, exp += 1;

    if(v != 0)
      while(v < 1)
        v *= 10, exp -= 1;

    var decimal = c.decimal ? c.decimal: 6, m = Math.pow(10, decimal);
    var s = Math.round(v * m) / m;

    s = isNaN(s) ? "0": "" + s;

    var p = $.inArray(".", s);
    if(p < 0) {
      p = s.length, s += '.';
    }

    for( var i = 0; s.length < p + decimal + 1; i++)
      s += '0';

    var str = flag + s + "e" + ((exp < 0) ? "-": "+")
      + zeroSupply(Math.abs(exp), 2);

    return str;

  }

  // trigger ready event
  var place = 'ALONEstringUtil';
  $xj.data('readystatus', place, 'ready'), $xj.trigger('ready', place);

});
