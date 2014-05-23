$(function() {

  var Options = {
    expires: 365,
    path: null,
    secure: location.protocol == 'https:'
  };

  $xj.add('COOKIE', {
    cookie: cookie,
    cookieOptions: cookieOptions,
    cookieExpire: cookieExpire
  });

  // emit ready
  var place = 'ALONEcookie';
  $xj.data('readystatus', place, 'ready'), $xj.trigger('ready', place);

  function cookie(name, value, options) {

    if(typeof value == 'boolean')
      options = value, value = undefined;

    if(typeof options == 'boolean')
      options = {
        storage: options
      }

    options = $.extend({}, Options, options);

    var mode = null;
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

      options.path && (set += '; path=' + options.path);
      options.domain && (set += '; domain=' + options.domain);
      options.secure && (set += '; secure');
      return document.cookie = set;

    case 'get':
      if(typeof document.cookie == 'string') {

        var cookies = document.cookie.split(';');
        for( var i in cookies) {
          var cookie = $.trim(cookies[i] || '');
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
      return;

    }
  }

  function cookieOptions(options) {
    return $.extend(Options, options);
  }

  function cookieExpire(value) {
    if(typeof value == 'number')
      cookieOptions({
        expires: value
      });
    return Options.expires;
  }

});
