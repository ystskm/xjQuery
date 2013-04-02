/*
 * Create by Y.Sakamoto 2010/08/20 
 * ---------------- 
 * NECESSARY ALONE: 
 * (1) keyGenerator 
 * (2) math 
 * (3) arrayUtil 
 * (4) objectUtil 
 * ----------------
 */
$(function() {
  // jQuery extend
  $.fn.xjSetAll = function(a) {
    if(a && a['refresh']) {
      clearClass(this, a['refresh']['clsArr']);
      clearCss(this, a['refresh']['css']);
    }
    if($.isArray(a)) {
      a[1] = arrayingClsArr(a[1]);
      setAttr(this, a[0]);
      setClass(this, a[1]);
      setCss(this, a[2]);
      setEvent(this, a[3]);
      setCookie(this, a[4]);
    } else if($xj.isObject(a)) {
      a['clsArr'] = arrayingClsArr(a['clsArr']);
      setAttr(this, a['attr']);
      setClass(this, a['clsArr']);
      setCss(this, a['css']);
      setEvent(this, a['event']);
      setCookie(this, a['cookie']);
    } else {
      setClass(this);
      setCss(this);
    }
    return this;
    function clearClass(dom, clsArr) {
      if(!clsArr)
        return;
      var domClsArr = dom.attr('class').split(' ');
      if(clsArr === true) {
        for( var i = 0; i < domClsArr.length; i++)
          if(!domClsArr[i].match(xjQuery.FORM._BaseClass))
            dom.removeClass(domClsArr[i]);
      } else if($xj.isString(clsArr)) {
        for( var i = 0; i < domClsArr.length; i++) {
          if(domClsArr[i].match(xjQuery.FORM._BaseClass))
            continue;
          if(!domClsArr[i].match(clsArr))
            dom.removeClass(domClsArr[i]);
        }
      } else if($.isArray(clsArr)) {
        for( var i = 0; i < domClsArr.length; i++) {
          if(domClsArr[i].match(xjQuery.FORM._BaseClass))
            continue;
          var remove = true;
          for( var j = 0; j < clsArr.length; j++) {
            if(domClsArr[i].match(clsArr[j])) {
              remove = false;
              break;
            }
          }
        }
      }
    }
    function clearCss(dom, css) {
      if(!css)
        return;
      if(css === true)
        dom.removeAttr('style');
    }
    function arrayingClsArr(clsArr) {
      if(!clsArr || (typeof clsArr == 'object' && $.isArray(clsArr)))
        return clsArr;
      else if(typeof clsArr == 'string')
        clsArr = clsArr.split(' ');
      else
        alert('## xjQuery ERROR ## typeof baseparam.clsArr must array or string');
      return clsArr;
    }
    function setAttr(dom, attr) {
      if(!attr)
        return;
      for( var i in attr)
        if(i == 'value')
          dom.xjVal(attr[i]);
        else
          dom.attr(i, attr[i]);
    }
    function setClass(dom, clsArr) {
      dom.addClass('xjbase');
      if(!clsArr)
        return;
      for( var i = 0; i < clsArr.length; i++)
        dom.addClass(clsArr[i]);
    }
    function setCss(dom, css) {
      if(!css) {
        dom.css({
          'z-index': xjQuery.FORM._DefaultZIndex
        });
        return;
      } else if(typeof css['z-index'] == 'undefined'
        || typeof css['position'] == 'undefined')
        css = $.extend({
          'z-index': xjQuery.FORM._DefaultZIndex,
          position: 'relative'
        }, css);
      dom.css($xj.crossCss(css));
    }
    function setEvent(dom, event) {
      if(!event)
        return;
      for( var i in event) {
        if(typeof event[i] == 'function') {
          dom.bind(i, event[i]);
        } else {
          /** TODO * */
          // for hover event and ...?
          dom[i](event[i][0], event[i][1]);
        }
      }
    }
    function setCookie(dom, cookie) {
      if(!cookie)
        return;
      dom.addClass(xjQuery.FORM._cookieClass());
    }
  };

  $.fn.xjInputs = function(sel) {
    var inputs = this.find('input').add(this.find('select')).add(
      this.find('textarea'));
    if(typeof sel == 'undefined')
      return inputs;
    if($xj.isString(sel))
      return inputs.filter(sel);
    if($xj.isNumeric(sel))
      return inputs.eq(sel);
  };

  $.fn.xjVal = function(val) {
    if($xj.isjQueryObj(this) && val !== undefined) {
      for( var i = 0; i < this.length; i++)
        value(this.eq(i), val);
      return this;
    } else {
      if(this.attr('type') == 'checkbox') {
        if(!this.prop('checked'))
          return null;
        else
          return this.prop('checked');
      } else if(this.attr('type') == 'radio') {
        if(!this.prop('checked'))
          return null;
        else
          return this.val();
      } else
        return this.val();
    }
    function value(inp, val) {
      if(inp.attr('type') == 'checkbox' || inp.attr('type') == 'radio') {
        inp.prop('checked', val || false);
        inp.val(val);
      } else
        inp.val(val);
      return inp;
    }
  };

  $.fn.xjForm2obj = function(o) {
    o = $.extend({
      id: true,
      name: true,
      cls: true
    }, o);
    var objs = this.xjInputs();
    var obj = {};
    for( var i = 0; i < objs.length; i++) {
      var uId = $xj.uniqueId(objs.eq(i), o);
      var val = objs.eq(i).xjVal();
      if(uId && val) {
        if(obj[uId] && $.isArray(obj[uId]))
          obj[uId].push(val);
        else if(obj[uId])
          obj[uId] = [obj[uId], val];
        else
          obj[uId] = val;
      }
    }
    return obj;
  };

  /* add 2011/03/31 */
  $.fn.xjLeft = function(tgt) {
    if(!tgt)
      tgt = $(window);
    return ($xj._domSize(tgt, 'width') - $xj._domSize(this, 'width')) / 2;
  };
  /* add 2011/03/31 */
  $.fn.xjTop = function(tgt) {
    if(!tgt)
      tgt = $(window);
    return ($xj._domSize(tgt, 'height') - $xj._domSize(this, 'height')) / 2;
  };

  // TODO automatically use xjdom

  (function() {
    var _jq = jQuery;
    var jq = function(selector, context) {
      var self = this;
      // TODO automatically add xj params.
      // console.log('jquery used.');
      return _jq.call(self, selector, context);
    };
    $ = jQuery = _jq.extend(jq, _jq);
  })();

  $xj
      .add(
        'FORM',
        {
          // inner parameters
          _BaseClass: 'xjbase',
          _DefaultZIndex: 10,
          _OverlayZIndex: 9999,
          _ParentSign: '>>',
          _LayersSign: '>',
          _cookieClass: function() {
            return [this._BaseClass, 'Cookie'].join("");
          },
          _textClass: function() {
            return [this._BaseClass, 'Text'].join("");
          },
          _checkboxClass: function() {
            return [this._BaseClass, 'Checkbox'].join("");
          },
          _svgVer: '1.1',
          _svgUrl: 'http://www.w3.org/2000/svg',
          _uniqalizeExcludeClassReg: function() {
            return ['^', this._BaseClass, '$|^', this._cookieClass(), '$|^',
              this._textClass(), '$|^', this._checkboxClass(), '$|^ui-|^gaqa']
                .join("");
          }
          // inner function
          ,
          _domSize: function(dom, dirc) {
            var css = null;
            try {
              css = dom.css(dirc), aft;
            } catch(e) {
            };
            if(!css || isNaN(aft = css.replace('px')))
              return dom[dirc]();
            else
              return parseInt(aft);
          },
          _domContent: function(dom, s, options) {
            if(!s)
              return dom;
            if(typeof s == 'string') {
              if(options['html'])
                dom.html(s);
              else
                dom.text(s);
            } else
              dom.append(s);
            return dom;
          }
          // outer functions
          ,
          formSetting: function(k, v) {
            var mode = (typeof v == 'undefined') ? 'set': 'get';
            var innerKey = ['_', k].join("");
            switch(mode) {
            case 'set':
              xjQuery.FORM[innerKey] = v;
              break;
            case 'get':
              return (typeof xjQuery.FORM[innerKey] == 'function')
                ? xjQuery.FORM[innerKey](): xjQuery.FORM[innerKey];
            }
          },
          val: function(name, value, option) {
            option = $.extend(true, {
              cookied: false,
              kind: null
            }, option);
            var mode = (typeof value != 'undefined' && value !== null && typeof value != 'object')
              ? 'set': 'get';
            var objs, obj, kind = (option['kind']) ? option['kind']: '';
            objs = $(xjQuery.FORM.selectorize(name));
            if(objs.length > 0)
              if(objs.length == 1
                && (!option['cookied'] | (option['cookied'] && objs.eq(0)
                    .hasClass(xjQuery.FORM._cookieClass()))))
                obj = objs.eq(0);
              else
                return;
            else
              obj = $(['#', name].join(""));
            if(obj.length != 1
              || (option['cookied'] && !obj.hasClass(xjQuery.FORM
                  ._cookieClass())))
              return;
            switch(mode) {
            case 'set':
              return obj.xjVal(value)
            case 'get':
              return obj.xjVal()
            }
            function notUniqueAlert(name) {
              alert(['## xjQuery ERROR ##', "\n", 'name:', name, "\n",
                'NOT UNIQUE ALTHOW HAVING xjbaseCookie.'].join(""));
            }
          },
          iVals: function(v, cookied) {
            var mode = (typeof v == 'object') ? 'set': 'get';
            switch(mode) {
            case 'set':
              for( var i in v)
                xjQuery.FORM.val(i, v[i], cookied);
              break;
            case 'get':
              if(v === true)
                cookied = true;
              v = {};
              var inputs = $(['input.', xjQuery.FORM._BaseClass].join("")).add(
                $(['select.', xjQuery.FORM._BaseClass].join(""))).add(
                $(['textarea.', xjQuery.FORM._BaseClass].join("")));
              for( var i = 0; i < inputs.length; i++) {
                var obj = inputs.eq(i);
                if(cookied && !obj.hasClass(xjQuery.FORM._cookieClass()))
                  continue;
                var id = xjQuery.FORM.uniqueId(obj);
                if(!id || !obj.val() || obj.val() === '')
                  continue;
                v[id] = xjQuery.FORM.val(id, null, {
                  cookied: cookied
                });
              }
              return v;
            }
          },
          maxZindex: function(parent) {
            if(!parent)
              parent = $('body');
            var max = 0;
            for( var i in parent.children()) {
              var z = parseInt(parent.children().eq(i).css('z-index'));
              if(z && max < z)
                max = z;
            }
            return max;
          },
          uniqueId: function(obj, use) {
            if(!obj || !$.isFunction(obj.attr))
              return;
            use = $.extend({
              id: true,
              name: false,
              cls: true
            }, use);
            if(use['id'] && obj.attr('id'))
              return obj.attr('id');
            if(use['name'] && obj.attr('name'))
              return obj.attr('name');
            if(use['cls'] && obj.attr('class')) {
              var clsStr = objClsStr(obj);
              if(clsStr && xjQuery.FORM.isUniqueClsStr(clsStr))
                return clsStr;
            }
            return false;
            function objClsStr(obj) {
              var clsStr = getClsStr(obj);
              if(!clsStr)
                return false;
              var parents = obj.parents();
              for( var i = 0; i < parents.length; i++) {
                if(xjQuery.FORM.isUniqueClsStr(clsStr))
                  return clsStr;
                var s = getClsStr(parents.eq(i));
                if(s)
                  clsStr = [clsStr, xjQuery.FORM._ParentSign, s].join("");
                else
                  break
              }
              function getClsStr(obj) {
                var a = obj.attr('class').split(' ');
                s = '';
                for( var i = 0; i < a.length; i++) {
                  if(!a[i].match(new RegExp(xjQuery.FORM
                      ._uniqalizeExcludeClassReg()))) {
                    s = (s) ? [s, xjQuery.FORM._LayersSign, a[i]].join("")
                      : a[i];
                  }
                }
                return (s.match(new RegExp($xj._RandomSign))) ? false: s;
              }
            }
          },
          isUniqueClsStr: function(clsStr) {
            if($(xjQuery.FORM.selectorize(clsStr)).length == 1)
              return true;
            else
              return false;
          },
          selectorize: function(clsStr) {
            var a = clsStr.split(xjQuery.FORM._ParentSign);
            var selector = '';
            for( var i = a.length - 1; i >= 0; i--) {
              var layer = a[i].split(xjQuery.FORM._LayersSign);
              for( var j = 0; j < layer.length; j++)
                selector = [selector, '.', layer[j]].join("");
              if(i != 0)
                selector = [selector, ' '].join("");
            }
            return selector;
          },
          bottomClsArr: function(clsStr, idx) {
            var a = clsStr.split(xjQuery.FORM._ParentSign);
            var bottomArr = a[0].split(xjQuery.FORM._LayersSign);
            if(typeof idx != 'number')
              return bottomArr;
            else if(idx == -1)
              return bottomArr[bottomArr.length - 1];
            else
              return bottomArr[idx];
          },
          style2Css: function(style) {
            var a = style.split(';');
            var css = {};
            for( var i = 0; i < a.length; i++) {
              var kv = a[i].split(':');
              if(kv.length == 2)
                css[$.trim(kv[0])] = $.trim(kv[1]);
            }
            return css;
          }
          // form parts definition
          ,
          ANY: function(tag, s, a) {
            a = $.extend(true, {
              options: {}
            }, a);
            if(tag
                .toUpperCase()
                .match(
                  /^DIV$|^SPAN$|^SPACER$|^LABEL$|^LABELF$|^INPUT$|^PASSWORD$|^TAREA$|^TEXTAREA$|^FILE$|^BUTTON$|^CHECKBOX$|^A$|^UL$|^LI$|^IMG$|^B$|^HR$|^SELECT$/)) {
              switch(tag.toUpperCase()) {
              case 'INPUT':
                tag1 = tag;
                tag2 = '(INPUT|PASSWORD|BUTTON|FILE|CHECKBOX)';
                break;
              case 'LABEL':
                tag1 = tag;
                tag2 = 'LABELF';
                break;
              case 'TEXTAREA':
                tag1 = tag;
                tag2 = 'TAREA';
                break;
              default:
                tag1 = tag;
                tag2 = tag;
              }
              alert('## FIRE ERROR ## for ' + tag1
                + ' tag, xjQuery has predefined function.$xj.' + tag2);
            }
            var dom = xjQuery.FORM._domContent($('<' + tag + '/>'), s,
              a['options']);
            dom.xjSetAll(a);
            return dom;
          },
          SSLIFRAME: function(ifr, a) {
            a = $.extend(true, {
              css: {},
              options: {}
            }, a);
            ifr = $.extend(true, {
              css: {
                width: 600,
                height: 600,
                margin: 0
              },
              options: {}
            }, ifr);
            var markHeight = '21px';
            var ifrdom = $('<iframe/>');
            var dom = $xj.TABLE([[$xj.IMG({
              attr: {
                src: [_xjpath, '/css/images/ssl_mark.png'].join("")
              },
              css: {
                opacity: 0.85
              }
            }).hide(), $xj.DIV($xj.SPACER({
              clsArr: ['ui-icon', 'ui-icon-close', 'close'],
              css: {
                cursor: 'pointer',
                width: '16px',
                height: '16px',
                border: '2px solid #666',
                'margin': '4px 0 0 0',
                float: 'left'
              }
            }), {
              clsArr: 'close',
              css: {
                cursor: 'pointer',
                width: '80px',
                float: 'right'
              }
            }).append($xj.DIV('close', {
              css: {
                cursor: 'pointer',
                margin: '5px 0 0 3px',
                float: 'right',
                width: '50px'
              },
              clsArr: 'close'
            }))], [ifrdom]]);
            dom.children().eq(0).css({
              position: 'absolute',
              'z-index': $xj._DefaultZIndex + 1,
              height: markHeight
            });
            ifrdom.bind('load', function(e) {
              var sslImg = $(e.target).parent().parent().parent().find('img');
              $(e.target).attr('src').match(/^https:/) ? sslImg.fadeIn()
                : sslImg.hide();
            });
            if(!a['css']['width'])
              $.extend(true, a, {
                css: {
                  width: ifr['css']['width']
                }
              });
            if(!a['css']['height'])
              $.extend(true, a, {
                css: {
                  height: ifr['css']['height']
                }
              });
            ifrdom.xjSetAll(ifr);
            dom.xjSetAll(a);
            return dom;
          }
          /* add 2011/03/30 */
          ,
          SVG: function(s, a) {
            a = $.extend(true, {
              options: {}
            }, a);
            var dom = xjQuery.FORM._domContent($(['<svg version="',
              xjQuery.FORM._svgVer, '" xmlns="', xjQuery.FORM._svgUrl, '"/>']
                .join("")), s, a['options']);
            dom.css({
              width: '400px',
              height: '300px'
            });
            dom.xjSetAll(a);
            return dom;
          },
          DIV: function(s, a) {
            a = $.extend(true, {
              options: {}
            }, a);
            var dom = xjQuery.FORM._domContent($('<div/>'), s, a['options']);
            dom.css({
              width: '100%',
              height: 'auto',
              position: 'relative',
              float: 'left',
              'vertical-align': 'middle'
            });
            dom.xjSetAll(a);
            return dom;
          },
          SPACER: function(a) {
            var dom = $('<div/>').css({
              width: '100%',
              height: 'auto',
              position: 'relative',
              float: 'left',
              minHeight: '1px'
            });
            dom.xjSetAll(a);
            return dom;
          },
          SPAN: function(s, a) {
            a = $.extend(true, {
              options: {}
            }, a);
            var dom = xjQuery.FORM._domContent($('<span/>'), s, a['options']);
            dom.css({
              'vertical-align': 'middle'
            });
            dom.xjSetAll(a);
            return dom;
          },
          LABELF: function(s, f, a) {
            a = $.extend(true, {
              options: {}
            }, a);
            var dom = $('<div/>').append($('<label/>').text(s)).css({
              margin: '0 10px',
              clear: 'both'
            });
            dom = xjQuery.FORM._domContent(dom, f);
            dom.xjSetAll(a);
            return dom;
          },
          INPUT: function(a) {
            var dom = $('<input type="text"/>').css({
              margin: '3px 0 0 0',
              padding: '1px 3px',
              width: '94%'
            }).addClass('xjbaseText');
            dom.xjSetAll(a);
            return dom;
          },
          PASSWORD: function(a) {
            var dom = $('<input type="password"/>').css({
              margin: '3px 0 0 0',
              padding: '1px 3px',
              width: '94%'
            }).addClass(xjQuery.FORM._textClass());
            dom.xjSetAll(a);
            return dom;
          },
          TAREA: function(a) {
            a = $.extend(true, {
              attr: {
                rows: 5,
                cols: 40
              }
            }, a);
            var dom = $('<textarea/>').css({
              margin: '3px 0 0 0',
              padding: '1px 3px',
              width: '94%'
            }).addClass(xjQuery.FORM._textClass());
            dom.xjSetAll(a);
            return dom;
          },
          BUTTON: function(a) {
            var dom = $('<input type="button"/>').css({
              margin: '2px auto'
            });
            dom.xjSetAll(a);
            return dom;
          },
          HIDDEN: function(a) {
            var dom = $('<input type="hidden"/>').css({
              margin: '2px auto'
            });
            dom.xjSetAll(a);
            return dom;
          },
          SUBMIT: function(a) {
            var dom = $('<input type="submit"/>').css({
              margin: '2px auto'
            });
            dom.xjSetAll(a);
            return dom;
          },
          RESET: function(a) {
            var dom = $('<input type="reset"/>').css({
              margin: '2px auto'
            });
            dom.xjSetAll(a);
            return dom;
          },
          FILE: function(a) {
            var dom = $('<input type="file"/>').css({
              margin: '3px 0 0 0',
              width: '94%'
            });
            dom.xjSetAll(a);
            return dom;
          },
          CHECKBOX: function(s, input, span, div) {
            if(!s)
              s = '';
            var inp = $('<input type="checkbox"/>').css({
              float: 'left',
              margin: '4px 0 0 0',
              'vertical-align': '50%'
            });
            var spa = (typeof s == 'string') ? this.SPAN(s, {
              css: {
                float: 'left',
                margin: '0 0 0 10px',
                'white-space': 'nowrap'
              }
            }): s;
            var dom = this.SPACER({
              clsArr: xjQuery.FORM._checkboxClass(),
              css: {
                width: 'auto',
                margin: '3px 0 0 10px'
              }
            });
            inp.xjSetAll(input);
            spa.xjSetAll(span);
            dom.xjSetAll(div);
            return dom.append(inp).append(spa);
          },
          A: function(s, a) {
            var dom = (typeof s == 'string') ? $('<a/>').html(s): $('<a/>')
                .append(s);
            dom.xjSetAll(a);
            return dom;
          },
          UL: function(li, a, anchored) {
            var dom = $('<ul/>');
            if($xj.isArray(li)) {
              for( var i = 0; i < li.length; i++) {
                var disp = li[i][0], val = li[i][1], baseparam = li[i][2];
                if(anchored && $xj.isObject(anchored))
                  anchored = $.extend(true, anchored, {
                    attr: {
                      value: val
                    }
                  });
                else if(anchored)
                  anchored = {
                    attr: {
                      value: val
                    }
                  };
                dom.append($xj.LI(disp, $.extend(true, {
                  attr: {
                    value: val
                  }
                }, baseparam), anchored));
              }
            } else {
              for( var i in li) {
                if(anchored && $xj.isObject(anchored))
                  anchored = $.extend(true, anchored, {
                    attr: {
                      value: i
                    }
                  });
                else if(anchored)
                  anchored = {
                    attr: {
                      value: i
                    }
                  };
                if($.isArray(li[i]))
                  dom.append($xj.LI(li[i][0], li[i][1], anchored));
                else
                  dom.append($xj.LI(li[i], {
                    attr: {
                      value: i
                    }
                  }, anchored));
              }
            }
            dom.xjSetAll(a);
            return dom;
          },
          LI: function(s, a, anchored) {
            var dom;
            if(anchored)
              dom = $('<li/>').append($xj.A(s, anchored));
            else
              dom = (typeof s == 'string') ? $('<li/>').text(s): $('<li/>')
                  .append(s);
            dom.xjSetAll(a);
            return dom;
          },
          IMG: function(a) {
            var dom = $('<img/>');
            a = $.extend(true, {
              options: {
                wait: false
              }
            }, a);
            if(a['options']['wait'])
              $(document).ready(function() {
                dom.xjSetAll(a);
              });
            else
              dom.xjSetAll(a);
            return dom;
          },
          B: function(s, a) {
            a = $.extend(true, {
              options: {}
            }, a);
            var dom = xjQuery.FORM._domContent($('<b/>'), s, a['options']);
            dom.css({
              'font-weight': 'bold'
            });
            dom.xjSetAll(a);
            return dom;
          },
          HR: function(a) {
            var dom = $('<hr/>').css({
              border: 'none',
              'border-top': '1px solid #000'
            });
            dom.xjSetAll(a);
            return dom;
          },
          TABLE: function(structure, table, tr, td, o) {
            tr = $.extend(true, {
              options: {
                align: 'center'
              }
            }, tr);
            td = $.extend(true, {
              css: {
                'text-align': 'left'
              }
            }, td);
            o = $.extend({
              head: true
            }, o);
            var tbl = $xj.ANY('table', null, {
              css: {
                width: '100%'
              }
            }), bStart = false;
            bStart;
            tbl.xjSetAll(table);
            for( var i = 0; i < structure.length; i++) {
              if(i == 0 && o['head']) {
                tbl.append($xj.ANY('thead', makeTr(structure[i], 'th')));
              } else {
                tbl.append(makeTr(structure[i]));
              }
            }
            return tbl;
            function makeTr(oneObj, tag) {
              var trDiv = $xj.ANY('tr', null, {
                event: {
                  mouseover: hover,
                  mouseout: unhover
                }
              }), tag = tag || 'td';
              function hover(e) {
                $(e.currentTarget).addClass('hover');
              }
              function unhover(e) {
                $(e.currentTarget).removeClass('hover');
              }
              // var trDiv = $xj.ANY('tr',null),tag = tag || 'td';
              trDiv.xjSetAll(tr);
              if($xj.isjQueryObj(oneObj)) {
                var tdDiv = $xj.ANY(tag, null, {
                  attr: {
                    colspan: 100,
                    'vertical-align': 'top'
                  }
                });
                var cont = oneObj;
                cont.xjSetAll(td);
                trDiv.append(tdDiv.append($xj.DIV(cont, td)));
              } else {
                var width_sum = 0;
                var noWidth_cnt = 0;
                var zerWidth_cnt = 0;
                var rowPos = $.isArray(tr['options']['align'])
                  ? tr['options']['align'][i]: tr['options']['align'];
                var stack = [];
                var avWidth = 0;
                var restWidth = 0;
                for( var j = 0; j < oneObj.length; j++) {
                  // no-width
                  var noWidth = !$.isArray(oneObj[j]), tdWidth = null, cont = null;
                  var contObj = (noWidth) ? oneObj[j]: oneObj[j][1];
                  var cont = (!contObj && contObj != 0) ? $xj.SPACER(): $xj
                      .isjQueryObj(contObj) ? contObj: $xj.DIV(contObj);
                  if(noWidth)
                    noWidth_cnt++;
                  else {
                    tdWidth = oneObj[j][0];
                    width_sum += tdWidth;
                  }

                  // stack
                  stack.push([tdWidth, $xj.DIV(cont, $.extend(true, {}, td))]);
                }

                if(width_sum != 100 && noWidth_cnt != 0)
                  avWidth = Math.floor((100 - width_sum) / noWidth_cnt);

                if(width_sum + avWidth * noWidth_cnt != 100)
                  restWidth = 100 - (width_sum + avWidth * noWidth_cnt);

                switch(rowPos) {
                case 'left':
                  stack.push([restWidth, $xj.SPACER()])
                  break;
                case 'right':
                  stack.unshift([restWidth, $xj.SPACER()])
                  break;
                case 'center':
                  var lrest = Math.floor(restWidth / 2);
                  var rrest = Math.floor(restWidth / 2) + (restWidth % 2);
                  stack.push([lrest, $xj.SPACER({
                    clsArr: ['xjbaseFormSubst']
                  })]);
                  stack.unshift([rrest, $xj.SPACER({
                    clsArr: ['xjbaseFormSubst']
                  })]);
                  break;
                }

                for( var j = 0; j < stack.length; j++) {
                  var w = stack[j][0] !== null ? stack[j][0]: avWidth, tdDiv;
                  if(w == 0)
                    continue;
                  // tdDiv=$xj.ANY(tag
                  // ,stack[j][1],{attr:{colspan:w},css:{width:[w,'%'].join(""),'vertical-align':'top'}}).hide();
                  else
                    tdDiv = $xj.ANY(tag, stack[j][1], {
                      attr: {
                        colspan: w
                      },
                      css: {
                        width: [w, '%'].join(""),
                        'vertical-align': 'top'
                      }
                    });
                  trDiv.append(tdDiv);
                }
              }
              return trDiv;
            }
          },
          SELECT: function(list, a) {
            var dom = $('<select/>').css({
              margin: '4px 0 0 0',
              width: '98%'
            });
            for( var i in list)
              if($.isArray(list[i]))
                dom.append($xj.ANY('option', list[i][0], list[i][1]));
              else
                dom.append($xj.ANY('option', i, list[i]));
            dom.xjSetAll(a);
            return dom;
          }
        });
});
