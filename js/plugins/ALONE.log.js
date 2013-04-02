$xj.add('LOG', {
  handleError: function(e, callbackfn) {
    var mes = null;
    if($xj.isError(e)) {
      mes = [e.name, ' : ', e.message].join("");
      if(e.stack)
        xjQuery.LOG.writeConsole(e.stack);
    } else if($xj.isString(e))
      mes = e;
    else
      'unexpected_error_msg';
    xjQuery.LOG.writeConsole(mes);
    if(callbackfn && e)
      callbackfn(mes, e.name, e.message, e.stack);
  },
  writeConsole: function(mes) {
    console.log(mes);
  },
  errorConsole: function(mes, error) {
    console.error(mes);
    if(error && error.stack)
      console.error(error.stack);
  }
});
