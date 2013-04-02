/*
 *  Create by Y.Sakamoto 2010/08/20
 *  ----------------
 *  NECESSARY ALONE:
 *  	(1) uaAnalyzer (in Main)
 *  	(2) smartHandler
 *  ----------------
 */
$(function() {
  $xj
      .add('BRIDGE', {
        OS: null,
        OSVersion: null,
        Browser: null,
        BrowserVersion: null,
        Device: null,
        Compatibility: false,
        Rules: {
          integer: [['0', '9']],
          sLetter: [['a', 'z']],
          lLetter: [['A', 'Z']],
          dot: ['Dot'],
          operation: ['BackSpace', 'Tab', 'Shift', 'Ctrl', 'Alt', 'Esc',
            'Space', 'Left', 'Up', 'Right', 'Down']
        },
        _devices: ['Mobile', 'iPhone OS 3_1_3', 'iPad', 'Android'],
        _device: null,
        _GENERIC: '_generic',
        _generic: {
          Kc0: 48,
          Kc1: 49,
          Kc2: 50,
          Kc3: 51,
          Kc4: 52,
          Kc5: 53,
          Kc6: 54,
          Kc7: 55,
          Kc8: 56,
          Kc9: 57,
          KcA: 65,
          Kca: {
            _generic: 65,
            keypress: 97
          },
          Kcc: 67,
          Kce: 69,
          Kcl: 76,
          Kcn: 78,
          Kcs: 83,
          KcZ: 90,
          Kcz: {
            _generic: 90,
            keypress: 122
          },
          KcBackSpace: 8,
          KcTab: 9,
          KcEnter: 13,
          KcShift: 16,
          KcCtrl: 17,
          KcAlt: 18,
          KcEsc: 27,
          KcSpace: 32,
          KcLeft: 37,
          KcUp: 38,
          KcRight: 39,
          KcDown: 40,
          KcDot: {
            _generic: 191,
            keypress: 46
          },
          pageX: function(e) {
            return e.pageX;
          },
          pageY: function(e) {
            return e.pageY;
          }
        },
        'Mobile': {
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
        },
        'iPhone OS 3_1_3': {
          mousedown: 'touchstart',
          mousemove: 'touchmove',
          mouseup: 'touchend',
          enterKc: 10
        },
        'iPad': {
          mousedown: 'touchstart',
          mousemove: 'touchmove',
          mouseup: 'touchend'
        },
        'Android': {},
        bind: function(dom, key, fn) {
          dom.bind(xjQuery.BRIDGE.getEvent(key), fn);
        },
        getKc: function(key, type) {
          var ns = xjQuery.BRIDGE;
          key = key.split(0, 2) == 'Kc' ? key: ['Kc', key].join("");
          var retKey = ns[ns._device][key] || ns[ns._GENERIC][key];
          return $.isPlainObject(retKey) ? (retKey[type] ? retKey[type]
            : retKey[ns._GENERIC]): retKey;
        },
        getEvent: function(key) {
          var ns = xjQuery.BRIDGE;
          return ns._device == ns._GENERIC ? key: ns[ns._device][key]
            ? ns[ns._device][key]: key;
        },
        eParam: function(e, key) {
          var ns = xjQuery.BRIDGE;
          if(!e.targetTouches && typeof event != 'undefined'
            && event.targetTouches)
            e = event;
          return (ns[ns._device][key] || ns[ns._GENERIC][key])(e);
        },
        checkKc: function(e, key) {
          return e.keyCode == xjQuery.BRIDGE.getKc(key, e.type);
        },
        checkKcEnhance: function(e, rules) {
          var ns = xjQuery.BRIDGE;
          if(!$.isArray(rules))
            rules = ns.Rules[rules];
          for( var i = 0; i < rules.length; i++) {
            var from, to;
            if($.isArray(rules[i])) {
              from = ns.getKc(rules[i][0]);
              to = ns.getKc(rules[i][1]);
            } else {
              from = ns.getKc(rules[i]);
              to = ns.getKc(rules[i]);
            }
            if(from <= e.keyCode && e.keyCode <= to)
              return true;
          }
          return false;
        },
        event2KcName: function(event) {
          for( var i in xjQuery.BRIDGE._generic)
            if(event.keyCode == xjQuery.BRIDGE.getKc(i))
              return i;
        },
        _kcFn: {
          'a': {
            down: [],
            up: []
          },
          'c': {
            down: [],
            up: []
          },
          'e': {
            down: [],
            up: []
          },
          'l': {
            down: [],
            up: []
          },
          'n': {
            down: [],
            up: []
          },
          's': {
            down: [],
            up: []
          },
          'Down': {
            down: [],
            up: []
          },
          'Up': {
            down: [],
            up: []
          },
          'Left': {
            down: [],
            up: []
          },
          'Right': {
            down: [],
            up: []
          },
          'Enter': {
            down: [],
            up: []
          },
          'Space': {
            down: [],
            up: []
          },
          'Tab': {
            down: [],
            up: []
          },
          'Ctrl': {
            down: [],
            up: []
          },
          'Alt': {
            down: [],
            up: []
          },
          'Esc': {
            down: [],
            up: []
          },
          'Shift': {
            down: [],
            up: []
          }
        },
        _kcOnceFn: {
          'a': {
            down: [],
            up: []
          },
          'c': {
            down: [],
            up: []
          },
          'e': {
            down: [],
            up: []
          },
          'l': {
            down: [],
            up: []
          },
          'n': {
            down: [],
            up: []
          },
          's': {
            down: [],
            up: []
          },
          'Down': {
            down: [],
            up: []
          },
          'Up': {
            down: [],
            up: []
          },
          'Left': {
            down: [],
            up: []
          },
          'Right': {
            down: [],
            up: []
          },
          'Enter': {
            down: [],
            up: []
          },
          'Space': {
            down: [],
            up: []
          },
          'Tab': {
            down: [],
            up: []
          },
          'Ctrl': {
            down: [],
            up: []
          },
          'Alt': {
            down: [],
            up: []
          },
          'Esc': {
            down: [],
            up: []
          },
          'Shift': {
            down: [],
            up: []
          }
        },
        _pressed: {
          a: 0,
          c: 0,
          e: 0,
          l: 0,
          n: 0,
          s: 0,
          Shift: 0,
          Ctrl: 0,
          Alt: 0
        },
        isPressed: function(key) {
          return xjQuery.BRIDGE._pressed[key] != 0;
        }
        /**
         * TODO PRESSEDは要件が圧縮できるならば altKey:true や ctrlKey:trueを用いる形式にする。
         */
        ,
        bindKc: function(key, fn, o) {
          var tgt = null;
          o = $.extend({
            type: 'always',
            action: 'down',
            pressed: []
          }, o);
          switch(o['type']) {
          case 'once':
            tgt = xjQuery.BRIDGE._kcOnceFn[key];
            break;
          default:
            tgt = xjQuery.BRIDGE._kcFn[key];
          }
          tgt[o['action']].push({
            fn: fn,
            pressed: o['pressed']
          });
        },
        unbindKc: function(key, fn, o) {
          var tgt = null;
          o = $.extend({
            type: 'always',
            action: 'down',
            pressed: []
          }, o);
          switch(o['type']) {
          case 'once':
            tgt = xjQuery.BRIDGE._kcOnceFn[key];
            break;
          default:
            tgt = xjQuery.BRIDGE._kcFn[key];
          }
          if(!fn)
            tgt = [];
          else {
            var i = 0, aObj;
            while(aObj = tgt[o['action']][i]) {
              if(aObj['fn'] === fn) {
                var a = tgt[o['action']];
                tgt[o['action']] = a.slice(0, i).concat(
                  a.slice(i + 1, a.length));
                break;
              }
              i++;
            }
          }
        },
        exec: function(e, key, action, once) {
          var tgt = $.extend(true, {}, (once) ? xjQuery.BRIDGE._kcOnceFn
            : xjQuery.BRIDGE._kcFn);
          if(!tgt[key] || !tgt[key][action].length)
            return;
          var i = 0, aObj;
          loop1: while(aObj = tgt[key][action][i]) {
            if(aObj['pressed'].length)
              loop2: for( var j = 0; j < aObj['pressed'].length; j++) {
                if(!xjQuery.BRIDGE._pressed[aObj['pressed'][j]]) {
                  i++;
                  continue loop1;
                }
              }
            else
              loop3: for( var j in xjQuery.BRIDGE._pressed) {
                if(j == key)
                  continue;
                if(xjQuery.BRIDGE._pressed[j]) {
                  i++;
                  continue loop1;
                }
              }
            if($.isFunction(aObj['fn']))
              aObj['fn'](e);
            i++;
          }
        },
        execOnce: function(e, key, action) {
          var ns = xjQuery.BRIDGE;
          ns._pressed[key]++;
          if(ns._pressed[key] != 1)
            return;
          ns.exec(e, key, action, true);
        },
        clearPress: function(key) {
          xjQuery.BRIDGE._pressed[key] = 0;
        },
        event2keyName: function(e) {
          var kcName = $xj.event2KcName(e);
          if(!kcName)
            return;
          return kcName.replace('Kc', '');
        }
      });
  $.extend(xjQuery.BRIDGE, $xj.uaAnalyze(navigator.userAgent));

  // first call for bridging //
  var ns = xjQuery.BRIDGE;
  if(!ns._device) {
    for( var i = 0; i < ns._devices.length; i++) {
      if(navigator.userAgent.match(ns._devices[i]))
        ns._device = ns._devices[i];
    }
    if(!ns._device)
      ns._device = ns._GENERIC;
  };

  // extend jquery function //
  $.fn.presskey = function(key, fn) {
    var key_arr = key.split(' '), keys = {};
    for( var i = 0; i < key_arr.length; i++)
      keys[$xj.getKc(key_arr[i])] = true;
    $xj.bind(this, 'keydown', function() {
      if(keys[arguments[0].keyCode])
        fn.apply(null, arguments);
    });
  };
  $.fn.bridge = function(name, fn) {
    $xj.bind(this, name, fn);
  };

  // preset necessary events //
  $(document).bind("keypress", function(e) {
    /*
    if(e.keyCode == 48)
        $xj.clearEvent(e);
        */
  });
  $(document).bind("keydown", function(e) {
    var keyName = xjQuery.BRIDGE.event2keyName(e);
    if(!keyName)
      return;
    xjQuery.BRIDGE.exec(e, keyName, 'down');
    xjQuery.BRIDGE.execOnce(e, keyName, 'down');
  });
  $(document).bind("keyup", function(e) {
    var keyName = xjQuery.BRIDGE.event2keyName(e);
    if(!keyName)
      return;
    xjQuery.BRIDGE.clearPress(keyName);
    xjQuery.BRIDGE.exec(e, keyName, 'up');
  });
  $(window).focus(function() {
    for( var i in xjQuery.BRIDGE._pressed)
      xjQuery.BRIDGE._pressed[i] = 0;
  });
});
