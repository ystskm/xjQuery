/*
 *  Create by Y.Sakamoto 2010/08/20
 *  ----------------
 *  NECESSARY ALONE:
 *  	(1) jsonUtil
 *      (2) arrayUtil
 *  ----------------
 */
$xj.extend(xjQuery,'OBJECT', {
	objClone: function(a){
		return $.extend(true,{},a);
	}
    ,keyLimited: function(obj,limit,o){
        if(xjQuery.OBJECT.sizeOf(obj) > limit){
            var o=$.extend({min:null,max:null,sort:true,dirc:true},o);
            obj = xjQuery.OBJECT.asort(obj, null, o['dirc']);
            var keys = xjQuery.OBJECT.keys(obj);
            var i = o['dirc']?0:keys.length-1;
            var limited = {};
            var cnt=0;
            while(keys[i] && cnt < limit){
                if((o['min'] && o['min'] > keys[i])
                   || (o['max'] && o['max'] < keys[i])){
                }else{
                    limited[keys[i]]= obj[keys[i]];
                    cnt++;
                }
                o['dirc']? i++:i--;
            }
            return limited;
        }else
            return xjQuery.OBJECT.asort(obj, null, o['dirc']);
    }
});
