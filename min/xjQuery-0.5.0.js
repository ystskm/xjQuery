/*!
 * xjQuery JavaScript Library v0.5.0 rev.550
 *
 * Copyright 2013 Yoshitaka Sakamoto <brilliantpenguin@gmail.com>
 * Released under the MIT license
 * http://github.com/ystskm/xjQuery/blob/master/LICENSE.md
 *
 * Date: 2014-08-26 21:37:14
 *//***/
(function(has_win, has_mod) {

  var win, exports, $;
  if(!has_win || (window.jQuery) == null)
    return console.error('xjQuery cannot load in this environment.');

  // set target
  win = window, $ = win.jQuery;
  if(win.xjQuery && win.xjQuery.version)
    return;

  // debug function set if ALONE.com.debug.js is Loaded.
  var debug = typeof win.debug == 'function' ? win.debug('xjQuery'): $.noop;

  // internal event name creator
  var internalEmitter = $({}), internalEventName = function(type) {
    return typeof foonyah == 'undefined' ? type: foonyah
        .internalEventName(type);
  };

  // for response debug
  var mem = Date.now();
  xjQuery.watcher = function() {
    // TODO
  };

  // main function
  function xjQuery() {

    if(this instanceof xjQuery)
      return this;

    var arg0 = arguments[0], arg1 = arguments[1];
    var typ0 = typeof arg0, typ1 = typeof arg1;

    // wait prepare mode
    if('function' == typ1 && ('string' == typ0 || Array.isArray(arg0))) {

      // string support for prepare
      if('string' == typ0)
        arg0 = arg0.split(' ');

      // xjQuery event ready binding
      var places = arg0, fn = arg1, dfds = [];
      for( var i = 0; i < places.length; i++)
        if(!xjQuery.data('readystatus', places[i])) {
          var dfd = new $.Deferred();
          xjQuery.one('ready', places[i], (function(dfd) {
            return function() {
              dfd.resolve(), dfds;
            };
          }(dfd))), dfds.push(dfd);
        }
      return $.when.apply($, dfds).done(fn);

    }

    // parser mode
    // remove comments, compress space, parseHTML and make jQuery object
    if('string' == typ0) {
      var str = arg0.replace(/\r\n|\r|\n/g, ''), st;
      while(~(st = str.indexOf('<!--')))
        str = str.substr(0, st) + str.substr(str.indexOf('-->') + 3);
      return $(str.replace(/>\s+</g, '><'));
    }

    // use when "foonyah" is loaded
    if('function' == typ0 && win.foonyah)
      return foonyah.isStarted() ? arg0(): $(win).one(
        foonyah.internalEventName('load'), arg0);

  }

  //$xj is not same object as xjQuery.
  function $xj(arg0, arg1) {
    return xjQuery(arg0, arg1);
  };

  // states
  var xjstate = {
    ready: 'ready'
  };

  // set to define getter
  var getters = {

    version: '0.5.0',
    release: '2014-08-26 21:37:14',
    workon: typeof global == 'undefined' ? 'Browser': 'Node',
    data_target: internalEmitter,
    event_target: internalEmitter,

    data: function(name, place, val) {
      var target = $(this.data_target);
      var status = target.data(this.dataName(name));
      !status && target.data(this.dataName(name), status = {});
      return val ? status[place] = val: status[place];
    },

    dataName: function(name) {
      return 'xjquery' + xjstate[name];
    },

    bind: function(name, place, fn) {
      $(this.event_target).bind(this.eventName(name, place), fn);
    },

    one: function(name, place, fn) {
      $(this.event_target).one(this.eventName(name, place), fn);
    },

    trigger: function(name, place, args) {
      $(this.event_target).trigger(this.eventName(name, place), args || []);
    },

    eventName: function(name, place) {
      return name + 'eventofxjQuery' + place;
    },

    triggerReady: function(place) {
      this.data('readystatus', place, 'ready'), this.trigger('ready', place);
    }

  };

  // Map over xjQuery in case of overwrite
  //var _xjQuery = window.xjQuery;

  // Map over the $xj in case of overwrite
  //var _$xj = window.$xj;

  // set normally
  var parameters = {
    add: add,
    extend: extend
  }

  function add(name, obj) {
    debug('xjQuery.' + name + ' will be extend.');
    xjQuery[name] = obj, $.isFunction(obj) ? $xj[name] = obj: $
        .extend($xj, obj);
  }

  function extend(base, name, ext, obj) {
    if(obj == null)
      obj = ext, ext = true;
    base[name] ? $.extend(true, base[name], obj): base[name] = obj;
    ext == null ? false: (ext === true ? $.extend(true, window.$xj, obj): $
        .extend(true, ext, obj));
  }

  // defineGetter function
  var callparameter = function(value) {
    return function() {
      return value;
    };
  };

  // defineSetter function
  var prohibitsetter = function(k) {
    return function() {
      console.error('Forbidden action to xjQuery.' + k);
      return false;
    };
  };

  // TODO performance check
  for( var i in getters)
    (function(rule) {
      Object.defineProperty(xjQuery, i, rule);
      Object.defineProperty($xj, i, rule);
    })({
      get: callparameter(getters[i]),
      set: prohibitsetter(i)
    })

  // Expose, inherits parameters to $xj.
  win.xjQuery = $.extend(xjQuery, parameters);
  win.$xj = $.extend($xj, xjQuery);

  // Expose (Node Pattern)
  // attention: [chrome] module == null
  has_mod && module && (module.exports = win.$xj);

  return xjQuery;

})(typeof window != 'undefined', typeof module != 'undefined')
  && (function(has_win) {

    var win, xjQuery, $xj;

    // set variable
    // ============= for Node Common ============ //
    win = window, xjQuery = win.xjQuery, $xj = win.$xj;

    // =========== closure variables ============ //
    var _console = function(msg, fn) {

      var show_message = typeof win.foonyah != 'undefined'
        && foonyah.ShowMessages === true ? true: false;
      fn == null && (fn = 'log');

      if(fn == 'log' && show_message !== true)
        return;

      typeof fn == 'string' && (fn = console[fn]);
      fn.call(this === win || this === global ? console: this,
        'xjQuery console : ', msg);

    };

    /// ============ prototype common =========== //
    var _addEmitterAction = function(place, proto) {
      // dedicated to jQuery event functions
      ['bind', 'unbind', 'on', 'one', 'off', 'trigger'].forEach(function(prop) {
        proto[prop] = function(name, fn) {
          this._emitter[prop](xjQuery.eventName(name, place));
        };
      });
      return proto;
    };

    // ================= ComUtil ================ //
    (function($, xjQuery, $xj) {

      $xj.add('ComUtil', {
        getId: getId,
        uaAnalyze: uaAnalyze
      });

      function getId() {
        var now = Date.now();
        if(now != getId.now)
          getId.cnt = 0, getId.now = now;
        return now + '' + getId.cnt++;
      }

      function uaAnalyze(ua, criteria) {

        criteria = $.extend({
          "Chrome": 10,
          "Safari": 4,
          "Firefox": 4,
          "MSIE": 9,
          "Opera": 9
        }, criteria);

        var mtc = null;
        var bws = null, bwsver = null;
        var os = null, osver = null, device = null, device_type = null;
        if(mtc = ua.match(/(Opera[\s\/]\d+\.\d{1,2})/))
          bws = "Opera";
        else if(mtc = ua.match(/(MSIE[\s\/]\d+\.\d{1,2})/))
          bws = "MSIE";
        else if(mtc = ua.match(/(Firefox[\s\/]\d+\.\d)/))
          bws = "Firefox";
        else if(mtc = ua.match(/(Chrome[\s\/]\d+\.\d)/))
          bws = "Chrome";
        else if(/Safari/.test(ua)) {
          bws = "Safari";
          if(mtc = ua.match(/(Version[\s\/]\d+\.\d)/))
            bwsver = mtc[1].slice("Version".length + 1);
          else if(/AppleWebKit[\s\/]4\d{2}/.test(ua))
            bwsver = 2;
          else if((mtc = ua.match(/\d?(\d{3})\./)) && parseInt(mtc[1]) > 533)
            bwsver = 5;
        } else if(mtc = ua.match(/(Sleipnir[\s\/]\d\.\d)/))
          bws = "Sleipnir";
        else if(mtc = ua.match(/(Konqueror[\s\/]\d\.\d)/))
          bws = "Konqueror";
        else if(/Netscape/.test()) {
          bws = "Netscape";
          if(mtc = ua.match(/(Netscape\d)/))
            bwsver = mtc[1].slice(bws.length);
          else if(mtc = ua.match(/(Netscape[\s\/]\d\.\d{1,2})/))
            ;
        } else if(mtc = ua.match(/(DoCoMo[\s\/]\d+\.\d)/)) {
          bws = "DoCoMo";
          device_type = "cellular";
        } else if(mtc = ua.match(/KDDI/)) {
          bws = "KDDI";
          device_type = "cellular";
        } else if(mtc = ua.match(/(J-PHONE[\s\/]\d+\.\d)/)) {
          bws = "J-PHONE";
          device_type = "cellular";
        } else if(mtc = ua.match(/(SoftBank[\s\/]\d+\.\d)/)) {
          bws = "SoftBank";
          device_type = "cellular";
        } else if(mtc = ua
            .match(/(\s|^)([\w-]+(([b|B]ot)|([s|S]pider))[\w-]*)\/(\d+(\.\w+))(\s|;|$)/)) {
          bws = mtc[2], bwsver = mtc[6];
          device_type = "robot";
        } else if(mtc = ua.match(/^(([\w\.]+)\/([\d\._-]+$)?)/)) {
          bws = mtc[2], bwsver = mtc[3];
          device_type = "robot";
        } else if(mtc = ua.match(/((Node)\.js.+)v(\d+\.\d+\.\d+)/)) {
          bws = mtc[2], bwsver = mtc[3];
          device_type = "robot";
        }

        if(!bws)
          bws = "Other";

        if(!bwsver) {
          mtc ? bwsver = mtc[1].slice(bws.length + 1): (function() {
            console.warn('Unrecognized browser version: ' + ua)
          })();
        }

        // OS judgement
        if(/Linux/.test(ua)) {
          os = "Linux";
          if(mtc = ua.match(/Android (\d\.\d)/)) {
            os = "Android", osver = mtc[1];
            device_type = "mobile";
          }
        } else if(/Android;/i.test(ua)) {
          // add for Firefox 20
          os = "Android";
        } else if(/BSD/.test(ua)) {
          if(/FreeBSD/.test(ua)) {
            os = "FreeBSD";
          } else {
            os = "BSD";
          }
        } else if(/SunOS/.test(ua)) {
          os = "SunOS";
          if(mtc = ua.match(/(SunOS[\s\/]\d\.\d)/))
            osver = mtc[1].slice(os.length + 1, os.length + 4);
          os = "Solaris";
        } else if(/Win[dN9][oT58]/.test(ua)) {
          os = "Windows";
          if(/Windows NT 5.0/.test(ua))
            osver = "2000";
          else if(/Windows 2000/.test(ua))
            osver = "2000";
          else if(/Windows NT 5.1/.test(ua))
            osver = "XP";
          else if(/Windows NT 5.2/.test(ua))
            osver = "2003";
          else if(/Windows XP/.test(ua))
            osver = "XP";
          else if(/Windows NT 6.0/.test(ua))
            osver = "Vista";
          else if(/Windows NT 6.1/.test(ua))
            osver = "7";
          else if(/Windows NT 6.2/.test(ua))
            osver = "8";
          else if(/Windows 98/.test(ua))
            osver = "98";
          else if(/Windows 95/.test(ua))
            osver = "95";
          else if(/Windows Me/.test(ua))
            osver = "Me";
          else if(/Windows NT/.test(ua))
            osver = "NT";
          else if(/Win95/.test(ua))
            osver = "95";
          else if(/Win98/.test(ua))
            osver = "98";
          else if(/WinNT/.test(ua))
            osver = "NT";
        } else if(/Mac/.test(ua)) {
          // Mozilla/5.0 (iPad; CPU OS 6_1_3 like Mac OS X) AppleWebKit/536.26 
          // (KHTML, like Gecko) CriOS/26.0.1410.50 Mobile/10B329 Safari/8536.25
          if(/iPod/.test(ua)) {
            os = "iOS", device_type = "mobile";
            device = "iPod";
          } else if(mtc = ua.match(/iPhone[^\d]+((\d+_?){1,3})/)) {
            os = "iOS", device_type = "mobile";
            osver = mtc[1].replace(/_/g, '.');
            device = "iPhone";
          } else if(mtc = ua.match(/iPad[^\d]+((\d+_?){1,3})/)) {
            os = "iOS", device_type = "tablet";
            osver = mtc[1].replace(/_/g, '.');
            device = "iPad";
          } else if(mtc = ua.match(/Mac OS[^\d]+((\d+_?){1,3})/)) {
            os = "OSX";
            osver = mtc[1].replace(/_/g, '.');
            device = "iMac";
          } else {
            os = "MacOS";
          }
        } else if(/Nintendo/.test(ua))
          device = "Nintendo";
        else if(/PlayStation/.test(ua))
          device = "PlayStation";
        else if(/DreamPassport/.test(ua))
          device = "DreamPassport";
        else if(mtc = ua.match(/Node\.js \(([^;]+);.+rv:v(\d+.\d+.\d+)/))
          os = mtc[1], osver = mtc[2];

        // TODO check tablet firefox
        if(device_type != 'tablet' && /Mobile/.test(ua)) {
          // add for Firefox 20
          device_type = "mobile";
        }

        return {
          Browser: bws,
          BrowserVersion: bwsver,
          OS: os,
          OSVersion: osver,
          Device: device || 'pc',
          DeviceType: device_type || 'laptop',
          Compatibility: criteria[bws] && bwsver >= criteria[bws],
          UserAgent: ua
        };
      }

    })($, xjQuery, $xj);

    // =================== xjQuery.CLASS =================== //
    /*
     *  Create by Y.Sakamoto
     */
    (function($, xjQuery, $xj) {

      var Constants = {
        initKey: 'initKey',
        initialize: 'initialize',
        definition: 'classDefinition'
      };

      $xj.add('CLASS', {
        makeClass: makeClass
      });

      makeClass.fn = makeClass.prototype = {
        init: init
      }

      function makeClass(definition, options) {

        var constants = $.extend({}, Constants, options);
        var initKey = definition[constants.initKey] || constants.initialize;

        // new class define
        var newClass = definition[initKey] || Function();
        newClass.prototype = new makeClass.fn.init(constants, definition);

        for( var i in definition)
          i != initKey && (newClass.prototype[i] = definition[i]);
        return newClass;

      }

      function init(constants, definition) {
        this[constants.definition] = definition;
      }

    })($, xjQuery, $xj);

    // =================== xjQuery.Chain =================== //
    /*
     *  Create by Y.Sakamoto
     */
    (function($, xjQuery, $xj) {

      var ChainConst = {
        Event: {
          Start: 'start',
          End: 'end'
        }
      };

      var nextTick = typeof setImmediate == 'function' ? function(fn) {
        setImmediate(fn);
      }: function(fn) {
        setTimeout(fn, 0); // 4ms as W3C draft
      }

      $xj.add('Chain', xjQuery.CLASS.makeClass(_addEmitterAction('Chain', {
        initialize: initialize,
        unstopping: unstopping,
        withArg: withArg,
        push: push,
        start: start,
        length: length,
        isStarted: isStarted,
        isEnded: isEnded,
        _next: _next,
        _next_unstop: _next_unstop,
        _callback: _callback,
        _callback_unstop: _callback_unstop,
        _execNextFn: _execNextFn,
        _error: _error
      })));

      function initialize() {
        this._emitter = new foonyah.Emitter();
        this._mystart = false, this._dfd = $.Deferred();
        this._position = 0, this._actors = [], this._witharg = [];
        this._unstop = false;
        this.push.apply(this, _toArray(arguments));
      }

      function unstopping(val) {
        this._unstop = (val === true);
        return this;
      }

      function withArg() {
        this._witharg = this._witharg.concat(_toArray(arguments));
        return this;
      }

      function push() {
        var actors = _toArray(arguments);
        if(this.unstop)
          for( var i = 0; i < actors.length; i++)
            this._next_unstop(actors[i]);
        else
          for( var i = 0; i < actors.length; i++)
            this._next(actors[i]);
        return this;
      }

      function start() {

        // return promise
        this._mystart = true;
        if(this._actors.length == 0)
          return this._dfd.resolve().promise();

        var args = _toArray(arguments);
        this._actors[this._position].apply(this, args);
        this.trigger(ChainConst.Event.Start);

        return this._dfd.promise();

      }

      function length() {
        return this._actors.length;
      }

      function isStarted() {
        return this._mystart === true;
      }

      function isEnded() {
        return this._mystart === true
          && (this._actors.length == 0 || this._position == this._actors.length - 1);
      }

      function _next(fn) {
        var self = this;
        this._actors.push(function() {
          var args = _toArray(arguments);
          if(args.length == 0)
            args = [null];
          var err = args.shift();
          fn.apply(self, [err].concat(self._witharg).concat(args).concat(
            self._callback()));
        });
      }

      function _next_unstop(fn) {
        var self = this;
        this._actors.push(function() {
          var args = _toArray(arguments);
          if(args.length == 0)
            args = [null];
          var err = args.shift();
          fn.apply(self, [err].concat(self._witharg).concat(args).concat(
            self._callback_unstop()));
        });
      }

      function _callback() {
        var self = this;
        return function(err) { // first argument is always err.
          var args = _toArray(arguments);
          if(err)
            return self._error.apply(self, args);
          nextTick(self._execNextFn(args));
        };
      }

      function _callback_unstop() {
        var self = this;
        return function(err) { // first argument is always err.
          var args = _toArray(arguments);
          nextTick(self._execNextFn(args));
        };
      }

      function _execNextFn(args) {

        var self = this;
        if(args.length == 0)
          args = [null];

        // for debug
        //console.log('[Chain] Prepare' + self.position + '/' + self.actors.length);

        return function() {
          try {

            // for debug
            //console.log('[Chain] Execute' + self.position + '/' + self.actors.length);

            if(self._actors[++self._position])
              return self._actors[self._position].apply(self, args);
            if(self._actors.length == self._position) {
              // avoid memory leak
              this._actors = [];
              return self.trigger(ChainConst.Event.End), self._dfd.resolve();
            }

            var mes = 'Duplicate next() call'
              + ' may occurs somewhere in $xj.Chain.';
            (typeof foonyah == 'undefined' ? console.log: foonyah.log)(mes);

          } catch(e) {

            args = _toArray(args);
            args.shift(), args.unshift(e);
            return self._error.apply(self, args);

          }
        };
      }

      function _error(err) {

        var args = _toArray(arguments), actor = null;
        this._dfd.reject(err);

        var lpos = this._actors.length - 1;
        if(this._position < lpos)
          actor = this._actors[lpos];

        // avoid memory leak
        this._actors = [];

        if(typeof actor == 'function')
          return actor.apply(this, args);
        else if(err instanceof Error)
          throw err;
        else
          throw new Error(err);

      }

    })($, xjQuery, $xj);

    // =================== xjQuery.when =================== //
    /*
     * async condition branching.
     *  Create by Y.Sakamoto
     */
    (function($, xjQuery, $xj) {
      $xj.add('when', when);

      function when(val) {
        return $.when.apply($, $.isArray(val) ? val.map(falsyAffect)
          : [falsyAffect(val)]);
        function falsyAffect(v) {
          if(!v)
            return $.Deferred().reject(v);
          return v && v.state ? v: $.Deferred().resolve(v);
        }
      }

    })($, xjQuery, $xj);

    // =================== xjQuery.require =================== //
    /*
     *  Create by Y.Sakamoto
     */

    (function($, xjQuery, $xj) {

      $xj.add('require', xjQuery.CLASS.makeClass({
        constant: constant,
        initialize: initialize,
        start: start,
        next: next,
        _listenFn: _listenFn,
        assign: assign,
        load: load
      }));

      function constant(key) {
        return {
          ManageKey: 'requre-',
          StorageKey: 'require'
        }[key];
      }

      function initialize(files, options, callback) {

        if(typeof options == 'function')
          callback = options, options = {};
        if(!(this instanceof xjQuery.require)) {
          var ins = new xjQuery.require(options).next(files);
          return ins.start(callback);
        }

        if(!$.isPlainObject(files))
          files = {};

        var self = this;
        this.options = $.extend({
          removeOnLoad: true,
          evalMode: false,
          packageName: this.constant('StorageKey'),
          versionKey: null
        }, options);

        this.chain = new $xj.Chain();
        this.finish = function(err, chainLast) {
          $.isFunction(self.options.finish) ? self.options.finish(err,
            chainLast): chainLast();
        };

        function hasManageKey(target) {
          var ManageKeyLen = self.constant('ManageKey').length;
          return target.slice(0, ManageKeyLen) == self.constant('ManageKey');
        }
        // first made
        if(!hasManageKey(this.options.packageName))
          this.options.packageName = [this.constant('ManageKey'),
            this.options.packageName].join("");
        if(this.options.versionKey) {
          this.codeUpdate = false;
          //        try {
          //          TODO bug report that localstrage cannot escape JSON
          //          this.options.srcManager = JSON.parse(localStorage.getItem(
          //            this.options.packageName).replace(/\\"/g, '"'));
          //        } catch(e) {
          //          // no localStorages
          //        };
          try {
            if(!this.options.srcManager) {
              for( var i in localStorage)
                if(hasManageKey(i))
                  localStorage.removeItem(i);
              this.options.srcManager = {};
            }
            this.options.versionString = [this.options.packageName, '-',
              options.versionKey].join("");
          } catch(e) {
            // no localStorages
          };
        } else {
          try {
            for( var i = 0; i < localStorage.length; i++) {
              var k = localStorage.key(i);
              if(new RegExp(this.options.packageName).test(k))
                localStorage.removeItem(k);
            }
            this.options.srcManager = {};
          } catch(e) {
            // no localStorages
          };
        }
        return this;
      }

      function start(fn) {
        // return chain $.Deferred()
        return this.chain.push(fn || this.finish).start();
      }

      function next() {

        var self = this, files = [];
        var args = $.isArray(arguments[0]) ? arguments[0]: _toArray(arguments);
        for( var i = 0; i < args.length; i++)
          if(typeof args[i] == 'string')
            files = files.concat(args[i].split(/\s/));

        if(files.length) {
          var fncs = [], dfds = [];
          for( var i = 0; i < files.length; i++) {
            dfds.push(new $.Deferred());
            (function(dfd, file) {
              fncs.push(self.assign(file, dfd));
            })(dfds[i], files[i]);
          }
          this.chain.push(this._listenFn(fncs, $.when.apply($, dfds)));
        }

        return this;

      }

      function _listenFn(fncs, $when) {
        var self = this;
        return function(err, callback) {
          $when.done(_done).fail(_fail);
          for( var i = 0; i < fncs.length; i++)
            setTimeout(fncs[i], 0);
          function _done(results) {
            try {
              localStorage.setItem(self.options.packageName, JSON
                  .stringify(self.options.srcManager));
            } catch(e) {
            }
            callback(err);
          };
          function _fail(results) {
            _console("Phase on require:_fail()", 'error');
            for( var i in results) {
              var one = results[i];
              if(one instanceof Error) {
                _console(one.message, 'error');
                if(one.stack)
                  _console(one.stack, 'error');
              } else if($.isPlaneObject(one)) {
                _console(JSON.stringify(one));
              } else
                _console(one, 'error');
            }
          }
        };
      }

      function assign(arg, dfd) {
        var self = this;
        switch(typeof arg) {
        case 'string':
          return function() {
            self.load(arg, onload, onerror);
            function onload(maybe) {
              _console(arg + ' is Loaded.'
                + (maybe === true ? '(timeout message)': ''));
              dfd.resolve();
            };
            function onerror(e) {
              _console('fail to load script : ' + arg, 'error');
              // !! should not stop loading !!
              dfd.resolve();
            };
          };
          break;
        case 'function':
          return function(dfd) {
            try {
              arg.call(), dfd.resolve();
            } catch(e) {
              dfd.reject(e);
            }
          };
          break;
        }
      }

      function load(src, onload, onerror) {

        var self = this, code, old, noVersion = null, srcKey;
        var options = this.options;
        var sm = options.srcManager, removeOnLoad = options.removeOnLoad;

        // options is a clone of this.option.
        var pkg = options.packageName, ver = options.versionString;
        var mtc = null;

        if(mtc = src.match(/\.-([\w\.-]+)-pkg/)) {
          pkg = mtc[1];
          src = src.replace(/\.-([\w\.-]+)-pkg/, '');
          ver = ver.replace(/^\w+-/, [pkg, '-'].join(""));
        }

        if(mtc = src.match(/\.-([\w\.-]+)-ver/)) {
          ver = mtc[1];
          src = src.replace(/\.-([\w\.-]+)-ver/, '');
          ver = ver.replace(/-\w+$/, ['-', ver].join(""));
        } else if(/\.no-version/.test(src)) {
          src = src.replace(/\.no-version/, '');
          noVersion = true;
        }

        if(!noVersion && ver) {
          // if has versionKey & versionate
          srcKey = [ver, '.', src].join("");
          code = localStorage.getItem(srcKey);
          if(!code) {
            if(old = sm[src]) {
              localStorage.removeItem([old, '.', src].join(""));
              _console(src + ' is deleted from localStorage.');
            }
            evalRead();
          } else {
            _console(src + ' is found on localStorage!');
            evalRead(code);
          }
        } else
          evalRead();

        function evalRead(code) {

          var o_protocol = location.protocol;
          var o_host = location.host;
          var o_port = location.port || (/^http:/.test(o_protocol) ? 80: 443);

          var mtc = null;
          var s_protocol = (mtc = src.match(/(^https?:)/)) ? mtc[1]: o_protocol;
          var s_host = (mtc = src.match(/\/\/([^\/]+)\//)) ? mtc[1]: o_host;
          var s_port = (mtc = s_host.match(/:(\d+)$/)) ? mtc[1]: (/^http:/
              .test(s_protocol) ? 80: 443);
          if(options['evalMode'] && o_protocol == s_protocol
            && o_host == s_host && o_port == s_port) {
            if(!code)
              ajaxFileContents(src, callbackResult);
            else
              evalResult(code);
          } else {
            // if commit Access-Allow-Origin, then tagRead. ( cannot ajax read. )
            if(options['evalMode'])
              _console('xjQuery Notice: ' + src + ' is read by tag.');
            tagRead();
          }
        }

        function callbackResult(code) {
          evalResult(code);
        }

        function ajaxFileContents(path, fn) {
          // TODO why a certain file (such as COMPLEX.jscss.js)
          // cannot get by 'post'
          // $.ajax({type:'post',url:path,dataType:'text',success:fn});
          $.ajax({
            type: 'get',
            url: path,
            dataType: 'text',
            success: fn
          });
        }

        function evalResult(code) {
          var tag = false;
          sm[src] = ver, localStorage.setItem([ver, '.', src].join(""), code);
          try {
            $.globalEval(code);
          } catch(e) {
            tag = true;
            // !! should not stop loading !!
            _console('Error from JSLoader : misssing eval. src = ' + src);
          }
          if(!tag)
            (onload || $.noop)();
          else
            tagRead();
        }

        function tagRead() {

          // -- DOES NOT WORK!! but simple ... -- //
          //  $.getScript(src, function(data, textStatus) {
          //    textStatus == "success" ? onload(): onerror();
          //  });

          var element = options.append || document.body
            || document.documentElement;

          var script = document.createElement('script');
          script.src = src;
          script.type = !!options.type ? options.type: 'text/javascript';
          script.onload = script_onload, script.onerror = script_onerror;

          if(options.charset)
            script.charset = options.charset;
          if(document.all)
            script.onreadystatechange = onreadystatechange;
          element.appendChild(script);

          function script_onload() {
            if(removeOnLoad === true)
              element.removeChild(script);
            onload.apply(this, arguments);
          }

          function script_onerror() {
            if(removeOnLoad === true)
              element.removeChild(script);
            onerror.apply(this, arguments);
          }

          function onreadystatechange() {
            switch(script.readyState) {
            case 'complete':
            case 'loaded':
              script.onload();
              break;
            case 'error':
              script.onerror();
              break;
            }
          }

        }

      }

    })($, xjQuery, $xj);

    // =================== xjQuery.LAYOUT =================== //
    /*
     *  Create by Y.Sakamoto
     */
    (function($, xjQuery, $xj) {

      $xj.add('LAYOUT', {
        layStat: layStat,
        layCenter: layCenter
      });

      function layCenter(o, i) {
        var l = (layStat(o, 'width') - layStat(i, 'width')) / 2;
        var t = (layStat(o, 'height') - layStat(i, 'height')) / 2;
        return {
          left: l > 0 ? l: 0,
          top: t > 0 ? t: 0
        };
      }

      function layStat(dom, dirc) {
        var css;
        try {
          css = dom.css(dirc), aft;
        } catch(e) {
        };
        if(!css || isNaN(aft = css.replace('px')))
          return dom[dirc]();
        return parseInt(aft);
      }

    })($, xjQuery, $xj);

    // =================== xjQuery.JSCSS =================== //
    /*
     *  Create by Y.Sakamoto 2010/08/20
     *  ----------------
     *  NECESSARY ALONE:
     *    (1) uaAnalyzer (in xjQuery main)
     *  ----------------
     */
    (function($, xjQuery, $xj) {

      crossCss.auto = true;
      $xj.add('JSCSS', {
        crossCssAuto: crossCssAuto,
        crossCss: crossCss,
        codeAdjust: codeAdjust,
        codeToRgb: codeToRgb
      });

      function crossCssAuto(v) {
        if(typeof v == 'boolean')
          crossCss.auto = v;
        return crossCss.auto;
      }

      function crossCss(css, bws) {

        var browser = (bws || xjQuery.JSCSS.Browser).toLowerCase(), val = null;

        // copy the object
        css = $.extend(true, {}, css);

        Object.keys(css).forEach(function(k, i) {
          if(/[A-Z]/.test(k))
            css[k.replace(/[A-Z]/g, function(c) {
              return '-' + c.toLowerCase();
            })] = css[k], delete css[k];
        });

        // opacity
        val = css['opacity'];
        val && $.extend(css, {
          filter: 'alpha(opacity=' + parseFloat(val) * 100 + ')',
          '-moz-opacity': val
        });

        // box-shadow, border-radius
        $.each(['box-shadow', 'border-radius', 'border-top-left-radius',
          'border-top-right-radius', 'border-bottom-left-radius',
          'border-bottom-rigth-radius', 'user-select'], function(i, name) {
          if(val = css[name]) {
            var ext = {};
            ext['-webkit-' + name] = ext['-moz-' + name] = val;
            $.extend(css, ext);
          }
        });

        // flex
        val = css['display'];
        if(val == 'flex') {
          // TODO node.js browser compatibility on util-DOMWindow.js
          // :: markup() automatically
          if(browser == 'chrome' || browser == 'safari')
            css['display'] = css['-webkit-display'] = '-webkit-flex';
          else if(browser == 'firefox')
            css['display'] = css['background-moz'] = '-moz-flex';
        };

        $.each(['flex', 'justify-content', 'align-items', 'align-content',
          'flex-direction', 'flex-wrap', 'flex-basis'], function(i, name) {
          if(val = css[name]) {
            var ext = {};
            ext['-webkit-' + name] = ext['-moz-' + name] = val;
            ext['-ms-' + name] = ext['-o-' + name] = val;
            $.extend(css, ext);
          }
        });

        val = css['transition'];
        val && $.extend(css, {
          '-webkit-transition': val,
          '-moz-transition': val,
          '-ms-transition': val,
          '-o-transition': val
        });

        val = css['transform'];
        val && $.extend(css, {
          '-webkit-transform': val,
          '-moz-transform': val
        });

        val = css['background'];
        if(val && val.slice(0, 9) == 'gradient(') {
          var grad = val.slice(9).replace(/\)$/, '');
          if(grad) {
            delete css['background'];

            // rgba replace comma to hyphen 
            grad = grad.replace(
              /(rgba?\()([\d\s]+),([\d\s]+),(([\d\s]+),)?([\d\s\.]+)(\))/g,
              function() {
                var args = arguments;
                return args[1] + args[2] + '-' + args[3] + '-'
                  + (args.length > 5 ? args[5] + '-' + args[6]: args[5]) + ')';
              });

            // allows spaces of each side
            var stat = grad.split(',').map(function(v) {
              return $.trim(v);
            });

            var pa, type = stat[0];
            var rstyle = '', start = '', end = '';
            var startc = '', mid = 4, stops = [], endc = '';

            // linear,left top,left bottom,#000,#fff
            // radial[,circle closest-side],left top 10 50deg,right bottom 20,#000,#fff
            endc = stat[stat.length - 1];
            if(type == 'linear') {
              start = stat[1].split(' '), end = stat[2].split(' ');
              startc = stat[3];
            } else if(type == 'radial') {
              var key = stat[1].slice(0, 6);
              if(key == 'circle' || key == 'ellips') {
                rstyle = stat[1].split(' ');
                mid = 5;
              } else
                rstyle = ['circle', 'cover'];
              start = stat[mid - 3].split(' '), end = stat[mid - 2].split(' ');
              startc = stat[mid - 1];
            }

            // Chrome, Safari (WebKit)
            pa = new Array();
            pa.push(type);
            pa.push(start.slice(0, 2).join(' '));
            if(type == 'radial')
              pa.push(start.slice(2, 3).toString());
            pa.push(end.slice(0, 2).join(' '));
            if(type == 'radial')
              pa.push(end.slice(2, 3).toString());
            pa.push('from(' + $xj.codeAdjust(startc) + ')');
            for( var i = mid; i < stat.length - 1; i++) {
              var idx = stat[i].indexOf(" ");
              pa.push('color-stop(' + stat[i].substr(0, idx) + ','
                + $xj.codeAdjust(stat[i].substr(idx + 1)) + ')');
            }
            pa.push('to(' + $xj.codeAdjust(endc) + ')');
            css['background-webkit'] = '-webkit-gradient(' + pa.toString()
              + ')';

            // Firefox (WebKit)
            pa = new Array();
            start = stat[1].split(" ");
            end = stat[2].split(" ");
            var dir;
            if(start[0] == end[0]) {
              dir = start[1];
            } else if(start[1] == end[1]) {
              dir = start[0];
            } else {
              dir = stat[1];
            }
            startc = stat[3];
            for( var i = 4; i < stat.length - 1; i++) {
              var idx = stat[i].indexOf(" ");
              stops.push([$xj.codeAdjust(stat[i].substr(idx + 1)), ' ',
                stat[i].substr(0, idx) * 100, '%'].join(""));
            }
            endc = stat[stat.length - 1];
            pa.push(dir);
            pa.push($xj.codeAdjust(startc));
            if(stops.length)
              pa.push(stops.join());
            pa.push($xj.codeAdjust(endc));
            css['background-moz'] = '-moz-' + type + '-gradient(' + pa.join()
              + ')';

            // Opera
            pa = new Array();
            start = stat[1].split(" ");
            end = stat[2].split(" ");
            var dir = null;
            if(start[0] == end[0]) {
              dir = start[1];
            } else if(start[1] == end[1]) {
              dir = start[0];
            } else {
              dir = stat[1];
            }
            startc = stat[3];
            for( var i = 4; i < stat.length - 1; i++) {
              var p = stat[i].split(" ");
              stops.push([p[1], ' ', p[0] * 100, '%'].join(""));
            }
            endc = stat[stat.length - 1];
            //pa.push(dir);
            pa.push(startc);
            //        if(stops.length)
            //            pa.push(stops.join());
            pa.push(endc);
            // $.extend(css,{'background':['-o-',type,'-gradient(',pa.join(),')'].join("")});
            // TODO background-color is worse effect to gradient status
            //        $.extend(css, {
            //          'background-color': endc,
            //          'box-shadow': ['inset 0 5px 10px ', startc,
            //            ',inset 0 1px 1px ', endc].join("")
            //        }); 

            // IE
            pa = new Array();
            startc = xjQuery.JSCSS.codeAdjust(stat[3]);
            endc = xjQuery.JSCSS.codeAdjust(stat[stat.length - 1]);
            pa.push('GradientType=0');
            pa.push(['startColorstr=', startc].join(""));
            pa.push(['endColorstr=', endc].join(""));
            css['filter'] = ['progid:DXImageTransform.Microsoft.gradient(',
              pa.join(), ')'].join("");

            // default
            // TODO background-color is worse effect to gradient status
            //        css['background-color'] = stat[3];

            // TODO node.js browser compatibility on util-DOMWindow.js
            // :: markup() automatically

            if(browser == 'chrome' || browser == 'safari')
              css['background'] = css['background-webkit'];
            else if(browser == 'firefox')
              css['background'] = css['background-moz'];

          }
        }

        return css;

      }

      function codeAdjust(code) {

        // rgb or rgba
        if(code.substr(0, 3) == 'rgb')
          return code.replace(/-/g, ',');

        code = $.trim(code);
        // #xxx or #xxxxxx or color name
        if(!/^#[0-9A-Fa-f]{3}$|^#[0-9A-Fa-f]{6}|^[A-Za-z]+$/.test(code))
          throw new Error(' - illegal color code.(code = <' + code + '>)');

        if(code.length == 4)
          code = '#' + code[1] + code[1] + code[2] + code[2] + code[3]
            + code[3];
        return code;

      }

      function codeToRgb(code) {
        var ccode = codeAdjust(code).replace(/^#/, '');
        return [parseInt(ccode.slice(0, 2), '16'),
          parseInt(ccode.slice(2, 4), '16'), parseInt(ccode.slice(4, 6), '16')];
      }

      // Get userAgent status
      var ua = $xj.uaAnalyze(win.navigator['userAgent']);
      $.extend(xjQuery.JSCSS, ua), $.extend($xj, ua);

      // Overwrite jquery.prototype.css
      var _css = $.fn.css;
      $.fn.css = function() {

        if(crossCss.auto === false)
          return _css.apply(this, arguments);
        if(typeof arguments[0] == 'string' && arguments.length == 1)
          return _css.apply(this, arguments);

        var args = {};
        if(typeof arguments[0] == 'string')
          args[arguments[0]] = arguments[1];
        else
          args = arguments[0];
        return _css.call(this, crossCss(args));

      };
    })($, xjQuery, $xj);

    // WebSocket care
    if(typeof WebSocket == 'undefined' && typeof MozWebSocket != 'undefined')
      window.WebSocket = MozWebSocket;

    // internal utilities
    function _toArray(arg) {
      return Array.prototype.slice.call(arg);
    }

  })(typeof window != 'undefined');