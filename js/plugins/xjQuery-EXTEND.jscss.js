/***/
/*  ----------------
 *  NECESSARY COMPLEX:
 *  	(1) COMPLEX.jscss
 *  ----------------
 */
$(function() {

  var _Css = null, _CssNo = null;
  cssRead();

  $xj.extend(xjQuery, 'JSCSS', {
    cssRead: cssRead,
    cssPut: cssPut,
    putCss: putCss
  });

  //overwrite jquery.prototype.css
  (function(window, $) {

    var $css = $.fn.css, ex_css = function() {
      // original $.fn.css
      if(typeof arguments[0] != 'boolean') {
        switch(arguments.length) {
        case 2:
          return $css.call(this, arguments[0], arguments[1]);
        case 1:
          return $css.call(this, arguments[0]);
        default:
          return $css.apply(this, arguments);
        }
      }

      // xjQuery custom function 
      var styles = arguments[1];

      if(arguments[0] == true && this.selector && !/\)$/.test(this.selector)) {

        // last cssPut object
        var css_script = {};

        // change to css
        var elements_style = {};
        var individual_style = [];
        var individual_names = {};
        if(this.attr('style'))
          this.each(function(i, dom) {
            var sty = $(dom).attr('style');
            if(sty == null)
              return;
            var elemsty_appeared = $.extend({}, elements_style);
            sty.replace(/([^:;]+):([^:;]+);/g, function(str, name, val) {
              // preparing
              if(individual_style[i + 1] == null)
                individual_style[i + 1] = {};
              // the first styles
              if(i == 0)
                return elements_style[name] = $.trim(val);
              // already individual style
              if(individual_names[name])
                return individual_style[i + 1][name] = $.trim(val);
              // elements style but will be individualized
              if(elements_style[name] && elements_style[name] != $.trim(val)) {
                individual_style[i + 1][name] = $.trim(val);
                individual_names[name] = true;
                for( var j = 1; j < i + 1; j++)
                  if(individual_style[j])
                    individual_style[j][name] = elements_style[name];
                delete elements_style[name], delete elemsty_appeared[name];
              } else if(!elements_style[name] /* && i */) // first appearance
                individual_style[i + 1][name] = $.trim(val);
              else
                // simply same style
                delete elemsty_appeared[name];
            });
            if(Object.keys(elemsty_appeared).length) // exists individualize
              for( var name in elemsty_appeared) {
                for( var j = 1; j <= i; j++)
                  individual_style[j][name] = elemsty_appeared[name];
                delete elements_style[name];
              }
          });
        css_script[this.selector] = elements_style;

        var hasIndividual = false;
        for( var i in individual_style)
          if(individual_style[i] && Object.keys(individual_style[i]).length) {
            hasIndividual = true;
            break;
          }

        if(hasIndividual) {
          var children = this.parent().children();
          for( var i = 1; i < individual_style.length; i++)
            if(individual_style[i]) {
              // CSS selector bug on google chrome
              // if fixed, use ":nth-of-type"
              var idx = children.index(this.eq(i - 1));
              css_script[this.selector + ':nth-child(' + (idx + 1) + ')'] = $xj
                  .crossCss(individual_style[i]);
            }
        }

        // pseudo class styles
        var pseudoes_style = {};
        for( var i in styles) {
          if(/^([\w-]+):([\w-]+)$/.test(i)) {
            if(!pseudoes_style[RegExp.$1])
              pseudoes_style[RegExp.$1] = {};
            pseudoes_style[RegExp.$1][RegExp.$2] = styles[i];
            delete styles[i];
          }
        }
        for( var i in pseudoes_style) {
          pseudoes_style[i] = $xj.crossCss(pseudoes_style[i]);
          if(hasIndividual)
            css_script[this.selector + ':nth-child(n):' + i] = pseudoes_style[i];
          else
            css_script[this.selector + ':' + i] = pseudoes_style[i];
        }
        for( var i in css_script)
          $.extend(css_script[i], styles);

        // set css
        $xj.cssPut(css_script);

        // deset style
        this.removeAttr('style');
      }
      return $css.call(this, styles);
    };
    $.fn.css = ex_css;
  })(window, window.jQuery);

  // emit ready
  var place = 'EXTENDjscss';
  $xj.data('readystatus', place, 'ready'), $xj.trigger('ready', place);

  function cssRead() {
    var i = null, j = null, cssa = {};
    var css_list = document.styleSheets;
    if(css_list)
      for(i = 0; i < css_list.length; i++) {
        var rule_list;
        try { // for security error 1000
          rule_list = (css_list[i].cssRules) ? css_list[i].cssRules
            : css_list[i].rules;
          _CssNo = i;
        } catch(e) {
          continue;
        }
        if(rule_list)
          for(j = 0; j < rule_list.length; j++) {
            if(rule_list[j].selectorText)
              cssa[rule_list[j].selectorText] = {
                index: i,
                subIndex: j,
                style: rule_list[j]
              };
            else
              continue;
          }
      }
    return _Css = cssa;
  }

  function putCss(a) {
    console.warn('putCss will be deplicatied. Use cssPut.');
    this.cssPut(a);
  }

  function cssPut(a, noCross) {
    // e.g. var a={'html':{backgroundColor:bgcolor}} 
    var i = null, j = null;
    if(!a)
      return;
    for(i in a) {
      var exist = _Css[i];
      // TODO check bug ( now, sheets are always increased ? )
      var sheet = exist ? document.styleSheets[exist['index']]
        : document.styleSheets[_CssNo || 0];
      if(!sheet) {
        if(document.createStyleSheet)
          sheet = document.createStyleSheet();
        else {
          var head = document.getElementsByTagName('head')[0];
          if(!head) {
            console.log("cannot set style via cssPut");
            return false;
          } else {
            var sty = document.createElement('style');
            head.appendChild(sty);
            sheet = sty.sheet;
          }
        }
      } else if(exist) {
        // TODO check bug
        var sty = exist.style['style'];
        for(j = 0; j < sty.length; j++) {
          if(!a[i][sty[j]])
            a[i][sty[j]] = sty.cssText.replace(new RegExp('(^|;)' + sty[j]
              + ':([^;]+);'), function(match, cssKey, cssValue) {
              return cssValue;
            });
        }
        if(sheet.deleteRule)
          sheet.deleteRule(exist['subIndex']);
        else if(sheet.removeRule)
          sheet.removeRule(exist['subIndex']);
      }
      /*
      for(var j in a[i]) {
        try {
          // http://www.quirksmode.org/dom/w3c_css.html
          if(sheet.addRule) { // Internet Explorer ,Chrome ,Safari
            sheet.addRule(i, [j, ':', a[i][j]].join(""), 0);
          } else if(sheet.insertRule) { // Firefox, Opera
            sheet.insertRule([i, ' {', j, ':', a[i][j], '}'].join(""), 0);
          }
        } catch(e) {
          console.log(e);
        }
      }*/
      var csses = noCross ? a[i]: xjQuery.JSCSS.crossCss(a[i]), cssStr = "";
      for( var j in csses)
        cssStr += j + ':' + csses[j] + ';';
      try {
        // http://www.quirksmode.org/dom/w3c_css.html
        if(sheet.addRule) { // Internet Explorer ,Chrome ,Safari
          sheet.addRule(i, cssStr);
        } else if(sheet.insertRule) { // Firefox, Opera
          sheet.insertRule([i, ' {', cssStr, '}'].join(""), 0);
        }
      } catch(e) {
        console.log(e);
      }
      cssRead();
    }
  }

});
