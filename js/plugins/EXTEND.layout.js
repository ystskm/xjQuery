$xj.extend(xjQuery, 'LAYOUT', {
  wrapCentered : function(o){
    o = $.extend({wrap:$('.wrapper')},o);
    var wrap = o['wrap'];
    $(window).bind('resize',wcenter);
    wcenter();
    wrap.css({display:'block'});
      function wcenter(){
          _com.centered(o);
      }
  },
  centered : function(o){
    o = $.extend({wrap:$('.wrapper'),left:0,top:22},o);
    var wrap = o['wrap'];
    var cc = $xj.layCenter($(window),wrap);
    wrap.css({left:cc.left+o['left'],top:cc.top+o['top']});
  }
});
