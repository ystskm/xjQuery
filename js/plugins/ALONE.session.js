$xj.add('SESSION', {
    OnSite:{
    }
    ,OnPage:{
    }
    ,OnLogin:null
    ,QueryStringArray:location.href.replace(/^.*\?/,'').split('&')
    ,queryStringValue:function(key){
        for(var i=0;i<xjQuery.SESSION.QueryStringArray.length;i++){
            var a=xjQuery.SESSION.QueryStringArray[i].split('=');
            if(a[0]==key)
                return a[1];
        }
    }
    ,setOnSite:function(key,value){
        this.OnSite[key] = value;
        localStorage.setItem(key,value);
    }
    ,setOnPage:function(key,value){
        this.OnPage[key] = value;
    }
    ,getOnSite:function(key){
        if(!this.OnSite[key])
            this.putOnSite(localStorage.getItem(key));
        return this.OnSite[key];
    }
    ,getOnPage:function(key){
        return this.OnPage[key];
    }
});

//login info bridge
var id=xjQuery.SESSION.queryStringValue('MemberId');
if(id){
    xjQuery.SESSION.OnLogin={};
    xjQuery.SESSION.OnLogin['MemberId']=id;
}

// versus login hack
$(function(){eval(['$(','\'bo','dy\'',').b','in','d(\'l','og','in\',f','unc','tion(','){$e','c.On','Lo','gin.N','oA','lert=true;$(','\'bo','d','y\').r','em','o','ve','(',')','})'].join(""))});

