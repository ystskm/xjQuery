/*
 *  Create by Y.Sakamoto 2010/08/20
 *  ----------------
 *  NECESSARY LIB:
 *      (1) jQuery-UI
 *  ----------------
 *  NECESSARY ALONE:
 *  	(1) class
 *  	(2) dom
 *      (3) timeUtil (for debug)
 *      (4) log (for debug)
 *  ----------------
 *  NECESSARY COMPLEX:
 *  	(1) ajax -> ALONE: (1) jsonUtil (2) session
 *  	(2) form
 *  ----------------
 */
$xj
    .extend(
      xjQuery.FORM,
      'CLASSED',
      {
        CONSTANTS: {
          message: {
            system_error: {
              noarg: '##xjQuery ERROR## function of xjQuery.FORM.CLASSED requires one or more arguments',
              noid: '##xjQuery ERROR## function of xjQuery.FORM.CLASSED argument[1] requires arguments[1][attr][id]'
            }
          },
          common: {},
          uploader: {},
          imulti: {
            RowIdSign: 'R'
          }
        },
        UPLOADER: function(something) {
          // something is name or baseparam
          var prototypeItems = {
            initialize: function(baseparam) {
              this.instance = this;
              this.baseparam = (baseparam) ? baseparam: {
                options: {}
              };
              this.options = $.extend(true, {
                buttonBaseparam: {
                  attr: {
                    value: 'upload'
                  },
                  css: {
                    width: '14%',
                    top: '2px',
                    'margin-left': '1%',
                    padding: '2px 0 4px 0'
                  }
                },
                inputBaseparam: {
                  attr: {
                    name: 'upload'
                  },
                  css: {
                    width: '84%',
                    'margin-left': '1%',
                    padding: '1px 0 3px'
                  }
                },
                inputNobuttonWidth: '98%',
                iframeBaseparam: {
                  attr: {
                    name: ['upload_target', '_', baseparam['attr']['id']]
                        .join("")
                  }
                },
                uploadParam: {
                  DIRC: ['upload'].join(""),
                  FAUTH: null,
                  type: 'text',
                  fn: function(e, instance) {
                  },
                  errfn: function(e, instance) {
                  }
                },
                execParam: {}
              }, baseparam['options']);
              this.container = $xj.ANY('form', '', $.extend(true,
                this.baseparam, {
                  attr: {
                    method: 'post',
                    target: this.options['iframeBaseparam']['attr']['name'],
                    action: $xj.getURL(),
                    enctype: 'multipart/form-data'
                  }
                }));
              this.btn = (this.options['noButton']) ? $xj.SPACER().hide(): $xj
                  .BUTTON(this.options['buttonBaseparam']);
              this.inp = $xj.FILE(this.options['inputBaseparam']);
              if(this.options['noButton'])
                this.inp.css('width', this.options['inputNobuttonWidth']);
              this.spa = $xj.SPACER().hide();
              this.iframe = $xj.ANY('iframe', '',
                this.options['iframeBaseparam']).hide();
            },
            makeUploadForm: function() {
              this.container.append(this.btn).append(this.inp).append(this.spa);
              if(this.options['noButton'])
                this.inp.bind('change', this.execUploadFn());
              else
                this.btn.click(this.execUploadFn());
              this.container.submit(this.afterUploadFn());
              return this.container;
            },
            execUploadFn: function() {
              /** TODO is it OK ? * */
              if(typeof FileReader != "undefined")
                return this.fileAPI();
              else
                return this.serverAPI();
            },
            check: function() {
              if(!this.inp.val()) {
                alert('FILE IS NOT SELECTED');
                return false;
              } else
                return true;
            },
            fileAPI: function() {
              var instance = this.instance;
              return function(e) {
                if(!instance.check)
                  return;
                var reader = new FileReader();
                var file = instance.inp.get(0).files[0];
                reader.onload = function() {
                  instance.options['uploadParam']['fn'](reader.result);
                };
                reader.readAsText(file);
              };
            },
            serverAPI: function() {
              /**
               * TODO remake for node.js
               */
              var instance = this.instance;
              return function(e) {
                /**
                 * TODO delete
                 */
                // >>
                alert('NOW ON TODO METHOD!')
                // <<
                instance.spa.empty();
                instance.iframe.remove();
                instance.iframe.load(instance.endOfUploadFn());
                if(!instance.check)
                  return;
                var a = instance.inp.val().split('\\');
                instance.options['execParam'] = {
                  OPERATORID: $xj.OnLogin['MemberId'],
                  ANYSERVER: $xj.ajaxSetting('AnyServer'),
                  FUNC: 'Util/DirectoryOperator',
                  FUNCTION: 'uploadFile',
                  DIRC: instance.options['uploadParam']['DIRC'],
                  FNAM: a[a.length - 1],
                  INAM: instance.inp.attr('name'),
                  FAUTH: instance.options['uploadParam']['FAUTH']
                };
                for( var i in instance.options['execParam'])
                  instance.spa.append($xj.INPUT({
                    attr: {
                      name: i,
                      value: instance.options['execParam'][i]
                    }
                  }));
                instance.container.submit();
              };
            },
            afterUploadFn: function() {
              var instance = this.instance;
              return function(e) {
                instance.container.append(instance.iframe);
              };
            },
            endOfUploadFn: function() {
              var instance = this.instance;
              return function() {
                var data = instance.iframe.contents().text();
                setTimeout(instance.execCallbackFn(self, data), 0);
              };
            },
            execCallbackFn: function(self, data) {
              try {
                var instance = this.instance;
                if(data.match(instance.options['execParam']['FNAM']))
                  return function() {
                    instance.options['uploadParam']['fn'](data, instance, self);
                  };
                else
                  return function() {
                    instance.options['uploadParam']['errfn'](data, instance,
                      self);
                  };
              } catch(e) {
                alert(['UPLOAD FAILED (reason:', e, ')'].join(""));
              }
            }
          };
          // main method
          if(!something)
            alert(this.CONSTANTS.message.system_error['noarg']);
          if(typeof something == 'object') { // create
            // check
            if(!something['attr']['id'])
              alert(this.CONSTANTS.message.system_error['noid']);
            // make class
            if(!this.UPLOADER.CLASS)
              $.extend(this.UPLOADER, {
                CLASS: $xj.makeClass(prototypeItems)
              });
            // new
            this[something['attr']['id']] = new this.UPLOADER.CLASS(something);
            return this[something['attr']['id']].makeUploadForm();
          } else
            // get
            return this[something];
        },
        IMULTI: function(something, baseparam) {
          // something is structure or name
          // baseparam['options'] : noButton(true/false)
          var prototypeItems = {
            initialize: function(structure, baseparam) {
              this.instance = this;
              this.structure = structure;
              this.baseparam = (baseparam) ? baseparam: {
                options: {}
              };
              this.lineCnt = 0;
              this.maxRowId = 0;
              this.options = $.extend(true, {
                button: {
                  style: [[{
                    clsArr: 'xjbaseAddButton',
                    attr: {
                      value: 'add'
                    },
                    css: {
                      width: '90%',
                      'margin': '1px 0 0 5%',
                      padding: 0
                    }
                  }, {
                    clsArr: 'xjbaseDelButton',
                    attr: {
                      value: 'remove'
                    },
                    css: {
                      width: '90%',
                      'margin': '1px 0 0 5%',
                      padding: 0
                    }
                  }]],
                  size: [[8, 8]]
                },
                sortable: {
                  placeholder: "xjbase ui-state-highlight",
                  items: '> table',
                  stop: this.sortStopFn()
                },
                rowBaseparam: {
                  clsArr: ['xjbaseImultiRow'],
                  css: {
                    'margin-top': 0
                  }
                },
                subrowBaseparam: {
                  css: {
                    'margin-top': 0
                  }
                },
                subcolBaseparam: {
                  adjuster: []
                },
                rowIdName: 'rowId',
                createEnd: function() {
                },
                valloadEnd: function() {
                },
                addStart: function() {
                },
                addEnd: function() {
                },
                delStart: function() {
                },
                delEnd: function() {
                },
                sortStart: function() {
                },
                sortEnd: function() {
                }
              }, this.baseparam['options']);
              this.container = $xj.SPACER($.extend(true, {
                clsArr: 'xjbaseIMULTI',
                css: {
                  width: '100%',
                  height: '100px'
                }
              }, this.baseparam));
              this.table = null;
              this.idMap = {};
              this.origin = null;
              // button set
              this.setButton();
              // structure init
              for( var i = 0; i < this.structure.length; i++) {
                for( var j = 0; j < this.structure[j]; j++) {
                  if($xj.isjQueryObj(this.structure[j][1])) {
                    var obj = this.structure[j][1];
                    this.setValue(0, this.baseparam, obj);
                  } else {
                    var obj = ($xj.isjQueryObj(this.structure[j][0]))
                      ? this.structure[j][0]: this.structure[j];
                    this.setValue(0, this.baseparam, obj);
                  }
                }
              }
            },
            makeImultiForm: function() {
              this.table = $xj.SPACER();
              this.origin = $xj.TABLE(this.structure,
                this.options['rowBaseparam'], this.options['subrowBaseparam'],
                this.options['subcolBaseparam']);
              this.setIdAndValue('new', 0, {
                obj: this.origin
              });
              this.addLine();
              this.container.append(this.table);
              this.sortabled();
              this.options.createEnd(this.instance, 'create', {});
              this.container.data('instance', this);
              return this.container;
            },
            addLine: function(o) {
              this.addLineFn(o)();
            }

            ,
            delLine: function(o) {
              this.delLineFn(o)();
            }

            ,
            setRowId: function() {
              this.setRowIdFn()();
            }

            ,
            sortabled: function() {
              if(this.options['sortable'])
                this.table.sortable(this.options['sortable']);
            },
            sortTrue: function() {
              if(this.options['sortable'])
                this.table.sortable('enable');
            },
            sortFalse: function() {
              if(this.options['sortable'])
                this.table.sortable('disable');
            },
            refreshInst: function(o) {
              this.table.empty();
              this.idMap = new Object();
              this.lineCnt = 0;
              this.addLine(o);
            },
            refreshLine: function() {
              this.table.find('input:text').val('');
              this.table.find('input:checkbox').attr('checked', false);
            },
            sortStopFn: function() {
              var instance = this;
              return function(e, ui) {
                instance.remakeIdMap();
                instance.options.sortEnd(instance, 'sortStop', {
                  event: e,
                  ui: this
                });
              };
            },
            remakeIdMap: function() {
              this.idMap = {};
              var ch = this.table.find('.xjbaseImultiRow');
              for( var i = 0; i < ch.length; i++)
                this.idMap[this.rowObj2mapKey(ch.eq(i))] = i;
            },
            pasteIdMap: function(map) {
              this.idMap = $.extend({}, map);
              var rMap = [];
              for( var i in this.idMap)
                rMap[this.idMap[i]] = parseInt(i.match(/\d+$/)[0]);
              var ch = this.table.find('.xjbaseImultiRow');
              for( var i = 0; i < ch.length; i++)
                if(rMap[i])
                  ch.eq(i).data(this.options['rowIdName'], rMap[i]);
            },
            addLineFn: function(o) {
              var o = $.extend({
                copy: false,
                num: 1,
                map: null,
                position: null,
                tgtRowNum: null,
                tgtRowId: null,
                setRowId: null,
                vals: null,
                execAddStart: true,
                execAddEnd: true
              }, o);
              var instance = this.instance;
              return function(e) {
                var copyLine = o['copy'], addNum = o['num'], map = o['map'], tgtRowNum = o['tgtRowNum'], tgtRowId = o['tgtRowId'], pos = o['position'], setRowId = o['setRowId'], vals = o['vals'], cbOpt = o['callbackOpt'];
                // ===> performance checker
                //$xj.writeConsole(['addLineFn - start:',$xj.clientUnixMSec()].join(""));
                if(o['execAddStart'])
                  if(instance.options.addStart(instance,
                    (copyLine || copyLine === 0) ? 'copy': 'add', {
                      event: e,
                      oldRowId: rowId,
                      newRowId: maxRow,
                      rowNum: rowNum,
                      callbackOpt: cbOpt
                    }) === false)
                    return;
                var rowId, rowObj, pa, maxRow;
                if(setRowId) {
                  maxRow = setRowId;
                  if(setRowId >= instance.maxRowId)
                    instance.maxRowId = parseInt(setRowId) + 1;
                } else {
                  maxRow = instance.maxRowId++;
                }
                if(e && !tgtRowId)
                  tgtRowId = instance.event2rowId(e);
                if(copyLine || copyLine === 0) {
                  if(tgtRowId != null)
                    rowId = tgtRowId;
                  else if(tgtRowNum != null) {
                    rowObj = instance.getObjByRowNum(tgtRowNum);
                    rowId = instance.rowObj2rowId(rowObj);
                  } else if(e)
                    rowId = $xj.isNumeric($.data(e.target,
                      instance.options['rowIdName'])) ? $.data(e.target,
                      instance.options['rowIdName']): instance.event2rowId(e);
                  if(!rowObj) {
                    if($xj.isNumeric(rowId))
                      rowObj = instance.getObjByRowId(rowId);
                    else {
                      rowObj = instance.getObjByRowNum(instance.table
                          .children('table').length - 1);
                      rowId = instance.rowObj2rowId(rowObj);
                    }
                  }
                  pa = rowObj;
                } else {
                  rowObj = instance.origin;
                  if(pos && pos.match(/next|before/)) {
                    if($xj.isNumeric(tgtRowNum))
                      pa = instance.getObjByRowNum(tgtRowNum);
                    else if($xj.isNumeric(tgtRowId))
                      pa = instance.getObjByRowId(tgtRowId);
                    else
                      alert('no target for next/before');
                  }
                }
                if(!pa)
                  pa = rowObj;
                var cnt = 0;
                var cloned = rowObj;
                while(cnt < addNum) {
                  if(cnt)
                    maxRow++;
                  var na = cloned.clone(true);
                  na.data('rowId', maxRow);
                  instance.setIdAndValue('new', maxRow, {
                    obj: na,
                    vals: vals
                  });
                  var tblChildren = instance.table.children('table');
                  if(typeof pos == 'number') {
                    tblChildren.eq(pos).after(na);
                  } else {
                    switch(pos) {
                    case 'before':
                      pa.before(na);
                      break;
                    case 'first':
                      tblChildren.eq(0).before(na);
                      break;
                    case 'next':
                      pa.after(na);
                      break;
                    default:
                      instance.table.append(na);
                    }
                  }
                  instance.lineCnt++;
                  cloned = na.clone(true);
                  cnt++;
                }
                var rowNum = instance.rowObj2rowNum(rowObj);
                if(map)
                  instance.pasteIdMap(map);
                else
                  instance.remakeIdMap();
                if(o['execAddEnd'])
                  instance.options.addEnd(instance,
                    (copyLine || copyLine === 0) ? 'copy': 'add', {
                      event: e,
                      oldRowId: rowId,
                      newRowId: maxRow,
                      rowNum: rowNum,
                      callbackOpt: cbOpt
                    });
                // ===> performance checker
                //$xj.writeConsole(['addLineFn - end:',$xj.clientUnixMSec()].join(""));
              };
            },
            delLineFn: function(o) {
              var o = $.extend({
                execDelStart: true,
                execDelEnd: true
              }, o);
              var instance = this.instance;
              return function(e) {
                if(o['execDelStart'])
                  instance.options.delStart(instance, 'del', {
                    event: e,
                    rowId: rowId,
                    rowNum: rowNum
                  });
                if(instance.lineCnt == 1) {
                  instance.refreshLine();
                  return;
                }
                var rowId, rowObj;
                if(e)
                  rowId = $xj.isNumeric($.data(e.target,
                    instance.options['rowIdName'])) ? $.data(e.target,
                    instance.options['rowIdName']): instance.event2rowId(e);
                if($xj.isNumeric(rowId))
                  rowObj = instance.getObjByRowId(rowId);
                else {
                  rowObj = instance.getObjByRowNum(instance.table
                      .children('table').length - 1);
                  rowId = instance.rowObj2rowId(rowObj);
                }
                var rowNum = instance.rowObj2rowNum(rowObj);
                delete instance.idMap[[
                  xjQuery.FORM.CLASSED.CONSTANTS.imulti['RowIdSign'], rowId]
                    .join("")];
                rowObj.remove();
                instance.lineCnt--;
                instance.remakeIdMap();
                if(o['execDelEnd'])
                  instance.options.delEnd(instance, 'del', {
                    event: e,
                    rowId: rowId,
                    rowNum: rowNum
                  });
              };
            },
            loadImultiVals: function(vals) {
              this.table.empty();
              this.idMap = {};
              this.lineCnt = 0;
              this.maxRowId = 0;
              loading(this, vals);
              if(!this.lineCnt)
                this.table.append(this.origin);
              this.sortabled();
              this.options.valloadEnd(this);
              return this.container;
              function loading(instance, vals) {
                if(!vals)
                  return;
                var idArr = [], idAssoc = {};
                for( var i in vals) {
                  if(!i.match(instance.getImultiRegExp()))
                    continue;
                  var rowNumber = i.match(instance.getImultiRegExp())[2];
                  if(!idAssoc[rowNumber]) {
                    idAssoc[rowNumber] = true;
                    idArr.push(rowNumber);
                  }
                }
                if(idArr.length) {
                  for( var i = 0; i < idArr.length; i++)
                    instance.addLine({
                      setRowId: idArr[i],
                      vals: vals
                    });
                }
              };
            },
            event2rowId: function(e) {
              return this.dom2rowId($(e.target));
            },
            dom2rowId: function(dom) {
              var ps = dom.parents('table');
              for( var i = 0; i < ps.length; i++) {
                var id = this.rowObj2rowId(ps.eq(i));
                if(typeof id != undefined && $xj.isNumeric(parseInt(id)))
                  return parseInt(id);
              }
            },
            rowObj2rowId: function(obj) {
              return $.data(obj, this.options['rowIdName']);
            },
            rowId2mapKey: function(rowId) {
              return [xjQuery.FORM.CLASSED.CONSTANTS.imulti['RowIdSign'], rowId]
                  .join("");
            },
            rowId2rowNum: function(rowId) {
              return this.idMap[this.rowId2mapKey(rowId)];
            },
            rowNum2rowId: function(num) {
              return this.rowObj2rowId(this.getObjByRowNum(num));
            },
            getObjByRowNum: function(num) {
              return this.getMyChildren(num);
            }

            ,
            event2rowObj: function(e) {
              var ps = $(e.target).parents();
              for( var i = 0; i < ps.length; i++) {
                var id = this.rowObj2rowId(ps[i]);
                if($xj.isNumeric(id))
                  return ps.eq(i);
              }
            },
            event2rowNum: function(e) {
              return this.rowId2rowNum(this.event2rowId(e));
            },
            dom2rowNum: function(dom) {
              return this.rowId2rowNum(this.dom2rowId(dom));
            },
            rowObj2mapKey: function(obj) {
              return this.rowId2mapKey(this.rowObj2rowId(obj));
            },
            rowObj2rowNum: function(obj) {
              return this.rowId2rowNum(this.rowObj2mapKey(obj));
            },
            getObjByRowId: function(rowId) {
              var chr = this.getMyChildren();
              for( var i = 0; i < chr.length; i++)
                if(chr.eq(i).data(this.options['rowIdName']) == rowId)
                  return chr.eq(i);
            },
            getImultiRegExp: function() {
              return new RegExp(['(', this.baseparam['attr']['id'],
                '_)(\\d+)(_.*)?'].join(""));
            },
            getIdentifiedClass: function(obj) {
              if(!obj.attr('class'))
                return;
              var idx = $xj.inArrayFirstMatch(this.getImultiRegExp(), obj.attr(
                'class').split(' '))['idx'];
              return obj.attr('class').split(' ')[idx];
            },
            getMyChildren: function(i) {
              var chr = this.table.children('table.xjbaseImultiRow');
              return $xj.isNumeric(i) ? chr.eq(i): chr;
            },
            setRowIdFn: function() {
              var instance = this.instance;
              return function(e, u) {
                var cnt = 0;
                for( var i in instance.getMyChildren())
                  instance.getMyChildren(i).data(instance.options['rowIdName'],
                    cnt++);
              };
            },
            setIdAndValue: function(type, num, o) {
              var o = $.extend({
                idset: true,
                vals: false,
                obj: null
              }, o);
              var obj = null;
              switch(type) {
              case 'rowId':
                obj = this.getObjByRowId(num);
                break;
              case 'rowCnt':
                obj = this.getObjByRowNum(num);
                break;
              case 'new':
                obj = o['obj'];
                break;
              }
              recurSet(this, [this.baseparam['attr']['id'], '_', num].join(""),
                obj, o);
              function recurSet(instance, stdId, parent, o) {
                set(instance, stdId, parent, o);
                if(parent.children().length == 0)
                  return;
                for( var i = 0; i < parent.children().length; i++) {
                  var obj = parent.children().eq(i);
                  recurSet(instance, stdId, obj, o);
                }
              }
              function set(instance, stdId, obj, o) {
                var idset = o['idset'], vals = o['vals'], keyname;
                if(obj.attr('id')) {
                  keyname = [stdId, '_', obj.attr('id')].join("");
                  obj.addClass(obj.attr('id'));
                  obj.removeAttr('id');
                } else {
                  var idClass = instance.getIdentifiedClass(obj);
                  if(idClass) {
                    obj.removeClass(idClass);
                    var ptn_match = idClass.match(instance.getImultiRegExp());
                    keyname = [ptn_match[1], num, ptn_match[3]].join("");
                  } else
                    keyname = stdId;
                }
                if(idset)
                  obj.addClass(keyname);
                if(vals && typeof vals[keyname] != 'undefined')
                  obj.xjVal(vals[keyname]);
              }
            },
            setButton: function() {
              var instance = this;
              var btn_param = this.options['button'];
              var getAction = function(i, j) {
                var fn = function() {
                };
                if(!btn_param['fn'] || !btn_param['fn'][i]
                  || !btn_param['fn'][i][j])
                  fn = function() {
                  };
                else if($.isFunction(btn_param['fn'][i][j]))
                  fn = btn_param['fn'][i][j];
                else {
                  var match = btn_param['fn'][i][j]
                      .match(/(add|del|copy)(\((\w+)\))?/);
                  if(match)
                    switch(match[1]) {
                    case 'add':
                      fn = instance.addLineFn({
                        position: 'next'
                      });
                      break;
                    case 'del':
                      fn = instance.delLineFn();
                      break;
                    case 'copy':
                      fn = instance.addLineFn({
                        copy: true,
                        position: 'next'
                      });
                      break;
                    }
                }
                return fn;
              };
              if(btn_param) {
                if(!btn_param['obj'])
                  for( var i = 0; i < btn_param['size'].length; i++) {
                    var btn_w = 0;
                    for( var j = btn_param['size'][i].length - 1; j >= 0; j--)
                      btn_w += btn_param['size'][i][j];
                    if(!$xj.isArray(this.structure[i]))
                      this.structure[i] = [[100 - btn_w, this.structure[i]]];
                    for( var j = btn_param['size'][i].length - 1; j >= 0; j--) {
                      if(!$xj.isArray(this.structure[i][j]))
                        this.structure[i][j] = [100 - btn_w,
                          this.structure[i][j]];
                      this.structure[i].unshift([
                        btn_param['size'][i][j],
                        $xj.BUTTON(btn_param['style'][i][j]).click(
                          getAction(i, j))]);
                    }
                  }
                else {
                  for( var i = 0; i < btn_param['size'].length; i++) {
                    if(!$xj.isArray(this.structure[i])) {
                      var btn_w = 0;
                      for( var j = btn_param['size'][i].length - 1; j >= 0; j--)
                        btn_w += btn_param['size'][i][j];
                      this.structure[i] = [[100 - btn_w, this.structure[i]]];
                    }
                    for( var j = btn_param['size'][i].length - 1; j >= 0; j--)
                      this.structure[i].unshift([
                        btn_param['size'][i][j],
                        btn_param['obj'][i][j].addClass('xjbaseIMULTIButton')
                            .click(getAction(i, j))]);
                  }
                }
              }
            }
          };
          // main method
          if(!something)
            alert(this.CONSTANTS.message.system_error['noarg']);
          if(baseparam) { //create
            // check
            if(!baseparam['attr']['id'])
              alert(this.CONSTANTS.message.system_error['noid']);
            // make class
            if(!this.IMULTI.CLASS)
              $.extend(this.IMULTI, {
                CLASS: $xj.makeClass(prototypeItems)
              });
            // new
            this[baseparam['attr']['id']] = new this.IMULTI.CLASS(something,
              baseparam);
            return this[baseparam['attr']['id']].makeImultiForm();
          } else
            // get
            return this[something];
        }
      });
