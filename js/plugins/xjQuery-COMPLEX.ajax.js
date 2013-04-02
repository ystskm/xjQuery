/*
 * Create by Y.Sakamoto 2010/08/20 
 * ----------------
 * ATTENTION: this modules REQUIRES node-jquery-architecture server.
 * ---------------- 
 * NECESSARY COM ALONE:
 * (1) layout 
 * NECESSARY SIDE ALONE: 
 * (1) jsonUtil 
 * (2) objectUtil 
 * (3) session 
 * (4) timeUtil 
 * (5) i18n 
 * (6) smartHandler
 * NECESSARY SIDE EXTEND:
 * (1) layout
 * ----------------
 */
/**
 * TODO アプリケーション開発者向けのファンクションで ないものの名前の頭に(_)をつける。
 */
$(function() {
  $xj
      .add(
        'AJAX',
        {
          _AjaxSettings: {
            LibsPath: '/foonyahLibs',
            beforeSendFn: function(ajaxId, url, method, data, option) {
              if($('.xj_ajax_overlay').length == 0) {
                var loader_div = $('<div id="xj_ajax_loader"/>');
                if(!option || option['noloader'] !== true)
                  $('body').append(
                    loader_div.addClass('xj_ajax_overlay').css({
                      width: 'auto',
                      height: 'auto',
                      padding: '2px 5px 2px 5px',
                      'border-radius': 15,
                      background: '#fff none scroll 0 0',
                      margin: '0 auto 0 auto',
                      'text-align': 'center',
                      'z-index': 9999,
                      position: 'absolute',
                      top: '12px'
                    }).append($('<span/>').css({
                      padding: '4px 5px 2px 5px',
                      float: 'left',
                      position: 'relative',
                      margin: '0 auto 0 auto',
                      opacity: 0.8,
                      color: '#000'
                    }).text('Now Connecting...')).append(
                      $('<img/>').attr('src', '/xjQuery/css/images/loader.gif')
                          .css({
                            float: 'left',
                            position: 'relative',
                            margin: '0 auto 0 auto'
                          })));
                loader_div.css({
                  left: $xj.layCenter($(window), loader_div).left
                });
              }
              xjQuery.AJAX._AjaxLog[ajaxId] = {
                stime: $xj.clientUnixSec(),
                url: url,
                method: method,
                data: data,
                option: option
              };
            },
            ajaxErrFn: function(XMLHttpRequest, textStatus, errorThrown, errfn) {
              console.error(XMLHttpRequest.responseText);
              if(errfn)
                errfn(XMLHttpRequest, textStatus, errorThrown);
            },
            completeFn: function(ajaxId) {
              xjQuery.AJAX._AjaxLog[ajaxId]['etime'] = $xj.clientUnixSec();
              var flg = true;
              for( var i in xjQuery.AJAX._AjaxLog) {
                if(!xjQuery.AJAX._AjaxLog[i]['etime'])
                  flg = false;
                break;
              }
              if(flg && $('.xj_ajax_overlay').length)
                $('.xj_ajax_overlay').remove();
            }
          },
          _AjaxLog: []
          // get only method
          ,
          _getAjaxId: function(time) {
            var key, i = 0;
            do {
              key = time + i;
              i++;
            } while(xjQuery.AJAX._AjaxLog[key] && i < 999);
            return key;
          },
          getURL: function(fn) {
            return [$xj.ajaxSetting('LibsPath'), fn, ""].join("/");
          },
          getAjaxLog: function() {
            return this._AjaxLog;
          },
          // get and set
          ajaxSetting: function(key, value) {
            if(typeof value == 'undefined')
              return this._AjaxSettings[key];
            this._AjaxSettings[key] = value;
          },

          // execute ajax connection
          json: function(jslog, method, data, func, funcerr, obj, option,
            isRequest) {
            var url = isRequest ? method: $xj.getURL(method);
            data['FUNCTION'] = method;
            data['ANYSERVER'] = $xj.ajaxSetting('AnyServer');
            data['ACCESSTOKEN'] = $xj.ajaxSetting('AccessToken');
            var time = $xj.clientUnixSec() * 1000;
            var ajaxId = (jslog) ? xjQuery.AJAX._getAjaxId(time): 2000000000999;
            var sendOpt = {
              type: 'post',
              ajaxId: ajaxId,
              callbackObj: obj,
              data: data,
              dataType: 'json',
              beforeSend: $xj.ajaxSetting('beforeSendFn')(ajaxId, url, method,
                data, option),
              url: url,
              success: function(res) {
                // xjQuery.AJAX.ajaxSetting('completeFn')(ajaxId)
                if(func)
                  func(res, this);
              },
              error: function(XMLHttpRequest, textStatus, errorThrown) {
                // xjQuery.AJAX.ajaxSetting('completeFn')(ajaxId);
                $xj.ajaxSetting('ajaxErrFn')(XMLHttpRequest, textStatus,
                  errorThrown, funcerr);
              },
              // "complete" is not executed after finishing ajax. true is that
              // after sending ajax.
              complete: function() {
                $xj.ajaxSetting('completeFn')(ajaxId);
              }
            };
            if(option) {
              if(option['beforeSend'] || option['data'] || option['error']
                || option['success'] || option['ajaxId']
                || option['callbackObj'])
                alert('## xjQuery ERROR ## not overwritable param is sent.(not allowed:beforeSend|data|error|success|ajaxId|callbackObj');
              else
                $.extend(sendOpt, option);
            }
            switch(sendOpt['dataType']) {
            case 'json':
              var res = $.ajax(sendOpt).responseText;
              return res ? JSON.parse(res): res;
            default:
              return $.ajax(sendOpt).responseText;
            }
          },
          // request
          request: function(path, o) {
            if(!o)
              o = {};
            return $xj.json(o['jslog'], path, $.extend({
              LOGGING: o['aclog']
            }, o['param']), o['fn'], o['errfn'], o['callbackObj'],
              o['options'], true);
          },
          // directory operation
          dir: {
            getFileLists: function(dirc, o) {
              if(!o)
                o = {};
              return $xj.json(o['jslog'], 'getFileLists', {
                DIRC: dirc,
                RECUR: o['recur'],
                SEARCH: o['search'],
                APPKEY: o['appkey']
              }, o['fn'], o['errfn'], o['callbackObj'], o['options']);
            },
            getFile: function(file, o) {
              if(!o)
                o = {};
              var iframe = $('<iframe/>').hide();
              $('body').append(iframe);
              iframe.attr('src', [
                xjQuery.AJAX.ajaxSetting('getMashupUrl')(_xjpath.ToRoot),
                '?OPERATORID=', $xj.OnLogin.MemberId,
                '&FUNC=Util/DirectoryOperator', '&FUNCTION=getFile',
                '&APPKEY=', _xjpath.replace(/\/$/, ''), '&ROOT=', o['root'],
                '&DIRC=', xjQuery.AJAX.dir.notEvilPath(o['dirc']), '&FNAM=',
                xjQuery.AJAX.dir.notEvilName(file)].join(""));
              setTimeout(function() {
                iframe.remove();
              }, 300);
            },
            checkFileExistence: function(file, o) {
              if(!o)
                o = {};
              return xjQuery.AJAX.json(o['jslog'], 'checkFileExistence', {
                ROOT: o['root'],
                DIRC: o['dirc'],
                FNAM: file
              }, o['fn'], o['errfn'], o['callbackObj'], o['options']);
            },
            checkFilesExistence: function(files, o) {
              if(!o)
                o = {};
              var result = [[], []];
              execCheck(0, o);
              function execCheck(i, o) {
                xjQuery.AJAX.dir.checkFileExistence(files[i][0], {
                  fn: function(fc, ajaxParam) {
                    if(fc == "1")
                      result[0].push(files[i]);
                    else
                      result[1].push(files[i]);
                    if(i < files.length - 1)
                      execCheck(i + 1, ajaxParam['callbackObj']);
                    else if(o['fn'])
                      o['fn'](result, ajaxParam['callbackObj']);
                  },
                  dirc: files[i][1],
                  root: files[i][2],
                  callbackObj: o,
                  options: {
                    dataType: "text"
                  }
                });
              }
            },
            getFileContents: function(file, o) {
              if(!o)
                o = {};
              return $xj.json(o['jslog'], 'getFileContents', {
                ROOT: o['root'],
                DIRC: o['dirc'],
                FNAM: file,
                APPKEY: o['appkey']
              }, o['fn'], o['errfn'], o['callbackObj'], o['options']);
            },
            getFileRows: function(file, st, cnt, o) {
              if(!o)
                o = {};
              return xjQuery.AJAX.json(o['jslog'], 'Util/DirectoryOperator',
                'getFileRows', {
                  ROOT: o['root'],
                  DIRC: xjQuery.AJAX.dir.notEvilPath(o['dirc']),
                  FNAM: xjQuery.AJAX.dir.notEvilName(file),
                  STROW: st,
                  ROWS: cnt,
                  CHARSET: o['charset']
                }, o['fn'], o['errfn'], o['callbackObj'], o['options']);
            },
            checkURLExistence: function(url, o) {
              if(!o)
                o = {};
              return xjQuery.AJAX.json(o['jslog'], 'Util/DirectoryOperator',
                'checkURLExistence', {
                  URL: url
                }, o['fn'], o['errfn'], o['callbackObj'], o['options']);
            },
            getURLContents: function(url, o) { // not request !! xss permit.
              if(!o)
                o = {};
              return xjQuery.AJAX.json(o['jslog'], 'getURLContents', {
                URL: url
              }, o['fn'], o['errfn'], o['callbackObj'], o['options']);
            },
            makeJsonFile: function(file, data, o) {
              if(!o)
                o = {};
              return xjQuery.AJAX.json(o['jslog'], 'Util/DirectoryOperator',
                'makeJsonFile', {
                  ROOT: o['root'],
                  DIRC: xjQuery.AJAX.dir.notEvilPath(o['dirc']),
                  FNAM: xjQuery.AJAX.dir.notEvilName(file),
                  DATA: data
                }, o['fn'], o['errfn'], o['callbackObj'], o['options']);
            },
            makeUserFile: function(file, data, o) {
              if(!o)
                o = {};
              return xjQuery.AJAX.json(o['jslog'], 'Util/DirectoryOperator',
                'makeUserFile', {
                  DIRC: xjQuery.AJAX.dir.notEvilPath(o['dirc']),
                  FNAM: xjQuery.AJAX.dir.notEvilName(file),
                  DATA: data
                }, o['fn'], o['errfn'], o['callbackObj'], o['options']);
            },
          },
          // mail sender
          mail: {
            send: function(to, title, contents, o) {
              if(!o)
                o = {};
              return xjQuery.AJAX.json(o['jslog'], 'Util/MailOperator', 'send',
                {
                  TO: to,
                  TITLE: title,
                  CONTENTS: contents,
                  BCC: o['bcc']
                }, o['fn'], o['errfn'], o['callbackObj'], o['options']);
            }
          },
          // access log getter
          log: {
            getAccessLog: function(o) {
              if(!o)
                o = {};
              return xjQuery.AJAX.json(o['jslog'], 'Util/LogServer',
                'getAccessLog', {}, o['fn'], o['errfn'], o['callbackObj'],
                o['options']);
            }
          },
          // server information getter
          server: {
            getTime: function(o) {
              if(!o)
                o = {};
              return xjQuery.AJAX.json(false, 'Util/Miscellaneous',
                'getServerUnixSec', {}, o['fn'], o['errfn'], o['callbackObj'],
                $.extend({
                  async: false,
                  dataType: 'text'
                }, o['options']));
            },
            getMicroTime: function(o) {
              if(!o)
                o = {};
              return xjQuery.AJAX.json(false, 'Util/Miscellaneous',
                'getServerUnixMicroSec', {}, o['fn'], o['errfn'],
                o['callbackObj'], $.extend({
                  async: false,
                  dataType: 'text'
                }, o['options'])).split(' ');
            }
          },

          // EAST CLOUD mashup access
          mashup: function(host, data, o) {
            if(!o)
              o = {};
            var ajaxSettings = $.extend({
              url: xjQuery.AJAX.ajaxSetting('getMashupUrl')(host),
              callbackObj: o['callbackObj'],
              data: data,
              cache: false,
              success: function(res) {
                xjQuery.AJAX.ajaxSetting('completeFn')(ajaxId);
                if(o['fn'])
                  o['fn'](res, this);
              },
              error: function(XMLHttpRequest, textStatus, errorThrown) {
                if(o['errfn'])
                  o['errfn'](XMLHttpRequest, textStatus, errorThrown);
              }
            }, o['options']);
            return $.ajax(ajaxSettings);
          }
        });
});
