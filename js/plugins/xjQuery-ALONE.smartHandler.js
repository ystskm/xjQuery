$(function() {
  $xj.add('SmartHandler', {
    isSelfEvent: function(e) {
      return e.target == e.currentTarget;
    },
    isInnerEvent: function(e, selector) {
      var prt = $(e.target).parents();
      for( var i = 0; i < prt.length; i++)
        if(prt.eq(i).is(selector))
          return true;
      return false;
    },
    sPropagation: function(e) {
      if(window.addEventListener) {
        e.stopPropagation();
      } else { //if IElike
        e.cancelBubble = true;
      }
    },
    pDefault: function(e) {
      if(window.addEventListener) {
        e.preventDefault();
      } else { //if IElike
        e.returnValue = false;
      }
    },
    clearEvent: function(e) {
      xjQuery.SmartHandler.pDefault(e);
      xjQuery.SmartHandler.sPropagation(e);
    }
  });
  $.each(['mousewheel', 'scroll'], function(i, name) {
    jQuery.fn[name] = function(fn) {
      return fn ? this.bind(name, fn): this.trigger(name);
    };
    if(jQuery.attrFn) {
      jQuery.attrFn[name] = true;
    }
  });
  $.each(
    ['touchstart', 'touchmove', 'touchend', 'touchcancel', 'gesturestart'],
    function(i, name) {
      jQuery.fn[name] = function(fn) {
        return fn ? this.bind(name, fn): this.trigger(name);
      };
      if(jQuery.attrFn) {
        jQuery.attrFn[name] = true;
      }
    });

  /*
  $.event.special.mousewheel = {
      setup: function() {
          if (this.addEventListener) {
              this.addEventListener("DOMMouseScroll", func, false)
              this.addEventListener("mousewheel", func, false)
          } else this.onmousewheel = func;
      },
      teardown: function() {
          if (this.removeEventListener) {
              this.removeEventListener("DOMMouseScroll", func, false)
              this.removeEventListener("mousewheel", func, false)
          } else this.onmousewheel = null;
      }
  };*/
  /*
  $.fn.mousewheel = function(e) { return e? this.bind("mousewheel", e): this.trigger("mousewheel")};
  $.fn.unmousewheel = function(e) { return this.unbind("mousewheel", e)};
  */
});
