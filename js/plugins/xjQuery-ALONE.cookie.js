$(function() {

  var CookieExpire = 365;

  $xj.add('COOKIE', {
    cookie: cookie,
    cookieExpire: cookieExpire
  });

  function cookie(name, value, storage) {

    if(typeof value == 'boolean')
      storage = value, value = undefined;

    var mode, options = {
      storage: storage,
      expires: CookieExpire
    };

    if(typeof value == 'undefined')
      mode = 'get';

    else {
      mode = 'set';
      if(typeof value == 'object')
        value = JSON.stringify(value);
    }

    if(options['storage'] && localStorage) {

      switch(mode) {

      case 'set':
        if(value.length > 4192000)
          throw new Error('out of cookie max size.');
        localStorage.setItem(name, value);
        return;

      case 'get':
        value = localStorage.getItem(name);
        try {
          return JSON.parse(value);
        } catch(e) {
          return value;
        }
      }

      return;

    }

    switch(mode) {

    case 'set':

      if(value.length > 4192)
        throw new Error('out of cookie max size.');

      var set = name + '=' + encodeURIComponent(value);
      if(options.expires && typeof options.expires == 'number') {
        var date = new Date();
        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
        set += '; expires=' + date.toUTCString();
      }

      set += options.path ? '; path=' + (options.path): '';
      set += options.domain ? '; domain=' + (options.domain): '';
      set += options.secure ? '; secure': '';
      document.cookie = set;
      return;

    case 'get':

      if(document.cookie && document.cookie != '') {

        var cookies = document.cookie.split(';');

        for( var i in cookies)
          if(cookies[i].constructor != Function) {
            var cookie = $.trim(cookies[i]);
            if(cookie.substring(0, name.length + 1) == (name + '=')) {
              var val = decodeURIComponent(cookie.substring(name.length + 1));
              try {
                return JSON.parse(val);
              } catch(e) {
                return val;
              }
            }
          }

      }

    }
  }

  function cookieExpire(value) {

    if(typeof value == 'number')
      return CookieExpire = value;

    return CookieExpire;

  }

  var place = 'ALONEcookie';
  $xj.data('readystatus', place, 'ready'), $xj.trigger('ready', place);

});
