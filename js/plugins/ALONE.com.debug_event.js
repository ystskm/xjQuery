// foonyah debug function set ($.event handler custamize) >>
;
window.$ || (function() {
  var eve = jQuery.event, handle = eve.handle, counter = 0;
  var debugbox_style = $.extend({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: 300
  }, foonyah.DebugboxStyle);
  var debug_style = $.extend({
    position: 'relative',
    margin: '3px',
    fontSize: '12px'
  }, foonyah.DebugStyle);
  var ds = debug_setting = $.extend({
    boxId: 'errBox',
    appendTo: 'body',
    maxline: 0,
    stackAppearance: function(e) {
      return e.messaget + '<br/>' + e.stack.replace(/ at/g, '<br/> at');
    }
  }, foonyah.DebugSetting);
  var id = ds.boxId;
  if(foonyah.Minified !== true && foonyah.ShowDebug) {
    foonyah.ShowDebug = parseInt(foonyah.ShowDebug) || 1;
    $.extend(eve, {
      handle: handler
    });
    var con = console;
    $.extend(con, {
      log: handleConsole,
      error: handleConsole
    });
    $(document).ready(function() {
      $(ds.appendTo).append($('<div id="' + id + '"/>').css(debugbox_style));
    });
  }
  function handler() {
    try {
      handle.apply(this, arguments);
    } catch(e) {
      handleError(e);
    }
  };
  function handleError(e) {
    messageAppender(ds.stackAppearance(e));
  }
  function handleConsole(mes) {
    messageAppender(mes);
  }
  function messageAppender(mes) {
    if(ds.maxline && (counter = ++counter & 0xffff) > ds.maxline) {
      $('#' + id).eq(0).remove();
    }
    $('#' + id).append($('<div/>').html(mes).css(debug_style));
  }
})();
//<< function window.debug() is available.