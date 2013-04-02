/*
 *  Create by Y.Sakamoto 2010/08/20
 *  ----------------
 *  NECESSARY ALONE:
 *  	(1) arrayUtil
 *  ----------------
 */
$xj.extend(xjQuery,'MATH', {
    _MathType: {
        sin: 1,
        cos: 1,
        tan: 1,
        asin: 1,
        acos: 1,
        atan: 1,
        atan2: 2,
        pi: -1,
        log: 1,
        pow: 2,
        sqrt: 1,
        e: -1,
        ln10: -1,
        ln2: -1,
        log10e: -1,
        log2e: -1,
        sqrt1_2: -1,
        sqrt2: -1,
        abs: 1,
        floor: 1,
        ceil: 1,
        round: 1,
        max: 2,
        min: 2,
        random: 0,
        age: -2,
        ydiff: -2,
        mdiff: -2,
        wdiff: -2,
        ddiff: -2,
        hdiff: -2,
        fix: -2,
        amount: -2,
        tax: -2,
        taxable: -2,
        tax_i: -2,
        tax_e: -2,
        unixtime: -2,
        now: -3,
        count: -4,
        sum: -4,
        match: -9,
        selval: -9
    },
    mathType: function(func) {
        return xjQuery.MATH._MathType[func];
    },
    scalarCalc: function() {
        var args = Array.prototype.slice.call(arguments);
        var func = args.shift();
        if(args.length == 0)
            return evaluation(func);
        switch(xjQuery.MATH.mathType(func)) {
        case -9:
            switch(func) {
            case "selkey":
                return $xj.firstKey(args[0]);
            case "selval":
                return $xj.firstVal(args[0]);
            }
        case -3:
            switch(func) {
            case "now":
                return now();
            }
        case -2:
            if(args[0] === undefined)
                return undefined;
            switch(func) {
            case "age":
                return age(args[0]);
            case "ydiff":
                return ydiff(args[0]);
            case "mdiff":
                return mdiff(args[0]);
            case "wdiff":
                return wdiff(args[0]);
            case "ddiff":
                return ddiff(args[0]);
            case "hdiff":
                return hdiff(args[0]);
            case "fix":
                return fix(args[0]);
            case "amount":
                return amount(args[0]);
            case "tax":
                return tax(args[0]);
            case "taxable":
                return taxable(args[0]);
            case "tax_i":
                return tax_i(args[0]);
            case "tax_e":
                return tax_e(args[0]);
            case "unixtime":
                return unixtime(args[0], args[1]);
            case "match":
                return match(args[0], args[1]);
            }
            break;
        case -1:
            return evaluation("Math." + func.toUpperCase());
        case 0:
            return evaluation("Math." + func.toLowerCase()
                              + "()");
        case 1:
            switch(func) {
            case "round":
                return $xj.round(args[0], args[1], "round");
            case "floor":
                return $xj.round(args[0], args[1], "floor");
            case "ceil":
                return $xj.round(args[0], args[1], "ceil");
            }
            break;
        default:
            return evaluation("Math." + func.toLowerCase()
                              + "("
                              + args[0]
                              + ")");
        }
        function evaluation(str) {
            if(str == "0/0")
                return 0;
            var val = eval(str);
            if(isNaN(val) || val === Infinity)
                return 0;
        }
        function _sepa2(v) {
            v = v.split(",");
            return (v.length > 1) ? [parseInt(v[0], 10), parseInt(v[1], 10)]: (v.length == 1) ? [
                    parseInt(v[0], 10),
                    now()]: [now(), now()];
        }
        function _date(v) {
            return $xj.clientNow();
        }
        function selval(v) {
            return;
        }
        function match(v, reg) {
            var execReg = new RegExp(reg.replace(/\|\|/g, '\|'));
            return v.match(execReg) || false;
        }
        function unixtime(v, opt) {
            opt = opt ? opt: 'ymd';
            var val = null, y = null, m = null, d = null; 
            switch(opt) {
            case 'ym':
                val = v.toString().match(/(\D*)(\d{1,4})\D*(\d{1,2})\D*/);
                if(!val)
                    return "";
                y = val[2];
                m = val[3];
                break;
            case 'md':
                val = v.toString().match(/\D*(\d{1,2})\D*(\d{1,2})\D*/);
                if(!val)
                    return "";
                m = val[1];
                d = val[2];
                break;
            case 'y':
                val = v.toString().match(/(\D*)(\d{1,4})\D*/);
                if(!val)
                    return "";
                y = val[2];
                break;
            case 'm':
                val = v.toString().match(/\D*(\d{1,2})\D*/);
                if(!val)
                    return "";
                m = val[1];
                break;
            case 'd':
                val = v.toString().match(/\D*(\d{1,2})\D*/);
                if(!val)
                    return "";
                d = val[1];
                break;
            default:
                val = v.toString().match(/(\D*)(\d{1,4})\D*(\d{1,2})\D*(\d{1,2})\D*/);
                if(!val)
                    return "";
                y = val[2];
                m = val[3];
                d = val[4];
            }
            if(/y/.test(opt))
                y = (/h|平成/.test(val[1])) ? parseInt(y) + 1988
                        : (/s|昭和/.test(val[1])) ? parseInt(y) + 1925
                                : (/t|大正/.test(val[1])) ? parseInt(y) + 1911
                                        : (/m|明治/.test(val[1])) ? parseInt(y) + 1867: y;
            return $xj.date2unixSec([y || 1970, m || 01, d || 01].join("/"));
        }
        function now() {
            return Math.round((new Date()) / 1000)
        }
        function ydiff(v) {
            v = _sepa2(v);
            var b = _date(v[0]), c = _date(v[1]);
            return c[0] - b[0]
                   + ((c[1] > b[1] || c[1] == b[1] && c[2] >= b[2]) ? 0: -1)
        }
        function mdiff(v) {
            v = _sepa2(v);
            var b = _date(v[0]), c = _date(v[1]);
            return (c[0] - b[0]) * 12
                   + (c[1] - b[1])
                   + (c[2] >= b[2] ? 0: -1);
        }
        function wdiff(v) {
            v = _sepa2(v);
            return Math.floor((v[1] - v[0]) / 86400 / 7)
        }
        function ddiff(v) {
            v = _sepa2(v);
            return Math.floor((v[1] - v[0]) / 86400)
        }
        function hdiff(v) {
            v = _sepa2(v);
            return Math.floor((v[1] - v[0]) / 3600)
        }
        function age(v) {
            var b = _date(parseInt(v, 10)), c = _date(now());
            return c[0] - b[0]
                   + ((c[1] > b[1] || c[1] == b[1] && c[2] >= b[2]) ? 0: -1)
        }
        function _sepa3(v) {
            v = v.split(",");
            return [
                    parseFloat(v[0]),
                    (v.length > 1) ? parseInt(v[1], 10): 0,
                    (v.length > 2) ? parseInt(v[2]): 0];
        }
        function _sepa4(v) {
            v = v.split(",");
            return [
                    parseFloat(v[0]),
                    parseFloat(v[1]),
                    (v.length > 2) ? parseInt(v[2], 10): 0,
                    (v.length > 3) ? parseInt(v[3]): 0];
        }
        function _sepa5(v) {
            v = v.split(",");
            return [
                    parseInt(v[0], 10),
                    parseFloat(v[1]),
                    parseFloat(v[2]),
                    (v.length > 3) ? parseInt(v[3]): 0,
                    (v.length > 4) ? parseInt(v[4]): 0];
        }
        function _fix(v0, v1, v2) {
            var d = Math.pow(10, Math.abs(v2)), v = Math.abs(v0), flag = v0 < 0 ? -1: 1;
            switch(v1) {
            case 0:
                return flag * (v2 < 0 ? Math.floor(v / d) * d: Math.floor(v * d) / d);
            case 1:
                return flag * (v2 < 0 ? Math.round(v / d) * d: Math.round(v * d) / d);
            case 2:
                return flag * (v2 < 0 ? Math.ceil(v / d) * d: Math.ceil(v * d) / d);
            }
        }
        function _taxi(v0, v1, v2, v3) {
            return _fix(v0 * v1
                        / (v1 + 1), v2, v3)
        }
        function _taxe(v0, v1, v2, v3) {
            return _fix(v0 * v1, v2, v3)
        }
        function tax_i(v) {
            v = _sepa4(v);
            return _taxi(v[0], v[1], v[2], v[3])
        }
        function tax_e(v) {
            v = _sepa4(v);
            return _taxe(v[0], v[1], v[2], v[3])
        }
        function tax(v) {
            v = _sepa5(v);
            switch(v[0]) {
            case 0:
                return 0;
            case 1:
                return _taxi(v[1], v[2], v[3], v[4]);
            case 2:
                return _taxe(v[1], v[2], v[3], v[4]);
            }
        }
        function taxable(v) {
            v = _sepa5(v);
            switch(v[0]) {
            case 0:
                return 0;
            case 1:
                return v[1] - _taxi(v[1], v[2], v[3], v[4]);
            case 2:
                return v[1];
            }
        }
        function amount(v) {
            v = _sepa5(v);
            switch(v[0]) {
            case 0:
                return v[1];
            case 1:
                return v[1];
            case 2:
                return v[1] + _taxe(v[1], v[2], v[3], v[4]);
            }
        }
        function fix(v) {
            v = _sepa3(v);
            return _fix(v[0], v[1], v[2])
        }
    },
    arrayCalc: function(func, a) {
        if($xj.isArray(a))
            return undefined;
        var sum = 0, max = a[0], min = a[0], len = a.length, i;
        for(i = 0; i < len; i++) {
            sum += (a[i] || 0);
            max = max > a[i] ? max: a[i];
            min = min < a[i] ? min: a[i];
        }
        switch(func) {
        case "count":
            return len;
        case "min":
            return min;
        case "max":
            return max;
        case "sum":
            return sum;
        case "average":
            return sum / len;
        case "sigma":
            var avr = sum / len, sigma = 0;
            for(i = 0; i < len; i++)
                sigma += (a[i] - avr) * (a[i] - avr);
            return sigma / (len - 1);
        }
        return undefined;
    }
});
