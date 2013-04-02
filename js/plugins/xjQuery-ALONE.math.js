$(function() {

  $xj.add('MATH', {
    gcd: function(x, y) {
      if(y == 0)
        return x;
      else
        return xjQuery.MATH.gcd(y, x % y);
    },
    floatVal: function(n, d) {
      if(!n)
        return n;
      var exp = 0, v = Math.abs(n), flag = n < 0 ? -1: 1;
      while(v >= 10)
        v /= 10, exp += 1;
      if(v != 0)
        while(v < 1)
          v *= 10, exp -= 1;
      var m = Math.pow(10, d);
      return flag * (Math.round(v * m) / m) * Math.pow(10, exp);
    },
    round: function(n, decimal, operation) {
      if(!decimal)
        decimal = 0;
      if(!operation)
        operation = "round";
      n = parseFloat(n);
      var exp = Math.pow(10, Math.abs(decimal));
      return (decimal > 0) ? ((operation == "ceil") ? n > 0 ? Math
          .ceil(n * exp): Math.floor(n * exp): (operation == "floor") ? n > 0
        ? Math.floor(n * exp): Math.ceil(n * exp): Math.round(n * exp))
        / exp: ((operation == "ceil") ? n > 0 ? Math.ceil(n / exp): Math
          .floor(n / exp): (operation == "floor") ? n > 0 ? Math.floor(n / exp)
        : Math.ceil(n / exp): Math.round(n / exp))
        * exp;
    }
  });
});
