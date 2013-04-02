/*
 *  Create by Y.Sakamoto 2010/08/20
 *  ----------------
 *  NECESSARY ALONE:
 *  	(1) i18n
 *  	(2) class
 *  	(3) bridge
 *  ----------------
 *  NECESSARY COMPLEX:
 *  	(1) form
 */
//jQuery extensions
/**
 * TODO メニュー生成
 */
$(function(){
  $.fn.xjMenuboard = function(a, param) {
    if(!param)
      param = {};
    $xj.idCheck(param, 'xjMenuboard-');
    this.append($xj.menuboard(a, param));
    return this;
  };
  $.fn.xjContextMenu = function(a, param) {
    if(!param)
      param = {};
    $xj.idCheck(param, 'xjContextMenu-');
    $xj.Parts.contextMenu(this, a, param);
    return this;
  };
  $.fn.xjButton = function(text, fn, baseparam) {
    if(!baseparam)
      baseparam = {};
    xjQuery.WebParts.idCheck(baseparam, 'xjButton-');
    if(!text && this.text()) {
      text = this.text();
      this.text('');
    }
    this.append($xj.Parts.button(text, fn, baseparam));
    return this;
  };
  
  $.fn.xjSelectPanel = function(struct, baseparam) {
    if(!baseparam)
      baseparam = {};
    $xj.idCheck(baseparam, 'xjSelectPanel-');
    $xj.Parts.selectPanel(this, struct, baseparam); // selectpanel requires after append.
    return this;
  };
  
  $.fn.xjTable = function(structure, baseparam) {
    if(!baseparam)
      baseparam = {};
    $xj.idCheck(baseparam, 'xjTable-');
    this.append($xj.Parts.table(structure, baseparam));
    return this;
  };
  
  $.fn.xjDialog = function(baseparam) {
    if(!baseparam)
      baseparam = {};
    $xj.idCheck(baseparam, 'xjDialog-');
    $xj.Parts.dialog(this, baseparam); //ui-dialog gets a DOM object
    return this.parent();
  };
  
  $.fn.xjTab = function(structure, baseparam) {
    if(!baseparam)
      baseparam = {};
    $xj.idCheck(baseparam, 'xjTab-');
    $xj.Parts.tab(structure, this, baseparam); //ui-tabs requires append before .tabs()
    return this;
  };
  
  /**
   * TODO サーチ汎用化
   */
  $.fn.xjLiveSearch = function(lid, o) {
    o = $.extend({
      cid: null,
      nid: null,
      container: null,
      onResult: function() {
        return;
      }
    }, o);
    var cid = o['cid'], nid = o['nid'], cont = o['container'], rfn = o['onResult'];
    var sel = ['#', lid, ' li'].join("");
    this.search(sel, function(on) {
      on.all(function(results) {
        var size = results ? results.size(): 0;
        if(cont)
          if(size)
            cont.show();
          else
            cont.hide();
        $('#' + cid).text(size + ' results');
      });
      on.reset(function() {
        $('#' + nid).hide();
        $(sel).addClass($xj._WebParts_Constants['CLASS']['LIVE_SEARCH']);;
        $(sel).show();
      });
      on.empty(function() {
        $('#' + nid).show();
        $(sel).removeClass($xj._WebParts_Constants['CLASS']['LIVE_SEARCH']);
        $(sel).hide();
      });
      on.results(function(results) {
        $('#' + nid).hide();
        $(sel).removeClass($xj._WebParts_Constants['CLASS']['LIVE_SEARCH']);
        $(sel).hide();
        results.show().addClass($xj._WebParts_Constants['CLASS']['LIVE_SEARCH']);
        rfn();
      });
    });
    return this;
  };
  
  // original functions
  $xj
      .add(
        'WebParts',
        {
          _WebParts_Constants: {
            MAKE_METHOD: 'make',
            DATA_KEY_FOR_INSTANCE: 'xjWebPartsInstance',
            CLASS: {
              LIVE_SEARCH: 'liveSearchResults'
            },
            ERRMSG: {
              _default: [$xj._errMsg, '.WebParts : '].join(""),
              SYSTEM_ERROR: {
                NO_ARG: function() {
                  return $xj._WebParts_errMsg('requires one or more arguments');
                },
                NO_MAKE: function() {
                  return $xj._WebParts_errMsg('requires make method');
                },
                NO_ID: function() {
                  return $xj
                      ._WebParts_errMsg('requires arguments baseparam["attr"]["id"]');
                }
              }
            }
          },
          _WebParts_errMsg: function(msg) {
            var consts = $xj.WebParts._WebParts_Constants;
            [consts.ERRMSG._default, msg].join("");
          },
          _WebParts_BaseInit: function(inst, baseparam, o) {
            inst.instance = inst;
            for( var i in o)
              inst[i] = o[i];
            inst.defaultParam = $.extend(true, {}, $xj
                .getPartsTemplate(inst.type), baseparam);
            inst.colorParam = $.extend(true, {}, $xj.getPartsTemplate('color',
              inst.defaultParam['options']['color'] || 'gray'),
              inst.defaultParam['options']['colorOption']);
            inst.id = baseparam['attr']['id'];
            inst.baseparam = $.extend(true, {
              clsArr: [inst.id, '_xj', inst.type.replace(/(^\w)/, function(a, b) {
                return b.toUpperCase();
              })].join("")
            }, inst.defaultParam, {
              options: {
                colorParam: inst.colorParam
              }
            });
            inst.options = inst.baseparam['options'];
          },
          idCheck: function(param, fix) {
            if(!param['attr'])
              param['attr'] = {};
            if(!param['attr']['id'])
              param['attr']['id'] = $xj.createDomId(fix);
          },
          // color template get
          getPartsTemplate: function(kind, key) {
            return $.extend({}, (key) ? $xj.template[kind][key]
              : $xj.template[kind]);
          },
          stickey: function(head, content, o) {
            o = $.extend(true, o, {
              modalWrap: {
                css: {
                  background: 'rgba(0, 0, 0, 0.296875)',
                  'border-radius': '15px',
                  'font-size': '1.2em',
                  padding: '10px',
                  width: '300px'
                },
                clsArr: 'xjStickey'
              },
              modalHead: {
                css: {
                  background: ['#32648F url(', xjQuery._xjpath,
                    '/css/images/bg_trans_pale_1x36.png) repeat-x 0px 0px']
                      .join(""),
                  'border-top-left-radius': '6px',
                  'border-top-right-radius': '6px',
                  height: '20px',
                  position: 'relative',
                  cursor: 'move',
                  width: '100%',
                  color: '#fff',
                  'text-align': 'center',
                  'vertical-align': 'middle'
                }
              },
              modalBody: {
                css: {
                  background: 'white',
                  'border-bottom-left-radius': '6px',
                  'border-bottom-right-radius': '6px',
                  height: 'auto',
                  position: 'relative',
                  width: '100%'
                }
              }
            });
            return $xj.SPACER(o['modalWrap']).append(
              $xj.DIV(head, o['modalHead'])).append(
              $xj.DIV(content, o['modalBody'])).draggable();
          },
          gSearch: function(url) {
            /** TODO complete * */
            var html = [
              '<div id="options_search" class="option">',
              '<form action="http://datatables.net/search" id="cse-search-box">',
              '<img src="',
              xjQuery._xjpath,
              '/css/images/search.png" alt="Search icon">',
              '<input type="hidden" name="cx" value="004673356914326163298:bcgejkcchl4">',
              '<input type="hidden" name="cof" value="FORID:9">',
              '<input type="hidden" name="ie" value="UTF-8">',
              '<input type="text" name="q" size="31" style="border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-top-color: rgb(126, 157, 185); border-right-color: rgb(126, 157, 185); border-bottom-color: rgb(126, 157, 185); border-left-color: rgb(126, 157, 185); padding-top: 2px; padding-right: 2px; padding-bottom: 2px; padding-left: 2px; background-image: url(http://www.google.com/cse/intl/en/images/google_custom_search_watermark.gif); background-attachment: initial; background-origin: initial; background-clip: initial; background-color: rgb(255, 255, 255); background-position: 0% 50%; background-repeat: no-repeat no-repeat; ">',
              '<input type="submit" name="sa" value="Search">',
              '<input name="siteurl" type="hidden" value="http://',
              url,
              '/"></form>',
              '<script type="text/javascript" src="http://www.google.com/cse/brand?form=cse-search-box&amp;lang=en"></script>',
              '</div>'].join("");
            return $xj.DIV(html, {
              options: {
                html: true
              }
            });
          },
          twitWP: function(twitee, o) {
            o = $.extend({
              icon: Math.round(Math.random() * 16),
              obj: $('body')
            }, o);
            icon = o['icon'];
            if(icon < 1 || icon > 16)
              icon = 1;
            if(icon.toString().length == 1)
              icon = ['0', icon].join("");
            o['obj'].append($xj.DIV($xj.IMG({
              attr: {
                src: [xjQuery._xjpath, '/css/images/wp_tw', icon, '.png']
                    .join("")
              }
            }), {
              css: {
                background: ['#fff url(', xjQuery._xjpath,
                  '/css/images/wp_followme.png) no-repeat 0 0'].join(""),
                width: '32px',
                height: '150px',
                position: 'fixed',
                right: 0,
                top: $(window).height() / 3,
                cursor: 'pointer'
              },
              event: {
                click: function() {
                  window.open(['http://twitter.com/', twitee].join(""));
                }
              }
            }));
          },
          twitList: function(id, twitee, option) {
            if(!window.TWTR)
              new $xj.JSLoader({
                evalMode: false
              }).next('http://widgets.twimg.com/j/2/widget.js').next(function() {
                widget(id, twitee, option);
              }).start();
            else
              widget(id, twitee, option);
            function widget(id, twitee, o) {
              var tw = new TWTR.Widget($.extend(true, {
                id: id, // ← id パラメーターを追加する
                version: 2,
                type: 'profile', // profile | search => search : '#pray4japan'
                rpp: 5,
                interval: 6000,
                width: 535,
                height: 300,
                // title ,subject
                theme: {
                  shell: {
                    background: '#f2f2f2',
                    color: '#030003'
                  },
                  tweets: {
                    background: '#ffffff',
                    color: '#3d3d3d',
                    links: '#eb7d07'
                  }
                },
                features: {
                  scrollbar: false,
                  loop: false,
                  live: false,
                  hashtags: true,
                  timestamp: true,
                  avatars: false,
                  //toptweets : true,
                  behavior: 'all' // all | default
                }
              }, o));
              if(o['type'] == 'search')
                tw.render().start();
              else
                tw.render().setUser(twitee).start();
            }
          }
          // templates are defined.
          ,
          template: {
            button: {
              css: {
                width: 120,
                height: 'auto',
                'text-align': 'center',
                'font-size': '100%',
                padding: '2px 4px',
                'vertical-align': 'middle',
                opacity: 0.7,
                cursor: 'pointer',
                background: '#ccc',
                'box-shadow': 'inset 1px 6px 12px #fff, inset -1px -5px 5px #ccc, 0 0 0 transparent',
                border: '1px solid #000',
                'border-radius': '6px'
              },
              options: {
                color: 'gray',
                onFocusContainerCss: {
                  'box-shadow': 'inset 1px 8px 12px #f8f8f8, inset -1px -2px 5px #ccc, 0 0 3px #aaa'
                },
                anchorCss: {
                  color: '#fff'
                },
                onFocusAnchorCss: {
                  color: '#888'
                }
              }
            },
            selectPanel: {
              css: {
                position: 'absolute',
                'z-index': 9999,
                width: 120,
                maxHeight: 200,
                'overflow-y': 'auto',
                background: '#fff 0',
                border: '1px solid #4c4',
                'border-radius': '6px',
                'box-shadow': '1px 1px 2px #444'
              },
              options: {
                selectKey: ['Enter'],
                fwKey: ['Down'],
                bkKey: ['Up'],
                closeKey: ['Esc', 'Tab'],
                autoComplete: false,
                target: null,
                append: 'after',
                show: function() {
                  return;
                },
                onItemFocus: function() {
                  return;
                },
                onSelect: function() {
                  return;
                },
                onNoSelect: function() {
                  return;
                },
                onTearDown: function() {
                  return;
                },
                firstSelect: true,
                ulBaseparam: {
                  css: {
                    'overflow-x': 'hidden',
                    'overflow-y': 'auto'
                  }
                },
                liBaseparam: {
                  css: {
                    border: '1px solid transparent',
                    'border-radius': '6px',
                    width: '100%',
                    clear: 'both'
                  }
                },
                linkBaseparam: {
                  css: {
                    padding: '2px',
                    'white-space': 'nowrap',
                    tabIndex: 0
                  }
                },
                focusCss: {
                  border: '1px solid #aca'
                }
              }
            },
            section: {
              css: {
                width: 400,
                height: 'auto'
              },
              options: {
                color: 'gray',
                title: '',
                radius: 12,
                backgroundImg: {
                  attr: {
                    src: [xjQuery._xjpath, '/css/images/bg_trans_1x360.png']
                        .join("")
                  },
                  clsArr: ['xjbaseSectionBackgroundImg'],
                  css: {
                    width: '100%',
                    height: '600px',
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }
                }
              }
            },
            table: {
              css: {
                width: '100%',
                height: 'auto'
              },
              options: {
                color: 'gray',
                trbase: {
                  css: {
                    'border-top': '1px solid #666'
                  },
                  clsArr: ['xjbaseWebPartsRow']
                },
                tdbase: {
                  css: {
                    padding: '5px 0px'
                  }
                },
                dataTable: {
                  "bJQueryUI": false,
                  "sPaginationType": "full_numbers",
                  "oLanguage": {
                    "sUrl": [xjQuery._xjpath, '/js/lib/dataTable/i18n/dt-',
                      xjQuery.i18n.language(), '.json'].join("")
                  }
                //					"aaSorting": [[ 0, "desc" ]]
                }
              }
            },
            tab: {
              css: {
                width: '100%',
                'margin-left': '-3px'
              },
              options: {
                widthAdjust: 6,
                tabs: {
                  tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remove Tab</span></li>"
                },
                tabsSetting: {
                  sort: false,
                  background: false,
                  handlerBackground: false,
                  handlerVerticalPadding: false
                }
              }
            },
            dialog: {
              css: {
                width: '100%'
              },
              options: {
                showClose: false,
                widthAdjust: 6,
                dialog: {
                  autoOpen: false,
                  title: '',
                  modal: true
                },
                dialogSetting: {
                  background: false,
                  handlerVerticalPadding: false,
                  onCreate: function() {
                    return;
                  }
                }
              }
            },
            color: { // #1C94C4
              gray: {
                bg: '#fcfcfc',
                bg_sub: '#ddd',
                bg_hover: '#eee',
                bg_active: '#fff',
                color: '#666',
                color_sub: '#888',
                color_hover: '#666',
                color_active: '#444',
                line: '#aaa',
                linebg: '#e0e0e0',
                linebg_hover: '#fff',
                linebg_active: '#f0f0f0',
                cline: '#aaa',
                clinebg: '#666',
                clinebg_active: '#666',
                uline: '#aaa',
                ulinebg: '#d0d0d0',
                ulinebg_active: '#eee'
              },
              lightgray: {
                bg: 'transparent',
                line: '#ccc',
                linebg: '#eee',
                cline: '#ccc',
                cbg: '#aaa',
                uline: '#aaa',
                ulinebg: '#ddd',
                color: '#aaa'
              },
              pink: {
                bg: 'transparent',
                line: '#f68',
                linebg: '#f89',
                cline: '#ccc',
                cbg: '#aaa',
                ulinebg: '#fff',
                color: '#f68'
              },
              purple: {
                bg: 'transparent',
                line: '#64a',
                linebg: '#eef',
                cline: '#64a',
                cbg: '#64a',
                uline: '#64a',
                ulinebg: '#cbd',
                color: '#868'
              },
              lightpurple: {
                bg: 'transparent',
                line: '#97d',
                linebg: '#eef',
                cline: '#a9e',
                cbg: '#97d',
                uline: '#a9f',
                ulinebg: '#edf',
                color: '#97d'
              },
              orange: {
                bg: 'transparent',
                line: '#fd5',
                linebg: '#fff',
                cline: '#fea',
                cbg: '#fd5',
                uline: '#ffe',
                ulinebg: '#fea',
                color: '#666'
              },
              deepblue: {
                bg: 'transparent',
                line: '#004',
                linebg: '#404080',
                cline: '#008',
                cbg: '#008',
                uline: '#008',
                ulinebg: '#0000a0',
                color: '#ccc',
                stdbg: '#00a',
                subbg: '#00c',
                hovbg: '#080'
              },
              sky: {
                bg: 'transparent',
                line: '#89f',
                linebg: '#eee',
                cbg: '#a0cafc',
                uline: '#89f',
                ulinebg: '#e0eafc',
                color: '#68f'
              },
              white: {
                bg: 'transparent',
                line: '#fd5',
                linebg: '#eee',
                cline: '#fea',
                cbg: '#fd5',
                uline: '#ffe',
                ulinebg: '#fec',
                color: '#fd5'
              },
              trans: {
                bg: 'transparent',
                line: 'transparent',
                linebg: 'transparent',
                cbg: 'transparent',
                uline: 'transparent',
                ulinebg: 'transparent'
              }
            }
          }
  
          // text change
          ,
          buttonTextChange: function(id, val) {
            $('#' + id).find('a').text(val);
          }
  
          ,
          Func: {
            coloroptionInit: function(co) {
              if(co.line && !co.cline)
                co.cline = co.line;
              if(co.linebg && !co.cbg)
                co.cbg = co.linebg;
              if(co.line && !co.uline)
                co.uline = co.line;
              if(co.linebg && !co.ulinebg)
                co.ulinebg = co.linebg;
            }
          },
          Parts: {
            makeClass: function(name, prototypeItems, baseparam, args, method) {
              var wrapper = function() {
                return new this(arguments);
              };
              if(args.length == 0) {
                console
                    .error($xj._WebParts_Constants.MESSAGE.SYSTEM_ERROR['NO_ARG']);
                return;
              }
              if(!prototypeItems[$xj._WebParts_Constants.MAKE_METHOD]) {
                console
                    .error($xj._WebParts_Constants.MESSAGE.SYSTEM_ERROR['NO_MAKE']);
                var s = "prototype = [";
                for( var i in prototypeItems)
                  s += (i + ',');
                s += ']';
                console.log(s);
                return;
              }
              if(baseparam) {
                // create
                if(!this[name].CLASS)
                  $.extend(this[name], {
                    CLASS: $xj.makeClass(prototypeItems)
                  });
                var instance = this[baseparam['attr']['id']] = wrapper.apply(
                  this[name].CLASS, args);
                if(instance.appended)
                  instance.appended.data(
                    $xj._WebParts_Constants['DATA_KEY_FOR_INSTANCE'], instance);
                if(instance.container)
                  instance.container.data(
                    $xj._WebParts_Constants['DATA_KEY_FOR_INSTANCE'], instance);
                return instance.make();
              } else
                // get
                return this[args[0]];
            },
            button: function(something, fn, baseparam) {
              // something is text or name
              var prototypeItems = {
                initialize: function(args) {
                  var text = args[0], fn = args[1], baseparam = args[2];
                  this.type = 'button';
                  $xj._WebParts_BaseInit(this, baseparam, {
                    fn: fn
                  });
                  this.text = (text) ? text: ["xjButton_",
                    baseparam['attr']['id']].join("");
                  this.container = $xj.SPACER(this.baseparam).bind(
                    "mouseup keyup", this.instance.onUpFn()).bind("keydown",
                    this.instance.onPressFn());
                  this.body = null;
                  this.imgHeight = null;
                },
                make: function() {
                  this.body = $xj.DIV($xj.A(this.text, {
                    attr: {
                      href: 'javascript:void(0);'
                    },
                    clsArr: this.baseparam['attr']['id'],
                    css: this.baseparam['options']['anchorCss']
                    /**
                     * TODO ボタンのhover,focus色替えは見直し
                     */
                    ,
                    event: {
                      mouseover: function(e) {
                        $(this).focus();
                      },
                      focus: this.onFocusFn(),
                      mouseout: function(e) {
                        $(this).blur();
                      },
                      blur: this.onUnfocusFn(),
                      click: function(e) {
                        return false;
                      }
                    }
                  }));
                  $.data(this.instance.container.get(0), 'instance',
                    this.instance);
                  return this.container.append(this.body);
                },
                onPressFn: function() {
                  var instance = this.instance;
                  var onUnfocus = instance.onUnfocusFn();
                  return function(e) {
                    if($xj.checkKc(e, 'Tab'))
                      onUnfocus(e);
                  };
                },
                onUpFn: function() {
                  var instance = this.instance;
                  var onUnfocus = instance.onUnfocusFn();
                  return function(e) {
                    if(e.type == 'mouseup' || $xj.checkKc(e, 'Enter')) {
                      onUnfocus(e);
                      instance.fn();
                    }
                  };
                },
                onFocusFn: function() {
                  var instance = this.instance;
                  return function(e) {
                    instance.container
                        .css(instance.baseparam['options']['onFocusContainerCss']);
                    instance.body.find('a').css(
                      instance.baseparam['options']['onFocusAnchorCss']);
                  };
                },
                onUnfocusFn: function() {
                  var instance = this.instance;
                  instance;
                  return function(e) {
                    if($('.xjButton').length != 0) {
                      for( var i in $('.xjButton')) {
                        var dom = $('.xjButton').eq(i);
                        if(dom.get(0) && $.data(dom.get(0), 'instance')) {
                          var tgt = $.data(dom.get(0), 'instance');
                          tgt.container.css(tgt.baseparam['css']);
                          tgt.body.find('a').css(
                            tgt.baseparam['options']['anchorCss']);
                        }
                      }
                    }
                  };
                }
              };
              return this.makeClass('button', prototypeItems, baseparam,
                arguments);
            },
            selectPanel: function(appended, something, baseparam) {
              // something is structure or name
              var prototypeItems = {
                initialize: function(args) {
                  var appended = args[0], structure = args[1], baseparam = args[2];
                  var defaultParam = $.extend(true, {}, $xj
                      .getPartsTemplate('selectPanel'), baseparam);
                  //var colorParam  = $.extend(true,$xj.getPartsTemplate('color',defaultParam['options']['color']),defaultParam['options']['colorOption']);
                  var colorParam = {};
                  this.instance = this;
                  this.appended = appended;
                  this.structure = structure;
                  if($('.xjSelectPanel').length) { // only one selectPanel can exist!
                    var old_inst = $xj
                        .data(
                          $('.xjSelectPanel'),
                          xjQuery.WebParts.WebParts_Constants['DATA_KEY_FOR_INSTANCE']);
                    if(old_inst)
                      old_inst.tearDown();
                  };
                  this.baseparam = $.extend(true, {
                    clsArr: [baseparam['attr']['id'], 'xjSelectPanel']
                  }, defaultParam, {
                    options: {
                      colorParam: colorParam
                    }
                  });
                  /*
                  if(appended.width())
                      $.extend(this.baseparam,{css:{width:'auto',minWidth:appended.width(),maxWidth:appended.width()*2}});
                      */
                  $.extend(true, this.baseparam, {
                    css: {
                      width: 'auto',
                      minWidth: [appended.width(), 'px'].join(""),
                      maxWidth: appended.width() * 2
                    }
                  });
                  this.options = this.baseparam['options'];
  
                  this.onContainer = false;
                  this.onItem = false;
                  this.position = 0;
                  this.keyMap = {};
                  this.dead = false;
                  this.bindEvents = {
                    set: null,
                    fw: null,
                    bk: null,
                    sel: null,
                    close: null,
                    body: null,
                    scrollCss: null
                  };
                  this.container = $xj.SPACER(this.baseparam);
                  this.content = null;
                },
                make: function() {
                  this.content = $xj.UL(this.structure,
                    this.options['ulBaseparam'], this.options['linkBaseparam']);
                  if(!this.content.find('li').length) {
                    this.tearDownFn(null, false);
                    return false;
                  }
                  this.content.find('li').ecSetAll(this.options['liBaseparam']);
                  this.content.find('li').hover(intoItemFn.apply(this),
                    outofItemFn.apply(this));
                  this.container.hover(intoContainerFn.apply(this),
                    outofContainerFn.apply(this));
                  if(this.options['autoComplete'])
                    this.appended.ecLiveSearch(this.baseparam['attr']['id'], {
                      container: this.container,
                      onResult: this.firstSelectingFn('fw')
                    });
                  this.settingFn()();
                  var j = 0;
                  for( var i in this.structure) {
                    if($xj.isArray(this.structure[i]))
                      this.keyMap[this.structure[i][1]] = j++;
                    else
                      this.keyMap[i] = j++;
                  }
                  if(this.options['firstSelect']) {
                    this.position = this.keyMap[this.options['firstSelect']]
                      ? this.keyMap[this.options['firstSelect']]: 0;
                    this.focus(null, this.position);
                  } else
                    this.position = -1;
                  return true;
                },
                settingFn: function() {
                  var instance = this.instance;
                  return function() {
                    var appendee;
                    if(instance.options['target']) {
                      appendee = instance.options['target'];
                      instance.options['target'][instance.options['append']]
                          (instance.container.append(instance.content).css(
                            {
                              left: instance.appended.offset().left,
                              top: (instance.options['autoComplete'])
                                ? instance.appended.offset().top
                                  + instance.appended.height() + 2
                                : instance.appended.offset().top
                            }));
                    } else {
                      appendee = instance.appended;
                      instance.appended[instance.options['append']]
                          (instance.container.append(instance.content));
                    }
                    $xj.data(appendee, 'selectPanel', instance);
                    instance.bindFunctions();
                  };
                },
                contentChange: function(newStruct) {
                  this.structure = newStruct;
                  this.tearDown(null, {
                    nodelete: true
                  });
                  this.make();
                },
                bindFunctions: function() {
                  var obj = $('body');
                  this.content.find('li').mouseover(this.focusFn());
                  this.bindEvents['fw'] = this.selectingFn('fw');
                  this.bindEvents['bk'] = this.selectingFn('bk');
                  this.bindEvents['sel'] = this.selectedFn();
                  this.bindEvents['close'] = this.tearDownFn(null, false);
                  this.bindContFunctions();
                  //this.bindEvents['body']=this.selectedFn();
                  var instance = this;
                  this.bindEvents['body'] = function() {
                    if(!instance.onContainer && !instance.onItem)
                      instance.tearDown(null, false);
                  };
                  this.bindEvents['scrollCss'] = {
                    overflow: obj.css('overflow') || 'auto',
                    'overflow-x': obj.css('overflow-x') || 'auto',
                    'overflow-y': obj.css('overflow-y') || 'auto'
                  };
                  obj.css('overflow-y', 'hidden');
                  $(window).bind('mousedown', this.bindEvents['body']);
                },
                bindContFunctions: function() {
                  for( var i = 0; i < this.options['fwKey'].length; i++)
                    $xj.bindKc(this.options['fwKey'][i], this.bindEvents['fw']);
                  for( var i = 0; i < this.options['bkKey'].length; i++)
                    $xj.bindKc(this.options['bkKey'][i], this.bindEvents['bk']);
                  for( var i = 0; i < this.options['selectKey'].length; i++) {
                    $xj.bindKc(this.options['selectKey'][i],
                      this.bindEvents['sel']);
                    $xj.bindKc(this.options['selectKey'][i],
                      this.bindEvents['sel'], {
                        pressed: ['Shift']
                      });
                  }
                  for( var i = 0; i < this.options['closeKey'].length; i++) {
                    $xj.bindKc(this.options['closeKey'][i],
                      this.bindEvents['close']);
                    $xj.bindKc(this.options['closeKey'][i],
                      this.bindEvents['close'], {
                        pressed: ['Shift']
                      });
                  }
                  this.content.find('a').parent().andSelf().click(
                    this.bindEvents['sel']);
                },
                unbindContFunctions: function() {
                  for( var i = 0; i < this.options['fwKey'].length; i++)
                    $xj.unbindKc(this.options['fwKey'][i], this.bindEvents['fw']);
                  for( var i = 0; i < this.options['bkKey'].length; i++)
                    $xj.unbindKc(this.options['bkKey'][i], this.bindEvents['bk']);
                  for( var i = 0; i < this.options['selectKey'].length; i++) {
                    $xj.unbindKc(this.options['selectKey'][i],
                      this.bindEvents['sel']);
                    $xj.unbindKc(this.options['selectKey'][i],
                      this.bindEvents['sel']);
                  }
                  for( var i = 0; i < this.options['closeKey'].length; i++) {
                    $xj.unbindKc(this.options['closeKey'][i],
                      this.bindEvents['close']);
                    $xj.unbindKc(this.options['closeKey'][i],
                      this.bindEvents['close']);
                  }
                  this.content.find('a').parent().andSelf().unbind('click',
                    this.bindEvents['sel']);
                },
                tearDown: function(e, opt) {
                  return this.tearDownFn(opt)(e);
                },
                tearDownFn: function(opt) {
                  var instance = this.instance;
                  return function(e) {
                    if(e && e.type.match(/click/) && !$xj.isSelfEvent(e) && opt)
                      return false;
                    if(e && $xj.isParentEvent(e))
                      return false;
                    if(instance.dead)
                      return false;
                    instance.unbindContFunctions();
                    var obj = $('body');
                    obj.css(instance.bindEvents['scrollCss']);
                    $(window).unbind('mousedown', instance.bindEvents['body']);
  
                    instance.container.empty().remove();
                    instance.dead = true;
                    instance.options['onTearDown'](e, instance, opt);
                    if(opt && !opt['nodelete'])
                      delete xjQuery.WebParts.Parts[instance.baseparam['attr']['id']];
                    else
                      instance.dead = false;
                    return true;
                  };
                },
                focus: function(e, num, dirc) {
                  this.focusFn(num, dirc)(e);
                },
                focusFn: function(num, dirc) {
                  var instance = this.instance;
                  return function(e) {
                    var tgt = null;
                    if(e && $xj.isSelfEvent(e))
                      tgt = $(e.target);
                    else if(e && $(e.target).parent().get(0).tagName == 'LI')
                      tgt = $(e.target).parent();
                    else if($xj.isNumeric(num))
                      tgt = instance.content.find('li').eq(num);
                    if(tgt) {
                      if(instance.options['autoComplete'])
                        if(!tgt.hasClass('liveSearchResults') && dirc) {
                          instance.selectingFn(dirc)(e);
                          return;
                        }
                      var wasFocus = tgt.siblings('.isFocused');
                      if(wasFocus.length) {
                        wasFocus.removeClass('isFocused');
                        wasFocus.css(instance.options['liBaseparam']['css']);
                      }
                      $xj.data(tgt, 'selectPanelStyle', $xj.style2Css(tgt
                          .attr('style')));
                      tgt.css(instance.options['focusCss']);
                      tgt.addClass('isFocused');
                      tgt.find('a').focus();
                      var co = instance.container;
                      if(co.height() < tgt.offset().top + tgt.height()
                        - co.offset().top)
                        co.scrollTop(co.scrollTop() + tgt.offset().top
                          + tgt.height() - co.offset().top - co.height());
                      else if(0 > tgt.offset().top - co.offset().top)
                        co.scrollTop(co.scrollTop()
                          + (tgt.offset().top - co.offset().top));
                      instance.options['onItemFocus'](e, tgt.find('a').val(), tgt
                          .find('a').text(), instance);
                    }
                  };
                },
                firstSelectingFn: function(dirc) {
                  var instance = this.instance;
                  return function(e) {
                    if(!instance.content.find('.liveSearchResults.isFocused').length)
                      instance.selectingFn(dirc)();
                  };
                },
                selectingFn: function(dirc) {
                  var instance = this.instance;
                  return function(e) {
                    if(!instance.content.find('li').length)
                      return;
                    if(instance.options['autoComplete']
                      && !instance.content.find('li.liveSearchResults').length)
                      return;
                    switch(dirc) {
                    case 'fw':
                      if(++instance.position >= instance.content.children().length)
                        instance.position = 0;
                      break;
                    case 'bk':
                      if(--instance.position < 0)
                        instance.position = instance.content.children().length - 1;
                      break;
                    }
                    instance.focus(e, instance.position, dirc);
                  };
                },
                select: function(e) {
                  this.selectedFn()(e);
                },
                selectedFn: function() {
                  var instance = this.instance;
                  return function(e) {
                    var select;
                    if(e
                      && (e.type.match(/click/) && instance.onContainer
                        && !$xj.isSelfEvent(e) || e.type.match(/mousedown/)/* && !$xj.eqjQueryObj($(e.target),$('body'))*/
                      ))
                      return false;
                    if(e
                      && (e.type.match(/click/) && instance.onContainer
                        && instance.onItem || e.type.match(/keydown/))) {
                      var sel = (instance.options['autoComplete'])
                        ? instance.content.find('.liveSearchResults.isFocused')
                        : instance.content.find('.isFocused');
                      if(sel.length) {
                        instance.options['onSelect'](e, sel.find('a').val(), sel
                            .find('a').text(), instance);
                        select = true;
                      } else {
                        select = false;
                      }
                    } else if(instance.onContainer) {
                      return false;
                    } else {
                      instance.options['onNoSelect'](e);
                      select = false;
                    }
                    return instance.tearDown(e, select);
                  };
                }
              };
  
              // local function
              var intoItemFn = function() {
                var instance = this.instance;
                return function() {
                  instance.onItem = true;
                };
              }, outofItemFn = function() {
                var instance = this.instance;
                return function() {
                  instance.onItem = false;
                };
              }, intoContainerFn = function() {
                var instance = this.instance;
                return function() {
                  instance.onContainer = true;
                };
              }, outofContainerFn = function() {
                var instance = this.instance;
                return function() {
                  instance.onContainer = false;
                };
              };
              intoItemFn, outofItemFn, intoContainerFn, outofContainerFn;
  
              // makeClass via WebParts.makeClass	
              return this.makeClass('selectPanel', prototypeItems, baseparam,
                arguments);
            },
            dialog: function(something, baseparam) {
              // something is dialogContent(DOM) or name
              var prototypeItems = {
                initialize: function(args) {
                  var appending = args[0], baseparam = args[1];
                  var defaultParam = $.extend(true, {
                    clsArr: [baseparam['attr']['id'], 'xjDialog']
                  }, $xj.getPartsTemplate('dialog'), baseparam);
                  /**
                   * TODO color option
                   */
                  //var colorParam	=$.extend(true,$xj.getPartsTemplate('color',defaultParam['options']['color']),defaultParam['options']['colorOption']);
                  this.instance = this;
                  this.content = appending;
                  //this.baseparam 	= $.extend(true,defaultParam,{css:{width:$xj.Parts.adjustedWidth(appended,defaultParam)}});
                  this.baseparam = defaultParam;
                  this.options = this.baseparam['options'];
                  this.container = $xj.SPACER(this.baseparam);
                },
                make: function() {
                  this.container.append(this.content);
                  this.container.dialog(this.baseparam['options']['dialog']);
                  var ui = this.container.dialog('widget');
                  if(!this.options['showClose'])
                    ui.find('.ui-dialog-titlebar-close').remove();
                  for( var i in this.baseparam['options']['dialogSetting']) {
                    var val = this.baseparam['options']['dialogSetting'][i];
                    if(typeof val === false)
                      continue;
                    switch(i) {
                    case 'handlerVerticalPadding':
                      ui.find('.ui-dialog-titlebar').css({
                        'padding-top': val,
                        'padding-bottom': val
                      });
                      break;
                    }
                  }
                  this.options['dialogSetting']['onCreate'].apply(this, [ui]);
                  return ui;
                },
                widget: function() {
                  return this.container.dialog("widget");
                },
                header: function() {
                  return this.widget().children(':first-child');
                },
                isOpen: function() {
                  return this.container.dialog("isOpen");
                },
                open: function() {
                  this.container.dialog("open");
                },
                moveToTop: function() {
                  this.container.dialog("moveToTop");
                },
                close: function() {
                  this.container.dialog("close");
                }
              };
              return this.makeClass('dialog', prototypeItems, baseparam,
                arguments);
            },
            tab: function(something, appended, baseparam) {
              // something is structure or name
              var prototypeItems = {
                initialize: function(args) {
                  var structure = args[0], appended = args[1], baseparam = args[2];
                  this.type = 'tab';
                  $xj._WebParts_BaseInit(this, baseparam, {
                    structure: structure,
                    appended: appended
                  });
                  this.baseparam = $.extend(true, this.baseparam, {
                    css: {
                      width: $xj.Parts.adjustedWidth(appended, this.defaultParam)
                    }
                  });
                  var css = {};
                  css[['#', this.id, '.xjbase.ui-widget-content'].join("")] = {
                    background: this.colorParam['bg']
                  };
                  css[['#', this.id, ' .xjbase.ui-widget-header'].join("")] = {
                    border: ['1px solid ', this.colorParam['line']].join(""),
                    background: this.colorParam['linebg']
                  };
                  css[['#', this.id, ' .xjbase.ui-state-default.ui-corner-top a']
                      .join("")] = {
                    color: this.colorParam['color_sub']
                  };
                  css[['#', this.id,
                    ' .xjbase.ui-state-default.ui-corner-top.ui-state-hover']
                      .join("")] = {
                    border: ['1px solid ', this.colorParam['line']].join(""),
                    background: this.colorParam['linebg_hover']
                  };
                  css[['#', this.id,
                    ' .xjbase.ui-state-default.ui-corner-top.ui-state-hover a']
                      .join("")] = {
                    color: this.colorParam['color_hover']
                  };
                  css[['#', this.id,
                    ' .xjbase.ui-state-default.ui-corner-top.ui-tabs-selected.ui-state-active']
                      .join("")] = {
                    border: ['1px solid ', this.colorParam['line']].join(""),
                    background: this.colorParam['linebg_active']
                  };
                  css[['#', this.id,
                    ' .xjbase.ui-state-default.ui-corner-top.ui-tabs-selected.ui-state-active a']
                      .join("")] = {
                    color: this.colorParam['color_active']
                  };
                  css[['#', this.id, ' .xjbase.ui-widget-content'].join("")] = {
                    background: this.colorParam['bg']
                  };
                  $xj.putCss(css);
                  this.nextTabNo = 1;
                  this.container = $xj.SPACER(this.baseparam);
                  this.newContent = $xj.SPACER();
                  this.index = 0;
                },
                make: function() {
                  if(this.options['tabsSetting']['sort'])
                    this.structure = $xj.asort(this.structure);
  
                  var li = [];
                  for( var i in this.structure)
                    li.push([
                      $xj.A($xj.i18n(i), $.extend(true, {
                        attr: {
                          href: ['#', this.baseparam['attr']['id'], '-', i]
                              .join("")
                        }
                      }, this.baseparam['options']['span'])), $.extend(true, {
                        css: {
                          float: 'left'
                        }
                      }, this.baseparam['options']['li'])]);
                  this.container.append($xj.UL(li,
                    this.baseparam['options']['ul']));
                  for( var i in this.structure) {
                    this.nextTabNo++;
                    var id = [this.baseparam['attr']['id'], '-', i].join("");
                    var cont = $xj.SPACER({
                      attr: {
                        id: id
                      }
                    });
                    if(this.structure[i]['html'])
                      cont.html(this.structure[i]['html']);
                    else
                      cont.append(this.structure[i]['dom'] || $xj.SPACER());
                    this.container.append(cont);
                  }
                  this.appended.append(this.container);
                  /**
                   * TODO width adjusting close button setting * attention
                   * *.find('.ui-icon-close') causes "all of container item makes
                   * tab close."
                   */
                  //this.appended.bind('resize',this.onResizeFn());
                  //this.container.find('.ui-icon-close').click(this.delFn());
                  this.container.tabs($.extend({
                    add: this.onAddFn(),
                    select: this.onSelectFn()
                  }, this.baseparam['options']['tabs']));
                  for( var i in this.baseparam['options']['tabsSetting']) {
                    var val = this.baseparam['options']['tabsSetting'][i];
                    if(!val)
                      continue;
                    switch(i) {
                    case 'background':
                      this.container.css('background', val);
                      break;
                    case 'handlerBackground':
                      this.container.find('.ui-tabs-nav li').css('background',
                        val);
                      break;
                    case 'handlerVerticalPadding':
                      this.container.find('.ui-tabs-nav li a').css({
                        'padding-top': val,
                        'padding-bottom': val
                      });
                      break;
                    }
                  }
                  return this.container;
                },
                select: function(name) {
                  this.container.tabs("select", name);
                },
                onResizeFn: function() {
                  var instance = this.instance;
                  return function(e) {
                    instance.container.css('width', $xj.Parts.adjustedWidth(
                      instance.appended, instance.baseparam));
                  };
                },
                onAddFn: function() {
                  var instance = this.instance;
                  return function(e, ui) {
                    $(ui.panel).append(instance.newContent);
                    $(ui.tab).parent().find('.ui-icon-close').click(
                      instance.delFn());
                  };
                },
                onSelectFn: function() {
                  var instance = this.instance;
                  return function(e, ui) {
                    instance.index = ui.index;
                  };
                },
                add: function(item) {
                  this.addFn(item)();
                },
                del: function(index) {
                  this.delFn(index)();
                },
                addFn: function(item) {
                  if(!item)
                    item = {};
                  if(item['content'])
                    this.newContent = item['content'];
                  var instance = this.instance;
                  return function() {
                    instance.container.tabs('add', ['#',
                      instance.baseparam['attr']['id'], '-', instance.nextTabNo]
                        .join(""), (item['title']) ? item['title']: ['Tab ',
                      instance.nextTabNo].join(""));
                    instance.nextTabNo++;
                  }
                },
                delFn: function(index) {
                  var instance = this.instance;
                  return function(e, ui) {
                    var tabNo = (index) ? index: $('li', instance.container)
                        .index($(this).parent());
                    instance.container.tabs('remove', tabNo);
                  }
                }
              };
              return this.makeClass('tab', prototypeItems, baseparam, arguments);
  
            },
            contextMenu: function(something, menulist, baseparam) {
              // something is contextObject(DOM) or name 
              /**
               * TODO 見直し
               */
              var prototypeItems = {
                initialize: function(args) {
                  $.extend(xjQuery.i18n.Dictionary, {
                    xjbase_context_title: {
                      ja: 'ショートカットメニュー'
                    },
                    xjbase_logout_title: {
                      ja: 'ログアウト'
                    }
                  });
                  var something = args[0], menulist = args[1], baseparam = args[2];
                  var defaultBaseParam = {
                    css: {
                      width: 'auto',
                      opacity: 0.95
                    },
                    options: {
                      query: document
                    }
                  };
                  this.instance = this;
                  this.obj = something;
                  this.menulist = menulist;
                  this.baseparam = $.extend(true, defaultBaseParam, baseparam);
                  if(!this.baseparam['clsArr'])
                    this.baseparam['clsArr'] = [baseparam['attr']['id'],
                      'ecContextMenu'];
                  else if(!$.inArray('contextmenu', this.baseparam['clsArr']))
                    this.baseparam['clsArr'] = this.baseparam['clsArr'].push(
                      baseparam['attr']['id']).push('contextmenu');
                  this.options = this.baseparam['options'];
                  this.container = $xj
                      .DIV(makeDom(this.instance), this.baseparam);
                  this.origin = this.container.clone(true);
                  function makeDom(instance) {
                    if(typeof instance.options['style'] != 'string')
                      style = 'default';
                    var liarr = [[$xj.word('xjbase_context_title'), null, {
                      clsArr: ['context-menu-title', style]
                    }]];
                    for( var i in instance.menulist)
                      liarr.push([$xj.A(i), i, {
                        clsArr: ['context-menu-item', style],
                        event: {
                          mouseup: instance.menulist[i],
                          click: instance.removeFn()
                        }
                      }]);
                    return $xj.UL(liarr, instance.baseparam);
                  }
                },
                make: function() {
                  this.obj.bind("contextmenu", this.attachFn());
                  this.container.bind("click", this.removeFn());
                  $('body').bind("click", this.removeFn());
                  $(window).bind("click", this.removeFn());
                },
                attachFn: function() {
                  var instance = this.instance;
                  return function(e) {
                    if($('#' + instance.baseparam['attr']['id']).length != 0)
                      return;
                    instance.container = instance.origin.clone(this);
                    $('body').append(instance.container);
                    instance.container.show().css({
                      top: e.pageY + "px",
                      left: e.pageX + "px",
                      position: "absolute",
                      opacity: instance.baseparam['css']['opacity'],
                      zIndex: $xj.maxZindex()
                    });
                    return false;
                  }
                },
                removeFn: function() {
                  var instance = this.instance;
                  return function(e) {
                    instance.container.fadeOut(150);
                    instance.container.remove();
                  }
                }
              };
              return this.makeClass('contextMenu', prototypeItems, baseparam,
                arguments);
            },
            table: function(something, baseparam) {
              // something is structure or name
              var prototypeItems = {
                initialize: function(args) {
                  var structure = args[0], baseparam = args[1];
                  var defaultParam = $.extend(true,
                    $xj.getPartsTemplate('table'), baseparam);
                  var colorParam = $.extend(true, $xj.getPartsTemplate('color',
                    defaultParam['options']['color']),
                    defaultParam['options']['colorOption']);
                  this.instance = this;
                  this.structure = structure;
                  this.baseparam = $.extend(true, {
                    clsArr: [baseparam['attr']['id'], 'ecTable']
                  }, defaultParam, {
                    options: {
                      colorParam: colorParam
                    }
                  });
                  this.options = $.extend(true, {
                    tdbase: {}
                  }, this.baseparam['options']);
                  this.table = $xj.TABLE(this.structure, this.options['tblbase'],
                    this.options['trbase'], this.options['tdbase']);
                  this.container = $xj.DIV(this.table, this.baseparam);
                },
                make: function() {
                  var instance = this;
                  var trs = this.table.find('tbody').children();
                  for( var i = 0; i < trs.length; i++) {
                    var obj = trs.eq(i);
                    $xj.data(obj, 'tblRowId', i);
                    if(instance.options['rowData']
                      && instance.options['rowData'][i] !== undefined)
                      $xj.data(obj, 'tblRowData', instance.options['rowData'][i]);
                  }
                  var path = ['url("', xjQuery._xjpath,
                    '/js/lib/dataTable/images/'].join(""), css = {};
                  css[addId('.dataTables_length')] = {
                    width: '40%',
                    float: 'left',
                    'margin': '5px 0'
                  };
                  css[addId('.dataTables_filter')] = {
                    width: '50%',
                    float: 'right',
                    'text-align': 'right'
                  };
                  css[addId('.dataTables_info')] = {
                    width: '60%',
                    float: 'left',
                    'margin': '5px 0'
                  };
                  css[addId('.dataTables_paginate')] = {
                    width: 'auto',
                    float: 'right',
                    margin: '5px',
                    'padding-right': '15px'
                  };
                  css[addId('.sorting_asc :not(.xjbaseFormSubst)')] = {
                    'background': [path, 'sort_asc.png" ) no-repeat center left']
                        .join(""),
                    'padding-left': '30px'
                  };
                  css[addId('.sorting_desc :not(.xjbaseFormSubst)')] = {
                    'background': [path, 'sort_desc.png") no-repeat center left']
                        .join(""),
                    'padding-left': '30px'
                  };
                  css[addId('.sorting :not(.xjbaseFormSubst)')] = {
                    'background': [path, 'sort_both.png") no-repeat center left']
                        .join(""),
                    'padding-left': '30px'
                  };
                  css[addId('tr.odd')] = {
                    'background-color': '#ffefee'
                  };
                  css[addId('tr.even')] = {
                    'background-color': 'white'
                  };
                  css[addId('tr.odd.hover')] = {
                    'background-color': '#ffe8a8'
                  };
                  css[addId('tr.even.hover')] = {
                    'background-color': '#ffe8a8'
                  };
                  css[addId('.paginate_disabled_previous')] = {
                    'background-image': [path, 'back_disabled.jpg")'].join(""),
                    float: 'left',
                    width: '18px',
                    height: '18px',
                    margin: '2px'
                  };
                  css[addId('.paginate_disabled_next')] = {
                    'background-image': [path, 'forward_disabled.jpg")'].join(""),
                    float: 'left',
                    width: '18px',
                    height: '18px',
                    margin: '2px'
                  };
                  css[addId('.paginate_enabled_previous')] = {
                    'background-image': [path, 'back_enabled.jpg")'].join(""),
                    float: 'left',
                    width: '18px',
                    height: '18px',
                    margin: '2px'
                  };
                  css[addId('.paginate_enabled_next')] = {
                    'background-image': [path, 'forward_enabled.jpg")'].join(""),
                    float: 'left',
                    width: '18px',
                    height: '18px',
                    margin: '2px'
                  };
                  css[addId('.paginate_button')] = {
                    cursor: 'pointer',
                    'text-align': 'center',
                    margin: '1px',
                    padding: '1px 3px',
                    border: '1px solid #ccc',
                    'border-radius': '3px'
                  };
                  css[addId('.paginate_active')] = {
                    'background-color': '#ffe8e8',
                    cursor: 'normal',
                    'text-align': 'center',
                    margin: '1px',
                    padding: '1px 3px',
                    border: '1px solid #ccc',
                    'border-radius': '3px'
                  };
                  css[addId('.paginate_button:hover')] = {
                    'background-color': '#f8f0f0'
                  };
                  function addId(nm) {
                    return ['#', instance.baseparam['attr']['id'], ' ', nm]
                        .join("");
                  };
                  $xj.putCss(css);
                  this.table.dataTable(this.options['dataTable']);
                  return this.container;
                }
              };
              return this
                  .makeClass('table', prototypeItems, baseparam, arguments);
            },
            adjustedWidth: function(appended, baseparam) {
              var value = baseparam['css']['width'].toString().match(/(\d+)/)[1];
              if(!appended.css('width'))
                return;
              if(appended.width() == appended.css('width').replace('%', ''))
                return baseparam['css']['width'];
              if(baseparam['css']['width'].toString().match(/%/)) {
                return appended.width() * (value / 100)
                  - baseparam['options']['widthAdjust'];
              } else
                return appended.width() - baseparam['options']['widthAdjust'];
            },
            menuBoard: function(a, param) {
              /**
               * TODO menuBoardは全体的に見直し
               */
            }
          }
        });
});
