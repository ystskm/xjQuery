$(function() {
  $xj.add('TIME', {
    clientUnixMSec: function() {
      return new Date().getTime();
    },
    clientUnixSec: function(o) {
      var op = $.extend({
        frac: 'round',
        time: 'GMT'
      }, o);
      var dobj = new Date(), ctime;
      switch(op['time']) {
      case 'GMT':
        ctime = dobj.getTime() - dobj.getTimezoneOffset() * 60 * 1000;
        break;
      default:
        ctime = dobj.getTime();
      }
      return Math[op['frac']](ctime / 1000);
    },
    calcUnixSec: function(us1, us2, decimal, minus) {
      if(!decimal)
        decimal = 8;
      minus = (minus) ? -1: 1;
      var usa1 = us1.split('.');
      var usa2 = us2.split('.');
      var uptoInt = 0;
      var msResult = parseFloat(usa1[1]) + minus * parseFloat(usa2[1]);
      if(msResult < 0) {
        uptoInt = -1;
        msResult = msResult * (-1);
      };
      msResult = msResult.toString();
      if(msResult.length > decimal) {
        uptoInt = 1;
        msReuslt = msReuslt.substring(1, decimal - 1);
      };
      while(msResult.length < decimal)
        msResult = '0' + msResult.toString();
      return [parseInt(usa1[0]) + parseInt(minus * usa2[0]) + uptoInt, '.',
        msResult].join("");
    }
  });
});