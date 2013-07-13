/*
 *  Create by Y.Sakamoto 2010/08/20
 *  ----------------
 *  NECESSARY ALONE:
 *  	(1) uaAnalyzer (in Main)
 *  ----------------
 */
$(function() {

  var Rules = {
    integer: [['0', '9']],
    sLetter: [['a', 'z']],
    lLetter: [['A', 'Z']],
    dot: ['Dot'],
    operation: ['BackSpace', 'Tab', 'Shift', 'Ctrl', 'Alt', 'Esc', 'Space',
      'Left', 'Up', 'Right', 'Down']
  };

  var _devices = ['Mobile', 'iPhone OS 3_1_3', 'iPad', 'Android'];
  var _generic = '_generic';

  var _device = _generic;
  var Kc = {}, KcFn = {}, KcOnceFn = {}, Pressed = {};

  Kc[_generic] = {
    0: 48,
    1: 49,
    2: 50,
    3: 51,
    4: 52,
    5: 53,
    6: 54,
    7: 55,
    8: 56,
    9: 57,
    A: 65,
    a: {
      _generic: 65,
      keypress: 97
    },
    c: 67,
    e: 69,
    l: 76,
    n: 78,
    s: 83,
    Z: 90,
    z: {
      _generic: 90,
      keypress: 122
    },
    BackSpace: 8,
    Tab: 9,
    Enter: 13,
    Shift: 16,
    Ctrl: 17,
    Alt: 18,
    Esc: 27,
    Space: 32,
    Left: 37,
    Up: 38,
    Right: 39,
    Down: 40,
    Dot: {
      _generic: 191,
      keypress: 46
    },
    pageX: function(e) {
      return e.pageX;
    },
    pageY: function(e) {
      return e.pageY;
    }
  };

  Kc['Mobile'] = {
    mousedown: 'touchstart',
    mousemove: 'touchmove',
    mouseup: 'touchend',
    pageX: function(e) {
      return e.targetTouches[0] ? e.targetTouches[0].pageX
        : e.targetTouches.pageX;
    },
    pageY: function(e) {
      return e.targetTouches[0] ? e.targetTouches[0].pageY
        : e.targetTouches.pageY;
    }
  };

  Kc['iPhone OS 3_1_3'] = {
    mousedown: 'touchstart',
    mousemove: 'touchmove',
    mouseup: 'touchend',
    Enter: 10
  };

  Kc['iPad'] = {
    mousedown: 'touchstart',
    mousemove: 'touchmove',
    mouseup: 'touchend'
  };

  Kc['Android'] = {};

  ['Down', 'Up', 'Left', 'Right', 'Enter', 'Space', 'Tab', 'Ctrl', 'Alt',
    'Esc', 'Shift', 'BackSpace'].concat('acelns'.split('')).forEach(
    function(k) {
      KcFn[k] = {
        down: [],
        up: []
      };
      KcOnceFn[k] = {
        down: [],
        up: []
      };
      Pressed[k] = 0;
    });

  $xj.add('BRIDGE', {
    getKeyCode: getKeyCode,
    isPressed: isPressed,
    onKey: onKey,
    offKey: offKey
  });

  // first call for bridging //
  for( var i = 0; i < _devices.length; i++)
    if(navigator.userAgent.match(ns._devices[i]))
      _device = _devices[i];

  // extend jquery function //
  $.fn.presskey = function(key, fn) {
    var key_arr = key.split(' '), keys = {};
    for( var i = 0; i < key_arr.length; i++)
      keys[getKeyCode(key_arr[i])] = true;
    on(this, 'keydown', function() {
      if(keys[arguments[0].keyCode])
        fn.apply(null, arguments);
    });
  };

  $.fn.presskeyOne = function(key, fn) {
    var key_arr = key.split(' '), keys = {};
    for( var i = 0; i < key_arr.length; i++)
      keys[getKeyCode(key_arr[i])] = true;
    one(this, 'keydown', function() {
      if(keys[arguments[0].keyCode])
        fn.apply(null, arguments);
    });
  };

  $.fn.bridge = function(name, fn) {
    on(this, name, fn);
  };

  $.fn.bridgeOne = function(name, fn) {
    one(this, name, fn);
  };

  // preset necessary events //

  $(document).on('keydown', function(e) {
    var keyName = eventToKeyName(e);
    if(!keyName)
      return;
    exec(e, keyName, 'down'), execOnce(e, keyName, 'down');
  });

  $(document).on('keyup', function(e) {
    var keyName = eventToKeyName(e);
    if(!keyName)
      return;
    clearPress(keyName), exec(e, keyName, 'up');
  });

  $(window).focus(function() {
    for( var i in Pressed)
      Pressed[i] = 0;
  });

  function getKeyCode(key, type) {
    var retKey = Kc[_device][key] || Kc[_generic][key];
    return $.isPlainObject(retKey) ? (retKey[type] ? retKey[type]
      : retKey[_generic]): retKey;
  }

  function getEventName(key) {
    return Kc[_device] && Kc[_device][key] ? Kc[_device][key]: key;
  }

  function isPressed(key) {
    return Pressed[key] != 0;
  }

  function onKey(key, fn, o) {
    var tgt = null;
    o = $.extend({
      type: 'always',
      action: 'down',
      pressed: []
    }, o);
    switch(o['type']) {
    case 'once':
      tgt = KcOnceFn[key];
      break;
    default:
      tgt = KcFn[key];
    }
    tgt[o['action']].push({
      fn: fn,
      pressed: o['pressed']
    });
  }

  function offKey(key, fn, o) {
    var tgt = null;
    o = $.extend({
      type: 'always',
      action: 'down',
      pressed: []
    }, o);
    switch(o['type']) {
    case 'once':
      tgt = KcOnceFn[key];
      break;
    default:
      tgt = KcFn[key];
    }
    if(!fn)
      tgt = [];
    else {
      var i = 0, aObj;
      while(aObj = tgt[o['action']][i]) {
        if(aObj['fn'] === fn) {
          var a = tgt[o['action']];
          tgt[o['action']] = a.slice(0, i).concat(a.slice(i + 1, a.length));
          break;
        }
        i++;
      }
    }
  }

  // private

  function checkKeyCode(e, key) {
    return e.keyCode == getKeyCode(key, e.type);
  }

  function checkCodeEnhanced(e, rules) {
    if(!$.isArray(rules))
      rules = Rules[rules];
    for( var i = 0; i < rules.length; i++) {
      var from, to;
      if($.isArray(rules[i])) {
        from = getKeyCode(rules[i][0]), to = getKeyCode(rules[i][1]);
      } else {
        from = getKeyCode(rules[i]), to = getKeyCode(rules[i]);
      }
      if(from <= e.keyCode && e.keyCode <= to)
        return true;
    }
    return false;
  }

  function eventToKeyName(e) {
    for( var i in Kc[_generic])
      if(e.keyCode == getKeyCode(i))
        return i;
  }

  function eventParameter(e, key) {
    if(typeof event != 'undefined' && event.targetTouches)
      e = event;
    return (Kc[_device][key] || Kc[_generic][key])(e);
  }

  function on(dom, key, fn) {
    dom.on(getEventName(key), fn);
  }

  function one(dom, key, fn) {
    dom.one(getEventName(key), fn);
  }

  function exec(e, key, action, once) {

    var tgt = $.extend(true, {}, (once) ? KcOnceFn: KcFn);
    if(!tgt[key] || !tgt[key][action].length)
      return;

    var i = 0, aObj = null;
    loop1: while(aObj = tgt[key][action][i]) {
      if(aObj['pressed'].length)
        loop2: for( var j = 0; j < aObj['pressed'].length; j++) {
          if(!Pressed[aObj['pressed'][j]]) {
            i++;
            continue loop1;
          }
        }
      else
        loop3: for( var j in Pressed) {
          if(j == key)
            continue;
          if(Pressed[j]) {
            i++;
            continue loop1;
          }
        }
      if($.isFunction(aObj['fn']))
        aObj['fn'](e);
      i++;
    }
  }

  function execOnce(e, key, action) {
    ++Pressed[key] != 1 && exec(e, key, action, true);
  }

  function clearPress(key) {
    Pressed[key] = 0;
  }

});
