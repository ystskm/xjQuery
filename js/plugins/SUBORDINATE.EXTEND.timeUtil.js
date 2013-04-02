/*
 *  Create by Y.Sakamoto 2010/08/20
 *  ----------------
 *  NECESSARY LIB:
 *      (1) dateformat
 *  NECESSARY COMPLEX:
 *  	(1) ajax
 *  ----------------
 */
// >> for required
var msg1='##### xjQuery Error ##### No required module : ';
var msg2=' for SUBORDINATE.EXTEND.timeUtil.js';
function em(m){
    return [msg1,m,msg2].join("");
}
if(!xjQuery.AJAX)
    throw new Error(em('xjQuery.AJAX'));
if(!DateFormat || !DateFormat.prototype)
    throw new Error(em('DateFormat'));
// <<
$xj.extend(xjQuery,'TIME', {
    timezoneAdjustSec:function(type){
        var offset = new Date().getTimezoneOffset()*(-1);
        var h = Math.floor(offset / 60);
        var m = offset - 60 * h;
        switch(type){
        case 'assoc':
            return {hour:h,minute:m};
        case 'string':
            return [$xj.zeroSupply(h,2),$xj.zeroSupply(m,2),'00'].join(":");
        default:
            return offset*60;
        }
    }
	,serverUnixSec: function(callbackfn){
		$xj.server.getTime(function(res){
			if(callbackfn) callbackfn(res);
		});
	}
	,serverMicroTime: function(callbackfn){
		var res=$xj.server.getMicroTime();
		return [res[1],'.',res[0]].join("").replace(/[\r|\n|\r\n]/g,'');
	}
    ,date2unixSec: function (d, t) {
        if (!d || d=="") 
            d = '1970/01/01';
        var da = d.match(/\D*(\d{1,4})\D*(\d{1,2})\D*(\d{1,2})\D*/);
        var dout=[];
        dout.push($xj.zeroSupply(da?da[1]:null || '1970',4));
        dout.push($xj.zeroSupply(da?da[2]:null || '01',2));
        dout.push($xj.zeroSupply(da?da[3]:null || '01',2));
        if (!t || t=="") 
            t=xjQuery.TIME.timezoneAdjustSec('string');
        var ta = t.match(/\D*(\d{1,4})\D*(\d{1,2})\D*(\d{1,2})\D*/);
        var tout=[];
        tout.push($xj.zeroSupply(ta?ta[1]:null || xjQuery.TIME.timezoneAdjustSec('array')['hour']  ,2));
        tout.push($xj.zeroSupply(ta?ta[2]:null || xjQuery.TIME.timezoneAdjustSec('array')['minute'],2));
        tout.push($xj.zeroSupply(ta?ta[3]:null || '00',2));
        var umsec = new Date(dout.join("/") + ' ' + tout.join(":")).getTime();
        return isNaN(umsec)? NaN: Math.round(umsec / 1000);
    }
	,unixSec2date: function (usec,o) {
	    var usec = parseInt(usec);
		var o = $.extend({format:'yyyy/MM/dd',localize:null},o);
		if (!usec && usec!==0) 
			return '';
		var d;
		switch(o['localize']){
		case true:
			d = new Date((usec + xjQuery.TIME.timezoneAdjustSec()) * 1000);
			break;
		case false:
			d = new Date((usec - xjQuery.TIME.timezoneAdjustSec()) * 1000);
			break;
		default:
			d = new Date(usec * 1000);
		}
    	var dateFormat = new DateFormat(o['format'],[$xj.word('yearunit'),$xj.word('monthunit'),$xj.word('dayunit'),$xj.word('hourunit'),$xj.word('minuteunit'),$xj.word('secunit')]);
    	return dateFormat.format(d);
	}
	,unixSec2time: function (usec,o) {
        var usec = parseInt(usec);
		var o = $.extend({format:'HH:mm:ss',localize:null},o);
		if (!usec && usec!==0) 
			return '';
		var d;
		switch(o['localize']){
		case true:
			d = new Date((usec + xjQuery.TIME.timezoneAdjustSec()) * 1000);
			break;
		case false:
			d = new Date((usec - xjQuery.TIME.timezoneAdjustSec()) * 1000);
			break;
		default:
			d = new Date(usec * 1000);
		}
    	var dateFormat = new DateFormat(o['format']);
    	return dateFormat.format(d)
	}
	,unixSec2datim: function (u,df,tf,spr) {
        var usec = parseInt(usec);
		if(!spr && spr!=='') spr=' ';
		return $xj.unixSec2date(u,{format:df})+spr+$xj.unixSec2time(u,{format:tf});
	}
	,unixSec2datimAssoc: function (usec) {
        var usec = parseInt(usec);
		return {date:$xj.unixSec2date(usec),time:$xj.unixSec2time(usec)};
	}
	,unixSec2LocaleDate:function(usec,lang){
        var usec = parseInt(usec);
	    var lang = lang || $xj.Language;
	    switch(lang){
	    case 'ja':
        default:
            return 
	    }
	}
	,year2era: function(year,option){
		var today=new Date();
		var Y=today.getYear();
		if(Y<2000) Y=Y+1900;
		var baseNG=(option)? option.baseNG:null;
		var esc_myYR=Math.round(year);
		/*
		if (baseNG == "nengo") {
			if ((esc_myYR > -660)&&(esc_myYR <= -584)) document.myFORM.myRESULT.value=\"神武天皇\"+(esc_myYR+660
			if ((esc_myYR > -584)&&(esc_myYR <= -581)) document.myFORM.myRESULT.value=\"手研耳命\"+(esc_myYR+584
			if ((esc_myYR > -581)&&(esc_myYR <= -548)) document.myFORM.myRESULT.value=\"綏靖天皇\"+(esc_myYR+581
			if ((esc_myYR > -548)&&(esc_myYR <= -510)) document.myFORM.myRESULT.value=\"安寧天皇\"+(esc_myYR+548
			if ((esc_myYR > -510)&&(esc_myYR <= -476)) document.myFORM.myRESULT.value=\"懿徳天皇\"+(esc_myYR+510
			if (esc_myYR == -475) document.myFORM.myRESULT.value=\"孝昭天皇治世前1\";
			if ((esc_myYR > -475)&&(esc_myYR <= -392)) document.myFORM.myRESULT.value=\"孝昭天皇\"+(esc_myYR+475
			if ((esc_myYR > -392)&&(esc_myYR <= -290)) document.myFORM.myRESULT.value=\"孝安天皇\"+(esc_myYR+392
			if ((esc_myYR > -290)&&(esc_myYR <= -214)) document.myFORM.myRESULT.value=\"孝霊天皇\"+(esc_myYR+290
			if ((esc_myYR > -214)&&(esc_myYR <= -157)) document.myFORM.myRESULT.value=\"孝元天皇\"+(esc_myYR+214
			if ((esc_myYR > -157)&&(esc_myYR <= -97)) document.myFORM.myRESULT.value=\"開化天皇\"+(esc_myYR+157
			if ((esc_myYR > -97)&&(esc_myYR <= -29)) document.myFORM.myRESULT.value=\"崇神天皇\"+(esc_myYR+97
			if ((esc_myYR > -29)&&(esc_myYR<=70)) document.myFORM.myRESULT.value=\"垂仁天皇\"+(esc_myYR+29
			if ((esc_myYR>70)&&(esc_myYR<=130)) document.myFORM.myRESULT.value=\"景行天皇\"+(esc_myYR-70
			if ((esc_myYR>130)&&(esc_myYR<=187)) document.myFORM.myRESULT.value=\"成務天皇\"+(esc_myYR-130
			if ((esc_myYR>187)&&(esc_myYR<=190)) document.myFORM.myRESULT.value=\"成務天皇\"+(esc_myYR-130)+\", 卑弥呼\"+(esc_myYR-187
			if (esc_myYR==191) document.myFORM.myRESULT.value=\"仲哀天皇治世前1\"+\", 卑弥呼\"+(esc_myYR-187
			if ((esc_myYR>191)&&(esc_myYR<=200)) document.myFORM.myRESULT.value=\"仲哀天皇\"+(esc_myYR-191)+\", 卑弥呼\"+(esc_myYR-187
			if ((esc_myYR>200)&&(esc_myYR<=248)) document.myFORM.myRESULT.value=\"神功皇后\"+(esc_myYR-200)+\", 卑弥呼\"+(esc_myYR-187
			if ((esc_myYR>248)&&(esc_myYR<=267)) document.myFORM.myRESULT.value=\"神功皇后\"+(esc_myYR-200)+\", 壱与\"+(esc_myYR-248
			if ((esc_myYR>267)&&(esc_myYR<=269)) document.myFORM.myRESULT.value=\"神功皇后\"+(esc_myYR-200
			if ((esc_myYR>269)&&(esc_myYR<=310)) document.myFORM.myRESULT.value=\"応神天皇\"+(esc_myYR-269
			if ((esc_myYR>310)&&(esc_myYR<=312)) document.myFORM.myRESULT.value=\"菟道稚郎子\"+(esc_myYR-310
			if ((esc_myYR>312)&&(esc_myYR<=399)) document.myFORM.myRESULT.value=\"仁徳天皇\"+(esc_myYR-312
			if ((esc_myYR>399)&&(esc_myYR<=405)) document.myFORM.myRESULT.value=\"履中天皇\"+(esc_myYR-399
			if ((esc_myYR>405)&&(esc_myYR<=410)) document.myFORM.myRESULT.value=\"反正天皇\"+(esc_myYR-405
			if (esc_myYR==411) document.myFORM.myRESULT.value=\"允恭天皇治世前1\";
			if ((esc_myYR>411)&&(esc_myYR<=453)) document.myFORM.myRESULT.value=\"允恭天皇\"+(esc_myYR-411
			if ((esc_myYR>453)&&(esc_myYR<=456)) document.myFORM.myRESULT.value=\"安康天皇\"+(esc_myYR-453
			if ((esc_myYR>456)&&(esc_myYR<=479)) document.myFORM.myRESULT.value=\"雄略天皇\"+(esc_myYR-456
			if ((esc_myYR>479)&&(esc_myYR<=483)) document.myFORM.myRESULT.value=\"清寧天皇\"+(esc_myYR-479
			if (esc_myYR==484) document.myFORM.myRESULT.value=\"清寧天皇\"+(esc_myYR-479)+\", 飯豊皇女\"+(esc_myYR-479
			if ((esc_myYR>484)&&(esc_myYR<=487)) document.myFORM.myRESULT.value=\"顕宗天皇\"+(esc_myYR-484
			if ((esc_myYR>487)&&(esc_myYR<=498)) document.myFORM.myRESULT.value=\"仁賢天皇\"+(esc_myYR-487
			if ((esc_myYR>498)&&(esc_myYR<=506)) document.myFORM.myRESULT.value=\"武烈天皇\"+(esc_myYR-498
			if ((esc_myYR>506)&&(esc_myYR<=531)) document.myFORM.myRESULT.value=\"継体天皇\"+(esc_myYR-506
			if (esc_myYR==532) document.myFORM.myRESULT.value=\"安閑天皇治世前2\"+\", [二朝並立] 欽明天皇\"+(esc_myYR-531
			if (esc_myYR==533) document.myFORM.myRESULT.value=\"安閑天皇治世前1\"+\", [二朝並立] 欽明天皇\"+(esc_myYR-531
			if ((esc_myYR>533)&&(esc_myYR<=535)) document.myFORM.myRESULT.value=\"安閑天皇\"+(esc_myYR-533)+\", [二朝並立] 欽明天皇\"+(esc_myYR-531
			if ((esc_myYR>535)&&(esc_myYR<=539)) document.myFORM.myRESULT.value=\"宣化天皇\"+(esc_myYR-535)+\", [二朝並立] 欽明天皇\"+(esc_myYR-531
			if ((esc_myYR>539)&&(esc_myYR<=571)) document.myFORM.myRESULT.value=\"欽明天皇\"+(esc_myYR-539
			if ((esc_myYR>571)&&(esc_myYR<=585)) document.myFORM.myRESULT.value=\"敏達天皇\"+(esc_myYR-571
			if ((esc_myYR>585)&&(esc_myYR<=587)) document.myFORM.myRESULT.value=\"用明天皇\"+(esc_myYR-585
			if ((esc_myYR>587)&&(esc_myYR<=592)) document.myFORM.myRESULT.value=\"崇峻天皇\"+(esc_myYR-587
			if ((esc_myYR>592)&&(esc_myYR<=628)) document.myFORM.myRESULT.value=\"推古天皇\"+(esc_myYR-592
			if ((esc_myYR>628)&&(esc_myYR<=641)) document.myFORM.myRESULT.value=\"舒明天皇\"+(esc_myYR-628
			if ((esc_myYR>641)&&(esc_myYR<=644)) document.myFORM.myRESULT.value=\"皇極天皇\"+(esc_myYR-641
			if (esc_myYR==645) document.myFORM.myRESULT.value=\"皇極天皇\"+(esc_myYR-641)+\", 孝徳天皇\"+(esc_myYR-644)+\", 大化\"+(esc_myYR-644
			if ((esc_myYR>645)&&(esc_myYR<=649)) document.myFORM.myRESULT.value=\"孝徳天皇\"+(esc_myYR-644)+\", 大化\"+(esc_myYR-644
			if (esc_myYR==650) document.myFORM.myRESULT.value=\"孝徳天皇\"+(esc_myYR-644)+\", 大化\"+(esc_myYR-644)+\", 白雉\"+(esc_myYR-649
			if ((esc_myYR>650)&&(esc_myYR<=654)) document.myFORM.myRESULT.value=\"孝徳天皇\"+(esc_myYR-644)+\", 白雉\"+(esc_myYR-649
			if ((esc_myYR>654)&&(esc_myYR<=661)) document.myFORM.myRESULT.value=\"斉明天皇\"+(esc_myYR-654
			if ((esc_myYR>661)&&(esc_myYR<=671)) document.myFORM.myRESULT.value=\"天智天皇\"+(esc_myYR-661
			if (esc_myYR==672) document.myFORM.myRESULT.value=\"弘文\"+(esc_myYR-671)+\", 天武\"+(esc_myYR-671)+\", [寺社縁起] 白鳳\"+(esc_myYR-671
			if ((esc_myYR>672)&&(esc_myYR<=685)) document.myFORM.myRESULT.value=\"弘文\"+(esc_myYR-671)+\", 天武\"+(esc_myYR-671)+\", [寺社縁起] 白鳳\"+(esc_myYR-671
			if (esc_myYR==686) document.myFORM.myRESULT.value=\"天武天皇\"+(esc_myYR-671)+\", 朱鳥\"+(esc_myYR-685
			if ((esc_myYR>686)&&(esc_myYR<=696)) document.myFORM.myRESULT.value=\"持統天皇\"+(esc_myYR-686
			if (esc_myYR==697) document.myFORM.myRESULT.value=\"持統天皇\"+(esc_myYR-686)+\", 文武天皇\"+(esc_myYR-696
			if ((esc_myYR>697)&&(esc_myYR<=700)) document.myFORM.myRESULT.value=\"文武天皇\"+(esc_myYR-696
			if ((esc_myYR>700)&&(esc_myYR<=703)) document.myFORM.myRESULT.value=\"文武天皇\"+(esc_myYR-696)+\", 大宝\"+(esc_myYR-700
			if (esc_myYR==704) document.myFORM.myRESULT.value=\"文武天皇\"+(esc_myYR-696)+\", 大宝\"+(esc_myYR-700)+\", 慶雲\"+(esc_myYR-703
			if ((esc_myYR>704)&&(esc_myYR<=707)) document.myFORM.myRESULT.value=\"文武天皇\"+(esc_myYR-696)+\", 慶雲\"+(esc_myYR-703
			if (esc_myYR==708) document.myFORM.myRESULT.value=\"慶雲\"+(esc_myYR-703)+\", 和銅\"+(esc_myYR-707
			if ((esc_myYR>708)&&(esc_myYR<=714)) document.myFORM.myRESULT.value=\"和銅\"+(esc_myYR-707
			if (esc_myYR==715) document.myFORM.myRESULT.value=\"和銅\"+(esc_myYR-707)+\", 霊亀\"+(esc_myYR-714
			if ((esc_myYR>715)&&(esc_myYR<=716)) document.myFORM.myRESULT.value=\"霊亀\"+(esc_myYR-714
			if (esc_myYR==717) document.myFORM.myRESULT.value=\"霊亀\"+(esc_myYR-714)+\", 養老\"+(esc_myYR-716
			if ((esc_myYR>717)&&(esc_myYR<=723)) document.myFORM.myRESULT.value=\"養老\"+(esc_myYR-716
			if (esc_myYR==724) document.myFORM.myRESULT.value=\"養老\"+(esc_myYR-716)+\", 神亀\"+(esc_myYR-723
			if ((esc_myYR>724)&&(esc_myYR<=728)) document.myFORM.myRESULT.value=\"神亀\"+(esc_myYR-723
			if (esc_myYR==729) document.myFORM.myRESULT.value=\"神亀\"+(esc_myYR-723)+\", 天平\"+(esc_myYR-728
			if ((esc_myYR>729)&&(esc_myYR<=748)) document.myFORM.myRESULT.value=\"天平\"+(esc_myYR-728
			if (esc_myYR==749) document.myFORM.myRESULT.value=\"天平\"+(esc_myYR-728)+\", 天平感宝\"+(esc_myYR-748)+\", 天平勝宝\"+(esc_myYR-748
			if ((esc_myYR>749)&&(esc_myYR<=756)) document.myFORM.myRESULT.value=\"天平勝宝\"+(esc_myYR-748
			if (esc_myYR==757) document.myFORM.myRESULT.value=\"天平勝宝\"+(esc_myYR-748)+\", 天平宝字\"+(esc_myYR-756
			if ((esc_myYR>757)&&(esc_myYR<=764)) document.myFORM.myRESULT.value=\"天平宝字\"+(esc_myYR-756
			if (esc_myYR==765) document.myFORM.myRESULT.value=\"天平宝字\"+(esc_myYR-756)+\", 天平神護\"+(esc_myYR-764
			if ((esc_myYR>765)&&(esc_myYR<=766)) document.myFORM.myRESULT.value=\"天平神護\"+(esc_myYR-764
			if (esc_myYR==767) document.myFORM.myRESULT.value=\"天平神護\"+(esc_myYR-764)+\", 神護景雲\"+(esc_myYR-766
			if ((esc_myYR>767)&&(esc_myYR<=769)) document.myFORM.myRESULT.value=\"神護景雲\"+(esc_myYR-766
			if (esc_myYR==770) document.myFORM.myRESULT.value=\"神護景雲\"+(esc_myYR-766)+\", 宝亀\"+(esc_myYR-769
			if ((esc_myYR>770)&&(esc_myYR<=780)) document.myFORM.myRESULT.value=\"宝亀\"+(esc_myYR-769
			if (esc_myYR==781) document.myFORM.myRESULT.value=\"宝亀\"+(esc_myYR-769)+\", 天応\"+(esc_myYR-780
			if (esc_myYR==782) document.myFORM.myRESULT.value=\"天応\"+(esc_myYR-780)+\", 延暦\"+(esc_myYR-781
			if ((esc_myYR>782)&&(esc_myYR<=805)) document.myFORM.myRESULT.value=\"延暦\"+(esc_myYR-781
			if (esc_myYR==806) document.myFORM.myRESULT.value=\"延暦\"+(esc_myYR-781)+\", 大同\"+(esc_myYR-805
			if ((esc_myYR>806)&&(esc_myYR<=809)) document.myFORM.myRESULT.value=\"大同\"+(esc_myYR-805
			if (esc_myYR==810) document.myFORM.myRESULT.value=\"大同\"+(esc_myYR-805)+\", 弘仁\"+(esc_myYR-809
			if ((esc_myYR>810)&&(esc_myYR<=823)) document.myFORM.myRESULT.value=\"弘仁\"+(esc_myYR-809
			if (esc_myYR==824) document.myFORM.myRESULT.value=\"弘仁\"+(esc_myYR-809)+\", 天長\"+(esc_myYR-823
			if ((esc_myYR>824)&&(esc_myYR<=833)) document.myFORM.myRESULT.value=\"天長\"+(esc_myYR-823
			if (esc_myYR==834) document.myFORM.myRESULT.value=\"天長\"+(esc_myYR-823)+\", 承和\"+(esc_myYR-833
			if ((esc_myYR>834)&&(esc_myYR<=847)) document.myFORM.myRESULT.value=\"承和\"+(esc_myYR-833
			if (esc_myYR==848) document.myFORM.myRESULT.value=\"承和\"+(esc_myYR-833)+\", 嘉祥\"+(esc_myYR-847
			if ((esc_myYR>848)&&(esc_myYR<=850)) document.myFORM.myRESULT.value=\"嘉祥\"+(esc_myYR-847
			if (esc_myYR==851) document.myFORM.myRESULT.value=\"嘉祥\"+(esc_myYR-847)+\", 仁寿\"+(esc_myYR-850
			if ((esc_myYR>851)&&(esc_myYR<=853)) document.myFORM.myRESULT.value=\"仁寿\"+(esc_myYR-850
			if (esc_myYR==854) document.myFORM.myRESULT.value=\"仁寿\"+(esc_myYR-850)+\", 斉衡\"+(esc_myYR-853
			if ((esc_myYR>854)&&(esc_myYR<=856)) document.myFORM.myRESULT.value=\"斉衡\"+(esc_myYR-853
			if (esc_myYR==857) document.myFORM.myRESULT.value=\"斉衡\"+(esc_myYR-853)+\", 天安\"+(esc_myYR-856
			if ((esc_myYR>857)&&(esc_myYR<=858)) document.myFORM.myRESULT.value=\"天安\"+(esc_myYR-856
			if (esc_myYR==859) document.myFORM.myRESULT.value=\"天安\"+(esc_myYR-856)+\", 貞観\"+(esc_myYR-858
			if ((esc_myYR>859)&&(esc_myYR<=876)) document.myFORM.myRESULT.value=\"貞観\"+(esc_myYR-858
			if (esc_myYR==877) document.myFORM.myRESULT.value=\"貞観\"+(esc_myYR-858)+\", 元慶\"+(esc_myYR-876
			if ((esc_myYR>877)&&(esc_myYR<=884)) document.myFORM.myRESULT.value=\"元慶\"+(esc_myYR-876
			if (esc_myYR==885) document.myFORM.myRESULT.value=\"元慶\"+(esc_myYR-876)+\", 仁和\"+(esc_myYR-884
			if ((esc_myYR>885)&&(esc_myYR<=888)) document.myFORM.myRESULT.value=\"仁和\"+(esc_myYR-884
			if (esc_myYR==889) document.myFORM.myRESULT.value=\"仁和\"+(esc_myYR-884)+\", 寛平\"+(esc_myYR-888
			if ((esc_myYR>889)&&(esc_myYR<=897)) document.myFORM.myRESULT.value=\"寛平\"+(esc_myYR-888
			if (esc_myYR==898) document.myFORM.myRESULT.value=\"寛平\"+(esc_myYR-888)+\", 昌泰\"+(esc_myYR-897
			if ((esc_myYR>898)&&(esc_myYR<=900)) document.myFORM.myRESULT.value=\"昌泰\"+(esc_myYR-897
			if (esc_myYR==901) document.myFORM.myRESULT.value=\"昌泰\"+(esc_myYR-897)+\", 延喜\"+(esc_myYR-900
			if ((esc_myYR>901)&&(esc_myYR<=922)) document.myFORM.myRESULT.value=\"延喜\"+(esc_myYR-900
			if (esc_myYR==923) document.myFORM.myRESULT.value=\"延喜\"+(esc_myYR-900)+\", 延長\"+(esc_myYR-922
			if ((esc_myYR>923)&&(esc_myYR<=930)) document.myFORM.myRESULT.value=\"延長\"+(esc_myYR-922
			if (esc_myYR==931) document.myFORM.myRESULT.value=\"延長\"+(esc_myYR-922)+\", 承平\"+(esc_myYR-930
			if ((esc_myYR>931)&&(esc_myYR<=937)) document.myFORM.myRESULT.value=\"承平\"+(esc_myYR-930
			if (esc_myYR==938) document.myFORM.myRESULT.value=\"承平\"+(esc_myYR-930)+\", 天慶\"+(esc_myYR-937
			if ((esc_myYR>938)&&(esc_myYR<=946)) document.myFORM.myRESULT.value=\"天慶\"+(esc_myYR-937
			if (esc_myYR==947) document.myFORM.myRESULT.value=\"天慶\"+(esc_myYR-937)+\", 天暦\"+(esc_myYR-946
			if ((esc_myYR>947)&&(esc_myYR<=956)) document.myFORM.myRESULT.value=\"天暦\"+(esc_myYR-946
			if (esc_myYR==957) document.myFORM.myRESULT.value=\"天暦\"+(esc_myYR-946)+\", 天徳\"+(esc_myYR-956
			if ((esc_myYR>957)&&(esc_myYR<=960)) document.myFORM.myRESULT.value=\"天徳\"+(esc_myYR-956
			if (esc_myYR==961) document.myFORM.myRESULT.value=\"天徳\"+(esc_myYR-956)+\", 応和\"+(esc_myYR-960
			if ((esc_myYR>961)&&(esc_myYR<=963)) document.myFORM.myRESULT.value=\"応和\"+(esc_myYR-960
			if (esc_myYR==964) document.myFORM.myRESULT.value=\"応和\"+(esc_myYR-960)+\", 康保\"+(esc_myYR-963
			if ((esc_myYR>964)&&(esc_myYR<=967)) document.myFORM.myRESULT.value=\"康保\"+(esc_myYR-963
			if (esc_myYR==968) document.myFORM.myRESULT.value=\"康保\"+(esc_myYR-963)+\", 安和\"+(esc_myYR-967
			if ((esc_myYR>968)&&(esc_myYR<=969)) document.myFORM.myRESULT.value=\"安和\"+(esc_myYR-967
			if (esc_myYR==970) document.myFORM.myRESULT.value=\"安和\"+(esc_myYR-967)+\", 天禄\"+(esc_myYR-969
			if ((esc_myYR>970)&&(esc_myYR<=972)) document.myFORM.myRESULT.value=\"天禄\"+(esc_myYR-969
			if (esc_myYR==973) document.myFORM.myRESULT.value=\"天禄\"+(esc_myYR-969)+\", 天延\"+(esc_myYR-972
			if ((esc_myYR>973)&&(esc_myYR<=975)) document.myFORM.myRESULT.value=\"天延\"+(esc_myYR-972
			if (esc_myYR==976) document.myFORM.myRESULT.value=\"天延\"+(esc_myYR-972)+\", 貞元\"+(esc_myYR-975
			if ((esc_myYR>976)&&(esc_myYR<=977)) document.myFORM.myRESULT.value=\"貞元\"+(esc_myYR-975
			if (esc_myYR==978) document.myFORM.myRESULT.value=\"貞元\"+(esc_myYR-975)+\", 天元\"+(esc_myYR-977
			if ((esc_myYR>978)&&(esc_myYR<=982)) document.myFORM.myRESULT.value=\"天元\"+(esc_myYR-977
			if (esc_myYR==983) document.myFORM.myRESULT.value=\"天元\"+(esc_myYR-977)+\", 永観\"+(esc_myYR-982
			if ((esc_myYR>983)&&(esc_myYR<=984)) document.myFORM.myRESULT.value=\"永観\"+(esc_myYR-982
			if (esc_myYR==985) document.myFORM.myRESULT.value=\"永観\"+(esc_myYR-982)+\", 寛和\"+(esc_myYR-984
			if ((esc_myYR>985)&&(esc_myYR<=986)) document.myFORM.myRESULT.value=\"寛和\"+(esc_myYR-984
			if (esc_myYR==987) document.myFORM.myRESULT.value=\"寛和\"+(esc_myYR-984)+\", 永延\"+(esc_myYR-986
			if ((esc_myYR>987)&&(esc_myYR<=988)) document.myFORM.myRESULT.value=\"永延\"+(esc_myYR-986
			if (esc_myYR==989) document.myFORM.myRESULT.value=\"永延\"+(esc_myYR-986)+\", 永祚\"+(esc_myYR-988
			if (esc_myYR==990) document.myFORM.myRESULT.value=\"永祚\"+(esc_myYR-988)+\", 正暦\"+(esc_myYR-989
			if ((esc_myYR>990)&&(esc_myYR<=994)) document.myFORM.myRESULT.value=\"正暦\"+(esc_myYR-989
			if (esc_myYR==995) document.myFORM.myRESULT.value=\"正暦\"+(esc_myYR-989)+\", 長徳\"+(esc_myYR-994
			if ((esc_myYR>995)&&(esc_myYR<=998)) document.myFORM.myRESULT.value=\"長徳\"+(esc_myYR-994
			if (esc_myYR==999) document.myFORM.myRESULT.value=\"長徳\"+(esc_myYR-994)+\", 長保\"+(esc_myYR-998
			if ((esc_myYR>999)&&(esc_myYR<=1003)) document.myFORM.myRESULT.value=\"長保\"+(esc_myYR-998
			if (esc_myYR==1004) document.myFORM.myRESULT.value=\"長保\"+(esc_myYR-998)+\", 寛弘\"+(esc_myYR-1003
			if ((esc_myYR>1004)&&(esc_myYR<=1011)) document.myFORM.myRESULT.value=\"寛弘\"+(esc_myYR-1003
			if (esc_myYR==1012) document.myFORM.myRESULT.value=\"寛弘\"+(esc_myYR-1003)+\", 長和\"+(esc_myYR-1011
			if ((esc_myYR>1012)&&(esc_myYR<=1016)) document.myFORM.myRESULT.value=\"長和\"+(esc_myYR-1011
			if (esc_myYR==1017) document.myFORM.myRESULT.value=\"長和\"+(esc_myYR-1011)+\", 寛仁\"+(esc_myYR-1016
			if ((esc_myYR>1017)&&(esc_myYR<=1020)) document.myFORM.myRESULT.value=\"寛仁\"+(esc_myYR-1016
			if (esc_myYR==1021) document.myFORM.myRESULT.value=\"寛仁\"+(esc_myYR-1016)+\", 治安\"+(esc_myYR-1020
			if ((esc_myYR>1021)&&(esc_myYR<=1023)) document.myFORM.myRESULT.value=\"治安\"+(esc_myYR-1020
			if (esc_myYR==1024) document.myFORM.myRESULT.value=\"治安\"+(esc_myYR-1020)+\", 万寿\"+(esc_myYR-1023
			if ((esc_myYR>1024)&&(esc_myYR<=1027)) document.myFORM.myRESULT.value=\"万寿\"+(esc_myYR-1023
			if (esc_myYR==1028) document.myFORM.myRESULT.value=\"万寿\"+(esc_myYR-1023)+\", 長元\"+(esc_myYR-1027
			if ((esc_myYR>1028)&&(esc_myYR<=1036)) document.myFORM.myRESULT.value=\"長元\"+(esc_myYR-1027
			if (esc_myYR==1037) document.myFORM.myRESULT.value=\"長元\"+(esc_myYR-1027)+\", 長暦\"+(esc_myYR-1036
			if ((esc_myYR>1037)&&(esc_myYR<=1039)) document.myFORM.myRESULT.value=\"長暦\"+(esc_myYR-1036
			if (esc_myYR==1040) document.myFORM.myRESULT.value=\"長暦\"+(esc_myYR-1036)+\", 長久\"+(esc_myYR-1039
			if ((esc_myYR>1040)&&(esc_myYR<=1043)) document.myFORM.myRESULT.value=\"長久\"+(esc_myYR-1039
			if (esc_myYR==1044) document.myFORM.myRESULT.value=\"長久\"+(esc_myYR-1039)+\", 寛徳\"+(esc_myYR-1043
			if ((esc_myYR>1044)&&(esc_myYR<=1045)) document.myFORM.myRESULT.value=\"寛徳\"+(esc_myYR-1043
			if (esc_myYR==1046) document.myFORM.myRESULT.value=\"寛徳\"+(esc_myYR-1043)+\", 永承\"+(esc_myYR-1045
			if ((esc_myYR>1046)&&(esc_myYR<=1052)) document.myFORM.myRESULT.value=\"永承\"+(esc_myYR-1045
			if (esc_myYR==1053) document.myFORM.myRESULT.value=\"永承\"+(esc_myYR-1045)+\", 天喜\"+(esc_myYR-1052
			if ((esc_myYR>1053)&&(esc_myYR<=1057)) document.myFORM.myRESULT.value=\"天喜\"+(esc_myYR-1052
			if (esc_myYR==1058) document.myFORM.myRESULT.value=\"天喜\"+(esc_myYR-1052)+\", 康平\"+(esc_myYR-1057
			if ((esc_myYR>1058)&&(esc_myYR<=1064)) document.myFORM.myRESULT.value=\"康平\"+(esc_myYR-1057
			if (esc_myYR==1065) document.myFORM.myRESULT.value=\"康平\"+(esc_myYR-1057)+\", 治暦\"+(esc_myYR-1064
			if ((esc_myYR>1065)&&(esc_myYR<=1068)) document.myFORM.myRESULT.value=\"治暦\"+(esc_myYR-1064
			if (esc_myYR==1069) document.myFORM.myRESULT.value=\"治暦\"+(esc_myYR-1064)+\", 延久\"+(esc_myYR-1068
			if ((esc_myYR>1069)&&(esc_myYR<=1073)) document.myFORM.myRESULT.value=\"延久\"+(esc_myYR-1068
			if (esc_myYR==1074) document.myFORM.myRESULT.value=\"延久\"+(esc_myYR-1068)+\", 承保\"+(esc_myYR-1073
			if ((esc_myYR>1074)&&(esc_myYR<=1076)) document.myFORM.myRESULT.value=\"承保\"+(esc_myYR-1073
			if (esc_myYR==1077) document.myFORM.myRESULT.value=\"承保\"+(esc_myYR-1073)+\", 承暦\"+(esc_myYR-1076
			if ((esc_myYR>1077)&&(esc_myYR<=1080)) document.myFORM.myRESULT.value=\"承暦\"+(esc_myYR-1076
			if (esc_myYR==1081) document.myFORM.myRESULT.value=\"承暦\"+(esc_myYR-1076)+\", 永保\"+(esc_myYR-1080
			if ((esc_myYR>1081)&&(esc_myYR<=1083)) document.myFORM.myRESULT.value=\"永保\"+(esc_myYR-1080
			if (esc_myYR==1084) document.myFORM.myRESULT.value=\"永保\"+(esc_myYR-1080)+\", 応徳\"+(esc_myYR-1083
			if ((esc_myYR>1084)&&(esc_myYR<=1086)) document.myFORM.myRESULT.value=\"応徳\"+(esc_myYR-1083
			if (esc_myYR==1087) document.myFORM.myRESULT.value=\"応徳\"+(esc_myYR-1083)+\", 寛治\"+(esc_myYR-1086
			if ((esc_myYR>1087)&&(esc_myYR<=1093)) document.myFORM.myRESULT.value=\"寛治\"+(esc_myYR-1086
			if (esc_myYR==1094) document.myFORM.myRESULT.value=\"寛治\"+(esc_myYR-1086)+\", 嘉保\"+(esc_myYR-1093
			if ((esc_myYR>1094)&&(esc_myYR<=1095)) document.myFORM.myRESULT.value=\"嘉保\"+(esc_myYR-1093
			if (esc_myYR==1096) document.myFORM.myRESULT.value=\"嘉保\"+(esc_myYR-1093)+\", 永長\"+(esc_myYR-1095
			if (esc_myYR==1097) document.myFORM.myRESULT.value=\"永長\"+(esc_myYR-1095)+\", 承徳\"+(esc_myYR-1096
			if ((esc_myYR>1097)&&(esc_myYR<=1098)) document.myFORM.myRESULT.value=\"承徳\"+(esc_myYR-1096
			if (esc_myYR==1099) document.myFORM.myRESULT.value=\"承徳\"+(esc_myYR-1096)+\", 康和\"+(esc_myYR-1098
			if ((esc_myYR>1099)&&(esc_myYR<=1103)) document.myFORM.myRESULT.value=\"康和\"+(esc_myYR-1098
			if (esc_myYR==1104) document.myFORM.myRESULT.value=\"康和\"+(esc_myYR-1098)+\", 長治\"+(esc_myYR-1103
			if ((esc_myYR>1104)&&(esc_myYR<=1105)) document.myFORM.myRESULT.value=\"長治\"+(esc_myYR-1103
			if (esc_myYR==1106) document.myFORM.myRESULT.value=\"長治\"+(esc_myYR-1103)+\", 嘉承\"+(esc_myYR-1105
			if ((esc_myYR>1106)&&(esc_myYR<=1107)) document.myFORM.myRESULT.value=\"嘉承\"+(esc_myYR-1105
			if (esc_myYR==1108) document.myFORM.myRESULT.value=\"嘉承\"+(esc_myYR-1105)+\", 天仁\"+(esc_myYR-1107
			if ((esc_myYR>1108)&&(esc_myYR<=1109)) document.myFORM.myRESULT.value=\"天仁\"+(esc_myYR-1107
			if (esc_myYR==1110) document.myFORM.myRESULT.value=\"天仁\"+(esc_myYR-1107)+\", 天永\"+(esc_myYR-1109
			if ((esc_myYR>1110)&&(esc_myYR<=1112)) document.myFORM.myRESULT.value=\"天永\"+(esc_myYR-1109
			if (esc_myYR==1113) document.myFORM.myRESULT.value=\"天永\"+(esc_myYR-1109)+\", 永久\"+(esc_myYR-1112
			if ((esc_myYR>1113)&&(esc_myYR<=1117)) document.myFORM.myRESULT.value=\"永久\"+(esc_myYR-1112
			if (esc_myYR==1118) document.myFORM.myRESULT.value=\"永久\"+(esc_myYR-1112)+\", 元永\"+(esc_myYR-1117
			if ((esc_myYR>1118)&&(esc_myYR<=1119)) document.myFORM.myRESULT.value=\"元永\"+(esc_myYR-1117
			if (esc_myYR==1120) document.myFORM.myRESULT.value=\"元永\"+(esc_myYR-1117)+\", 保安\"+(esc_myYR-1119
			if ((esc_myYR>1120)&&(esc_myYR<=1123)) document.myFORM.myRESULT.value=\"保安\"+(esc_myYR-1119
			if (esc_myYR==1124) document.myFORM.myRESULT.value=\"保安\"+(esc_myYR-1119)+\", 天治\"+(esc_myYR-1123
			if ((esc_myYR>1124)&&(esc_myYR<=1125)) document.myFORM.myRESULT.value=\"天治\"+(esc_myYR-1123
			if (esc_myYR==1126) document.myFORM.myRESULT.value=\"天治\"+(esc_myYR-1123)+\", 大治\"+(esc_myYR-1125
			if ((esc_myYR>1126)&&(esc_myYR<=1130)) document.myFORM.myRESULT.value=\"大治\"+(esc_myYR-1125
			if (esc_myYR==1131) document.myFORM.myRESULT.value=\"大治\"+(esc_myYR-1125)+\", 天承\"+(esc_myYR-1130
			if (esc_myYR==1132) document.myFORM.myRESULT.value=\"天承\"+(esc_myYR-1130)+\", 長承\"+(esc_myYR-1131
			if ((esc_myYR>1132)&&(esc_myYR<=1134)) document.myFORM.myRESULT.value=\"長承\"+(esc_myYR-1131
			if (esc_myYR==1135) document.myFORM.myRESULT.value=\"長承\"+(esc_myYR-1131)+\", 保延\"+(esc_myYR-1134
			if ((esc_myYR>1135)&&(esc_myYR<=1140)) document.myFORM.myRESULT.value=\"保延\"+(esc_myYR-1134
			if (esc_myYR==1141) document.myFORM.myRESULT.value=\"保延\"+(esc_myYR-1134)+\", 永治\"+(esc_myYR-1140
			if (esc_myYR==1142) document.myFORM.myRESULT.value=\"永治\"+(esc_myYR-1140)+\", 康治\"+(esc_myYR-1141
			if ((esc_myYR>1142)&&(esc_myYR<=1143)) document.myFORM.myRESULT.value=\"康治\"+(esc_myYR-1141
			if (esc_myYR==1144) document.myFORM.myRESULT.value=\"康治\"+(esc_myYR-1141)+\", 天養\"+(esc_myYR-1143
			if (esc_myYR==1145) document.myFORM.myRESULT.value=\"天養\"+(esc_myYR-1143)+\", 久安\"+(esc_myYR-1144
			if ((esc_myYR>1145)&&(esc_myYR<=1150)) document.myFORM.myRESULT.value=\"久安\"+(esc_myYR-1144
			if (esc_myYR==1151) document.myFORM.myRESULT.value=\"久安\"+(esc_myYR-1144)+\", 仁平\"+(esc_myYR-1150
			if ((esc_myYR>1151)&&(esc_myYR<=1153)) document.myFORM.myRESULT.value=\"仁平\"+(esc_myYR-1150
			if (esc_myYR==1154) document.myFORM.myRESULT.value=\"仁平\"+(esc_myYR-1150)+\", 久寿\"+(esc_myYR-1153
			if ((esc_myYR>1154)&&(esc_myYR<=1155)) document.myFORM.myRESULT.value=\"久寿\"+(esc_myYR-1153
			if (esc_myYR==1156) document.myFORM.myRESULT.value=\"久寿\"+(esc_myYR-1153)+\", 保元\"+(esc_myYR-1155
			if ((esc_myYR>1156)&&(esc_myYR<=1158)) document.myFORM.myRESULT.value=\"保元\"+(esc_myYR-1155
			if (esc_myYR==1159) document.myFORM.myRESULT.value=\"保元\"+(esc_myYR-1155)+\", 平治\"+(esc_myYR-1158
			if (esc_myYR==1160) document.myFORM.myRESULT.value=\"平治\"+(esc_myYR-1158)+\", 永暦\"+(esc_myYR-1159
			if (esc_myYR==1161) document.myFORM.myRESULT.value=\"永暦\"+(esc_myYR-1159)+\", 応保\"+(esc_myYR-1160
			if ((esc_myYR>1161)&&(esc_myYR<=1162)) document.myFORM.myRESULT.value=\"応保\"+(esc_myYR-1160
			if (esc_myYR==1163) document.myFORM.myRESULT.value=\"応保\"+(esc_myYR-1160)+\", 長寛\"+(esc_myYR-1162
			if ((esc_myYR>1163)&&(esc_myYR<=1164)) document.myFORM.myRESULT.value=\"長寛\"+(esc_myYR-1162
			if (esc_myYR==1165) document.myFORM.myRESULT.value=\"長寛\"+(esc_myYR-1162)+\", 永万\"+(esc_myYR-1164
			if (esc_myYR==1166) document.myFORM.myRESULT.value=\"永万\"+(esc_myYR-1164)+\", 仁安\"+(esc_myYR-1165
			if ((esc_myYR>1166)&&(esc_myYR<=1168)) document.myFORM.myRESULT.value=\"仁安\"+(esc_myYR-1165
			if (esc_myYR==1169) document.myFORM.myRESULT.value=\"仁安\"+(esc_myYR-1165)+\", 嘉応\"+(esc_myYR-1168
			if ((esc_myYR>1169)&&(esc_myYR<=1170)) document.myFORM.myRESULT.value=\"嘉応\"+(esc_myYR-1168
			if (esc_myYR==1171) document.myFORM.myRESULT.value=\"嘉応\"+(esc_myYR-1168)+\", 承安\"+(esc_myYR-1170
			if ((esc_myYR>1171)&&(esc_myYR<=1174)) document.myFORM.myRESULT.value=\"承安\"+(esc_myYR-1170
			if (esc_myYR==1175) document.myFORM.myRESULT.value=\"承安\"+(esc_myYR-1170)+\", 安元\"+(esc_myYR-1174
			if ((esc_myYR>1175)&&(esc_myYR<=1176)) document.myFORM.myRESULT.value=\"安元\"+(esc_myYR-1174
			if (esc_myYR==1177) document.myFORM.myRESULT.value=\"安元\"+(esc_myYR-1174)+\", 治承\"+(esc_myYR-1176
			if ((esc_myYR>1177)&&(esc_myYR<=1180)) document.myFORM.myRESULT.value=\"治承\"+(esc_myYR-1176
			if (esc_myYR==1181) document.myFORM.myRESULT.value=\"[源氏] 治承\"+(esc_myYR-1176)+\", [平氏] 養和\"+(esc_myYR-1180
			if (esc_myYR==1182) document.myFORM.myRESULT.value=\"[源氏] 治承\"+(esc_myYR-1176)+\", [平氏] 養和\"+(esc_myYR-1180)+\", [平氏] 寿永\"+(esc_myYR-1181
			if (esc_myYR==1183) document.myFORM.myRESULT.value=\"[源氏] 治承\"+(esc_myYR-1176)+\", [平氏] 寿永\"+(esc_myYR-1181
			if (esc_myYR==1184) document.myFORM.myRESULT.value=\"[源氏] 治承\"+(esc_myYR-1176)+\", [源氏] 元暦\"+(esc_myYR-1183)+\", [平氏] 寿永\"+(esc_myYR-1181
			if (esc_myYR==1185) document.myFORM.myRESULT.value=\"[源氏] 元暦\"+(esc_myYR-1183)+\", [平氏] 寿永\"+(esc_myYR-1181)+\", 文治\"+(esc_myYR-1184
			if ((esc_myYR>1185)&&(esc_myYR<=1189)) document.myFORM.myRESULT.value=\"文治\"+(esc_myYR-1184
			if (esc_myYR==1190) document.myFORM.myRESULT.value=\"文治\"+(esc_myYR-1184)+\", 建久\"+(esc_myYR-1189
			if ((esc_myYR>1190)&&(esc_myYR<=1198)) document.myFORM.myRESULT.value=\"建久\"+(esc_myYR-1189
			if (esc_myYR==1199) document.myFORM.myRESULT.value=\"建久\"+(esc_myYR-1189)+\", 正治\"+(esc_myYR-1198
			if ((esc_myYR>1199)&&(esc_myYR<=1200)) document.myFORM.myRESULT.value=\"正治\"+(esc_myYR-1198
			if (esc_myYR==1201) document.myFORM.myRESULT.value=\"正治\"+(esc_myYR-1198)+\", 建仁\"+(esc_myYR-1200
			if ((esc_myYR>1201)&&(esc_myYR<=1203)) document.myFORM.myRESULT.value=\"建仁\"+(esc_myYR-1200
			if (esc_myYR==1204) document.myFORM.myRESULT.value=\"建仁\"+(esc_myYR-1200)+\", 元久\"+(esc_myYR-1203
			if ((esc_myYR>1204)&&(esc_myYR<=1205)) document.myFORM.myRESULT.value=\"元久\"+(esc_myYR-1203
			if (esc_myYR==1206) document.myFORM.myRESULT.value=\"元久\"+(esc_myYR-1203)+\", 建永\"+(esc_myYR-1205
			if (esc_myYR==1207) document.myFORM.myRESULT.value=\"建永\"+(esc_myYR-1205)+\", 承元\"+(esc_myYR-1206
			if ((esc_myYR>1207)&&(esc_myYR<=1210)) document.myFORM.myRESULT.value=\"承元\"+(esc_myYR-1206
			if (esc_myYR==1211) document.myFORM.myRESULT.value=\"承元\"+(esc_myYR-1206)+\", 建暦\"+(esc_myYR-1210
			if ((esc_myYR>1211)&&(esc_myYR<=1212)) document.myFORM.myRESULT.value=\"建暦\"+(esc_myYR-1210
			if (esc_myYR==1213) document.myFORM.myRESULT.value=\"建暦\"+(esc_myYR-1210)+\", 建保\"+(esc_myYR-1212
			if ((esc_myYR>1213)&&(esc_myYR<=1218)) document.myFORM.myRESULT.value=\"建保\"+(esc_myYR-1212
			if (esc_myYR==1219) document.myFORM.myRESULT.value=\"建保\"+(esc_myYR-1212)+\", 承久\"+(esc_myYR-1218
			if ((esc_myYR>1219)&&(esc_myYR<=1221)) document.myFORM.myRESULT.value=\"承久\"+(esc_myYR-1218
			if (esc_myYR==1222) document.myFORM.myRESULT.value=\"承久\"+(esc_myYR-1218)+\", 貞応\"+(esc_myYR-1221
			if ((esc_myYR>1222)&&(esc_myYR<=1223)) document.myFORM.myRESULT.value=\"貞応\"+(esc_myYR-1221
			if (esc_myYR==1224) document.myFORM.myRESULT.value=\"貞応\"+(esc_myYR-1221)+\", 元仁\"+(esc_myYR-1223
			if (esc_myYR==1225) document.myFORM.myRESULT.value=\"元仁\"+(esc_myYR-1223)+\", 嘉禄\"+(esc_myYR-1224
			if ((esc_myYR>1225)&&(esc_myYR<=1226)) document.myFORM.myRESULT.value=\"嘉禄\"+(esc_myYR-1224
			if (esc_myYR==1227) document.myFORM.myRESULT.value=\"嘉禄\"+(esc_myYR-1224)+\", 安貞\"+(esc_myYR-1226
			if ((esc_myYR>1227)&&(esc_myYR<=1228)) document.myFORM.myRESULT.value=\"安貞\"+(esc_myYR-1226
			if (esc_myYR==1229) document.myFORM.myRESULT.value=\"安貞\"+(esc_myYR-1226)+\", 寛喜\"+(esc_myYR-1228
			if ((esc_myYR>1229)&&(esc_myYR<=1231)) document.myFORM.myRESULT.value=\"寛喜\"+(esc_myYR-1228
			if (esc_myYR==1232) document.myFORM.myRESULT.value=\"寛喜\"+(esc_myYR-1228)+\", 貞永\"+(esc_myYR-1231
			if (esc_myYR==1233) document.myFORM.myRESULT.value=\"貞永\"+(esc_myYR-1231)+\", 天福\"+(esc_myYR-1232
			if (esc_myYR==1234) document.myFORM.myRESULT.value=\"天福\"+(esc_myYR-1232)+\", 文暦\"+(esc_myYR-1233
			if (esc_myYR==1235) document.myFORM.myRESULT.value=\"文暦\"+(esc_myYR-1233)+\", 嘉禎\"+(esc_myYR-1234
			if ((esc_myYR>1235)&&(esc_myYR<=1237)) document.myFORM.myRESULT.value=\"嘉禎\"+(esc_myYR-1234
			if (esc_myYR==1238) document.myFORM.myRESULT.value=\"嘉禎\"+(esc_myYR-1234)+\", 暦仁\"+(esc_myYR-1237
			if (esc_myYR==1239) document.myFORM.myRESULT.value=\"暦仁\"+(esc_myYR-1237)+\", 延応\"+(esc_myYR-1238
			if (esc_myYR==1240) document.myFORM.myRESULT.value=\"延応\"+(esc_myYR-1238)+\", 仁治\"+(esc_myYR-1239
			if ((esc_myYR>1240)&&(esc_myYR<=1242)) document.myFORM.myRESULT.value=\"仁治\"+(esc_myYR-1239
			if (esc_myYR==1243) document.myFORM.myRESULT.value=\"仁治\"+(esc_myYR-1239)+\", 寛元\"+(esc_myYR-1242
			if ((esc_myYR>1243)&&(esc_myYR<=1246)) document.myFORM.myRESULT.value=\"寛元\"+(esc_myYR-1242
			if (esc_myYR==1247) document.myFORM.myRESULT.value=\"寛元\"+(esc_myYR-1242)+\", 宝治\"+(esc_myYR-1246
			if ((esc_myYR>1247)&&(esc_myYR<=1248)) document.myFORM.myRESULT.value=\"宝治\"+(esc_myYR-1246
			if (esc_myYR==1249) document.myFORM.myRESULT.value=\"宝治\"+(esc_myYR-1246)+\", 建長\"+(esc_myYR-1248
			if ((esc_myYR>1249)&&(esc_myYR<=1255)) document.myFORM.myRESULT.value=\"建長\"+(esc_myYR-1248
			if (esc_myYR==1256) document.myFORM.myRESULT.value=\"建長\"+(esc_myYR-1248)+\", 康元\"+(esc_myYR-1255
			if (esc_myYR==1257) document.myFORM.myRESULT.value=\"康元\"+(esc_myYR-1255)+\", 正嘉\"+(esc_myYR-1256
			if ((esc_myYR>1257)&&(esc_myYR<=1258)) document.myFORM.myRESULT.value=\"正嘉\"+(esc_myYR-1256
			if (esc_myYR==1259) document.myFORM.myRESULT.value=\"正嘉\"+(esc_myYR-1256)+\", 正元\"+(esc_myYR-1258
			if (esc_myYR==1260) document.myFORM.myRESULT.value=\"正元\"+(esc_myYR-1258)+\", 文応\"+(esc_myYR-1259
			if (esc_myYR==1261) document.myFORM.myRESULT.value=\"文応\"+(esc_myYR-1259)+\", 弘長\"+(esc_myYR-1260
			if ((esc_myYR>1261)&&(esc_myYR<=1263)) document.myFORM.myRESULT.value=\"弘長\"+(esc_myYR-1260
			if (esc_myYR==1264) document.myFORM.myRESULT.value=\"弘長\"+(esc_myYR-1260)+\", 文永\"+(esc_myYR-1263
			if ((esc_myYR>1264)&&(esc_myYR<=1274)) document.myFORM.myRESULT.value=\"文永\"+(esc_myYR-1263
			if (esc_myYR==1275) document.myFORM.myRESULT.value=\"文永\"+(esc_myYR-1263)+\", 建治\"+(esc_myYR-1274
			if ((esc_myYR>1275)&&(esc_myYR<=1277)) document.myFORM.myRESULT.value=\"建治\"+(esc_myYR-1274
			if (esc_myYR==1278) document.myFORM.myRESULT.value=\"建治\"+(esc_myYR-1274)+\", 弘安\"+(esc_myYR-1277
			if ((esc_myYR>1278)&&(esc_myYR<=1287)) document.myFORM.myRESULT.value=\"弘安\"+(esc_myYR-1277
			if (esc_myYR==1288) document.myFORM.myRESULT.value=\"弘安\"+(esc_myYR-1277)+\", 正応\"+(esc_myYR-1287
			if ((esc_myYR>1288)&&(esc_myYR<=1292)) document.myFORM.myRESULT.value=\"正応\"+(esc_myYR-1287
			if (esc_myYR==1293) document.myFORM.myRESULT.value=\"正応\"+(esc_myYR-1287)+\", 永仁\"+(esc_myYR-1292
			if ((esc_myYR>1293)&&(esc_myYR<=1298)) document.myFORM.myRESULT.value=\"永仁\"+(esc_myYR-1292
			if (esc_myYR==1299) document.myFORM.myRESULT.value=\"永仁\"+(esc_myYR-1292)+\", 正安\"+(esc_myYR-1298
			if ((esc_myYR>1299)&&(esc_myYR<=1301)) document.myFORM.myRESULT.value=\"正安\"+(esc_myYR-1298
			if (esc_myYR==1302) document.myFORM.myRESULT.value=\"正安\"+(esc_myYR-1298)+\", 乾元\"+(esc_myYR-1301
			if (esc_myYR==1303) document.myFORM.myRESULT.value=\"乾元\"+(esc_myYR-1301)+\", 嘉元\"+(esc_myYR-1302
			if ((esc_myYR>1303)&&(esc_myYR<=1305)) document.myFORM.myRESULT.value=\"嘉元\"+(esc_myYR-1302
			if (esc_myYR==1306) document.myFORM.myRESULT.value=\"嘉元\"+(esc_myYR-1302)+\", 徳治\"+(esc_myYR-1305
			if ((esc_myYR>1306)&&(esc_myYR<=1307)) document.myFORM.myRESULT.value=\"徳治\"+(esc_myYR-1305
			if (esc_myYR==1308) document.myFORM.myRESULT.value=\"徳治\"+(esc_myYR-1305)+\", 延慶\"+(esc_myYR-1307
			if ((esc_myYR>1308)&&(esc_myYR<=1310)) document.myFORM.myRESULT.value=\"延慶\"+(esc_myYR-1307
			if (esc_myYR==1311) document.myFORM.myRESULT.value=\"延慶\"+(esc_myYR-1307)+\", 応長\"+(esc_myYR-1310
			if (esc_myYR==1312) document.myFORM.myRESULT.value=\"応長\"+(esc_myYR-1310)+\", 正和\"+(esc_myYR-1311
			if ((esc_myYR>1312)&&(esc_myYR<=1316)) document.myFORM.myRESULT.value=\"正和\"+(esc_myYR-1311
			if (esc_myYR==1317) document.myFORM.myRESULT.value=\"正和\"+(esc_myYR-1311)+\", 文保\"+(esc_myYR-1316
			if ((esc_myYR>1317)&&(esc_myYR<=1318)) document.myFORM.myRESULT.value=\"文保\"+(esc_myYR-1316
			if (esc_myYR==1319) document.myFORM.myRESULT.value=\"文保\"+(esc_myYR-1316)+\", 元応\"+(esc_myYR-1318
			if ((esc_myYR>1319)&&(esc_myYR<=1320)) document.myFORM.myRESULT.value=\"元応\"+(esc_myYR-1318
			if (esc_myYR==1321) document.myFORM.myRESULT.value=\"元応\"+(esc_myYR-1318)+\", 元亨\"+(esc_myYR-1320
			if ((esc_myYR>1321)&&(esc_myYR<=1323)) document.myFORM.myRESULT.value=\"元亨\"+(esc_myYR-1320
			if (esc_myYR==1324) document.myFORM.myRESULT.value=\"元亨\"+(esc_myYR-1320)+\", 正中\"+(esc_myYR-1323
			if ((esc_myYR>1324)&&(esc_myYR<=1325)) document.myFORM.myRESULT.value=\"正中\"+(esc_myYR-1323
			if (esc_myYR==1326) document.myFORM.myRESULT.value=\"正中\"+(esc_myYR-1323)+\", 嘉暦\"+(esc_myYR-1325
			if ((esc_myYR>1326)&&(esc_myYR<=1328)) document.myFORM.myRESULT.value=\"嘉暦\"+(esc_myYR-1325
			if (esc_myYR==1329) document.myFORM.myRESULT.value=\"嘉暦\"+(esc_myYR-1325)+\", 元徳\"+(esc_myYR-1328
			if ((esc_myYR>1329)&&(esc_myYR<=1330)) document.myFORM.myRESULT.value=\"元徳\"+(esc_myYR-1328
			if (esc_myYR==1331) document.myFORM.myRESULT.value=\"[南朝] 元弘\"+(esc_myYR-1330)+\", [北朝] 元徳\"+(esc_myYR-1328
			if (esc_myYR==1332) document.myFORM.myRESULT.value=\"[南朝] 元弘\"+(esc_myYR-1330)+\", [北朝] 元徳\"+(esc_myYR-1328)+\", [北朝] 正慶\"+(esc_myYR-1331
			if (esc_myYR==1333) document.myFORM.myRESULT.value=\"[南朝] 元弘\"+(esc_myYR-1330)+\", [北朝] 正慶\"+(esc_myYR-1331
			if (esc_myYR==1334) document.myFORM.myRESULT.value=\"元弘\"+(esc_myYR-1330)+\", 建武\"+(esc_myYR-1333
			if (esc_myYR==1335) document.myFORM.myRESULT.value=\"建武\"+(esc_myYR-1333
			if ((esc_myYR>1335)&&(esc_myYR<=1337)) document.myFORM.myRESULT.value=\"[南朝] 延元\"+(esc_myYR-1335)+\", [北朝] 建武\"+(esc_myYR-1333
			if (esc_myYR==1338) document.myFORM.myRESULT.value=\"[南朝] 延元\"+(esc_myYR-1335)+\", [北朝] 建武\"+(esc_myYR-1333)+\", [北朝] 暦応\"+(esc_myYR-1337
			if (esc_myYR==1339) document.myFORM.myRESULT.value=\"[南朝] 延元\"+(esc_myYR-1335)+\", [北朝] 暦応\"+(esc_myYR-1337
			if (esc_myYR==1340) document.myFORM.myRESULT.value=\"[南朝] 延元\"+(esc_myYR-1335)+\", [南朝] 興国\"+(esc_myYR-1339)+\", [北朝] 暦応\"+(esc_myYR-1337
			if (esc_myYR==1341) document.myFORM.myRESULT.value=\"[南朝] 興国\"+(esc_myYR-1339)+\", [北朝] 暦応\"+(esc_myYR-1337
			if (esc_myYR==1342) document.myFORM.myRESULT.value=\"[南朝] 興国\"+(esc_myYR-1339)+\", [北朝] 暦応\"+(esc_myYR-1337)+\", [北朝] 康永\"+(esc_myYR-1341
			if ((esc_myYR>1342)&&(esc_myYR<=1344)) document.myFORM.myRESULT.value=\"[南朝] 興国\"+(esc_myYR-1339)+\", [北朝] 康永\"+(esc_myYR-1341
			if (esc_myYR==1345) document.myFORM.myRESULT.value=\"[南朝] 興国\"+(esc_myYR-1339)+\", [北朝] 康永\"+(esc_myYR-1341)+\", [北朝] 貞和\"+(esc_myYR-1344
			if (esc_myYR==1346) document.myFORM.myRESULT.value=\"[南朝] 興国\"+(esc_myYR-1339)+\", [南朝] 正平\"+(esc_myYR-1345)+\", [北朝] 貞和\"+(esc_myYR-1344
			if ((esc_myYR>1346)&&(esc_myYR<=1349)) document.myFORM.myRESULT.value=\"[南朝] 正平\"+(esc_myYR-1345)+\", [北朝] 貞和\"+(esc_myYR-1344
			if (esc_myYR==1350) document.myFORM.myRESULT.value=\"[南朝] 正平\"+(esc_myYR-1345)+\", [北朝] 貞和\"+(esc_myYR-1344)+\", [北朝] 観応\"+(esc_myYR-1349
			if (esc_myYR==1351) document.myFORM.myRESULT.value=\"[南朝] 正平\"+(esc_myYR-1345)+\", [北朝] 観応\"+(esc_myYR-1349
			if (esc_myYR==1352) document.myFORM.myRESULT.value=\"[南朝] 正平\"+(esc_myYR-1345)+\", [北朝] 観応\"+(esc_myYR-1349)+\", [北朝] 文和\"+(esc_myYR-1351
			if ((esc_myYR>1352)&&(esc_myYR<=1355)) document.myFORM.myRESULT.value=\"[南朝] 正平\"+(esc_myYR-1345)+\", [北朝] 文和\"+(esc_myYR-1351
			if (esc_myYR==1356) document.myFORM.myRESULT.value=\"[南朝] 正平\"+(esc_myYR-1345)+\", [北朝] 文和\"+(esc_myYR-1351)+\", [北朝] 延文\"+(esc_myYR-1355
			if ((esc_myYR>1356)&&(esc_myYR<=1360)) document.myFORM.myRESULT.value=\"[南朝] 正平\"+(esc_myYR-1345)+\", [北朝] 延文\"+(esc_myYR-1355
			if (esc_myYR==1361) document.myFORM.myRESULT.value=\"[南朝] 正平\"+(esc_myYR-1345)+\", [北朝] 延文\"+(esc_myYR-1355)+\", [北朝] 康安\"+(esc_myYR-1360
			if (esc_myYR==1362) document.myFORM.myRESULT.value=\"[南朝] 正平\"+(esc_myYR-1345)+\", [北朝] 康安\"+(esc_myYR-1360)+\", [北朝] 貞治\"+(esc_myYR-1361
			if ((esc_myYR>1362)&&(esc_myYR<=1367)) document.myFORM.myRESULT.value=\"[南朝] 正平\"+(esc_myYR-1345)+\", [北朝] 貞治\"+(esc_myYR-1361
			if (esc_myYR==1368) document.myFORM.myRESULT.value=\"[南朝] 正平\"+(esc_myYR-1345)+\", [北朝] 貞治\"+(esc_myYR-1361)+\", [北朝] 応安\"+(esc_myYR-1367
			if (esc_myYR==1369) document.myFORM.myRESULT.value=\"[南朝] 正平\"+(esc_myYR-1345)+\", [北朝] 応安\"+(esc_myYR-1367
			if (esc_myYR==1370) document.myFORM.myRESULT.value=\"[南朝] 正平\"+(esc_myYR-1345)+\", [南朝] 建徳\"+(esc_myYR-1369)+\", [北朝] 応安\"+(esc_myYR-1367
			if (esc_myYR==1371) document.myFORM.myRESULT.value=\"[南朝] 建徳\"+(esc_myYR-1369)+\", [北朝] 応安\"+(esc_myYR-1367
			if (esc_myYR==1372) document.myFORM.myRESULT.value=\"[南朝] 建徳\"+(esc_myYR-1369)+\", [南朝] 文中\"+(esc_myYR-1371)+\", [北朝] 応安\"+(esc_myYR-1367
			if ((esc_myYR>1372)&&(esc_myYR<=1374)) document.myFORM.myRESULT.value=\"[南朝] 文中\"+(esc_myYR-1371)+\", [北朝] 応安\"+(esc_myYR-1367
			if (esc_myYR==1375) document.myFORM.myRESULT.value=\"[南朝] 文中\"+(esc_myYR-1371)+\", [南朝] 天授\"+(esc_myYR-1374)+\", [北朝] 応安\"+(esc_myYR-1367)+\", [北朝] 永和\"+(esc_myYR-1374
			if ((esc_myYR>1375)&&(esc_myYR<=1378)) document.myFORM.myRESULT.value=\"[南朝] 天授\"+(esc_myYR-1374)+\", [北朝] 永和\"+(esc_myYR-1374
			if (esc_myYR==1379) document.myFORM.myRESULT.value=\"[南朝] 天授\"+(esc_myYR-1374)+\", [北朝] 永和\"+(esc_myYR-1374)+\", [北朝] 康暦\"+(esc_myYR-1378
			if (esc_myYR==1380) document.myFORM.myRESULT.value=\"[南朝] 天授\"+(esc_myYR-1374)+\", [北朝] 康暦\"+(esc_myYR-1378
			if (esc_myYR==1381) document.myFORM.myRESULT.value=\"[南朝] 天授\"+(esc_myYR-1374)+\", [南朝] 弘和\"+(esc_myYR-1380)+\", [北朝] 康暦\"+(esc_myYR-1378)+\", [北朝] 永徳\"+(esc_myYR-1380
			if ((esc_myYR>1381)&&(esc_myYR<=1383)) document.myFORM.myRESULT.value=\"[南朝] 弘和\"+(esc_myYR-1380)+\", [北朝] 永徳\"+(esc_myYR-1380
			if (esc_myYR==1384) document.myFORM.myRESULT.value=\"[南朝] 弘和\"+(esc_myYR-1380)+\", [南朝] 元中\"+(esc_myYR-1383)+\", [北朝] 永徳\"+(esc_myYR-1380)+\", [北朝] 至徳\"+(esc_myYR-1383
			if ((esc_myYR>1384)&&(esc_myYR<=1386)) document.myFORM.myRESULT.value=\"[南朝] 元中\"+(esc_myYR-1383)+\", [北朝] 至徳\"+(esc_myYR-1383
			if (esc_myYR==1387) document.myFORM.myRESULT.value=\"[南朝] 元中\"+(esc_myYR-1383)+\", [北朝] 至徳\"+(esc_myYR-1383)+\", [北朝] 嘉慶\"+(esc_myYR-1386
			if (esc_myYR==1388) document.myFORM.myRESULT.value=\"[南朝] 元中\"+(esc_myYR-1383)+\", [北朝] 嘉慶\"+(esc_myYR-1386
			if (esc_myYR==1389) document.myFORM.myRESULT.value=\"[南朝] 元中\"+(esc_myYR-1383)+\", [北朝] 嘉慶\"+(esc_myYR-1386)+\", [北朝] 康応\"+(esc_myYR-1388
			if (esc_myYR==1390) document.myFORM.myRESULT.value=\"[南朝] 元中\"+(esc_myYR-1383)+\", [北朝] 康応\"+(esc_myYR-1388)+\", [北朝] 明徳\"+(esc_myYR-1389
			if ((esc_myYR>1390)&&(esc_myYR<=1392)) document.myFORM.myRESULT.value=\"[南朝] 元中\"+(esc_myYR-1383)+\", [北朝] 明徳\"+(esc_myYR-1389
			if (esc_myYR==1393) document.myFORM.myRESULT.value=\"明徳\"+(esc_myYR-1389)
			if (esc_myYR==1394) document.myFORM.myRESULT.value=\"明徳\"+(esc_myYR-1389)+\", 応永\"+(esc_myYR-1393
			if ((esc_myYR>1394)&&(esc_myYR<=1427)) document.myFORM.myRESULT.value=\"応永\"+(esc_myYR-1393
			if (esc_myYR==1428) document.myFORM.myRESULT.value=\"応永\"+(esc_myYR-1393)+\", 正長\"+(esc_myYR-1427
			if ((esc_myYR>1428)&&(esc_myYR<=1428)) document.myFORM.myRESULT.value=\"正長\"+(esc_myYR-1427
			if (esc_myYR==1429) document.myFORM.myRESULT.value=\"永享\"+(esc_myYR-1428)+\", [鎌倉公方] 正長\"+(esc_myYR-1427
			if ((esc_myYR>1429)&&(esc_myYR<=1439)) document.myFORM.myRESULT.value=\"永享\"+(esc_myYR-1428)+\", [鎌倉公方] 正長\"+(esc_myYR-1427
			if (esc_myYR==1440) document.myFORM.myRESULT.value=\"永享\"+(esc_myYR-1428
			if (esc_myYR==1441) document.myFORM.myRESULT.value=\"永享\"+(esc_myYR-1428)+\", 嘉吉\"+(esc_myYR-1440
			if ((esc_myYR>1441)&&(esc_myYR<=1443)) document.myFORM.myRESULT.value=\"嘉吉\"+(esc_myYR-1440
			if (esc_myYR==1444) document.myFORM.myRESULT.value=\"嘉吉\"+(esc_myYR-1440)+\", 文安\"+(esc_myYR-1443
			if ((esc_myYR>1444)&&(esc_myYR<=1448)) document.myFORM.myRESULT.value=\"文安\"+(esc_myYR-1443
			if (esc_myYR==1449) document.myFORM.myRESULT.value=\"文安\"+(esc_myYR-1443)+\", 宝徳\"+(esc_myYR-1448
			if ((esc_myYR>1449)&&(esc_myYR<=1451)) document.myFORM.myRESULT.value=\"宝徳\"+(esc_myYR-1448
			if (esc_myYR==1452) document.myFORM.myRESULT.value=\"宝徳\"+(esc_myYR-1448)+\", 享徳\"+(esc_myYR-1451
			if ((esc_myYR>1452)&&(esc_myYR<=1454)) document.myFORM.myRESULT.value=\"享徳\"+(esc_myYR-1451
			if (esc_myYR==1455) document.myFORM.myRESULT.value=\"康正\"+(esc_myYR-1454)+\", [古河公方] 享徳\"+(esc_myYR-1451
			if ((esc_myYR>1455)&&(esc_myYR<=1456)) document.myFORM.myRESULT.value=\"康正\"+(esc_myYR-1454)+\", [古河公方] 享徳\"+(esc_myYR-1451
			if (esc_myYR==1457) document.myFORM.myRESULT.value=\"康正\"+(esc_myYR-1454)+\", 長禄\"+(esc_myYR-1456)+\", [古河公方] 享徳\"+(esc_myYR-1451
			if ((esc_myYR>1457)&&(esc_myYR<=1459)) document.myFORM.myRESULT.value=\"長禄\"+(esc_myYR-1456)+\", [古河公方] 享徳\"+(esc_myYR-1451
			if (esc_myYR==1460) document.myFORM.myRESULT.value=\"長禄\"+(esc_myYR-1456)+\", 寛正\"+(esc_myYR-1459)+\", [古河公方] 享徳\"+(esc_myYR-1451
			if ((esc_myYR>1462)&&(esc_myYR<=1465)) document.myFORM.myRESULT.value=\"寛正\"+(esc_myYR-1459)+\", [古河公方] 享徳\"+(esc_myYR-1451
			if (esc_myYR==1466) document.myFORM.myRESULT.value=\"寛正\"+(esc_myYR-1459)+\", 文正\"+(esc_myYR-1465)+\", [古河公方] 享徳\"+(esc_myYR-1451
			if ((esc_myYR>1466)&&(esc_myYR<=1466)) document.myFORM.myRESULT.value=\"文正\"+(esc_myYR-1465)+\", [古河公方] 享徳\"+(esc_myYR-1451
			if (esc_myYR==1467) document.myFORM.myRESULT.value=\"文正\"+(esc_myYR-1465)+\", 応仁\"+(esc_myYR-1466)+\", [古河公方] 享徳\"+(esc_myYR-1451
			if ((esc_myYR>1467)&&(esc_myYR<=1468)) document.myFORM.myRESULT.value=\"応仁\"+(esc_myYR-1466)+\", [古河公方] 享徳\"+(esc_myYR-1451
			if (esc_myYR==1469) document.myFORM.myRESULT.value=\"応仁\"+(esc_myYR-1466)+\", 文明\"+(esc_myYR-1468)+\", [古河公方] 享徳\"+(esc_myYR-1451
			if ((esc_myYR>1469)&&(esc_myYR<=1478)) document.myFORM.myRESULT.value=\"文明\"+(esc_myYR-1468)+\", [古河公方] 享徳\"+(esc_myYR-1451
			if ((esc_myYR>1478)&&(esc_myYR<=1486)) document.myFORM.myRESULT.value=\"文明\"+(esc_myYR-1468
			if (esc_myYR==1487) document.myFORM.myRESULT.value=\"文明\"+(esc_myYR-1468)+\", 長享\"+(esc_myYR-1486
			if ((esc_myYR>1487)&&(esc_myYR<=1488)) document.myFORM.myRESULT.value=\"長享\"+(esc_myYR-1486
			if (esc_myYR==1489) document.myFORM.myRESULT.value=\"長享\"+(esc_myYR-1486)+\", 延徳\"+(esc_myYR-1488
			if ((esc_myYR>1489)&&(esc_myYR<=1491)) document.myFORM.myRESULT.value=\"延徳\"+(esc_myYR-1488
			if (esc_myYR==1492) document.myFORM.myRESULT.value=\"延徳\"+(esc_myYR-1488)+\", 明応\"+(esc_myYR-1491
			if ((esc_myYR>1492)&&(esc_myYR<=1500)) document.myFORM.myRESULT.value=\"明応\"+(esc_myYR-1491
			if (esc_myYR==1501) document.myFORM.myRESULT.value=\"明応\"+(esc_myYR-1491)+\", 文亀\"+(esc_myYR-1500
			if ((esc_myYR>1501)&&(esc_myYR<=1503)) document.myFORM.myRESULT.value=\"文亀\"+(esc_myYR-1500
			if (esc_myYR==1504) document.myFORM.myRESULT.value=\"文亀\"+(esc_myYR-1500)+\", 永正\"+(esc_myYR-1503
			if ((esc_myYR>1504)&&(esc_myYR<=1520)) document.myFORM.myRESULT.value=\"永正\"+(esc_myYR-1503
			if (esc_myYR==1521) document.myFORM.myRESULT.value=\"永正\"+(esc_myYR-1503)+\", 大永\"+(esc_myYR-1520
			if ((esc_myYR>1521)&&(esc_myYR<=1527)) document.myFORM.myRESULT.value=\"大永\"+(esc_myYR-1520
			if (esc_myYR==1528) document.myFORM.myRESULT.value=\"享禄\"+(esc_myYR-1527)+\", [堺公方] 大永\"+(esc_myYR-1520
			if ((esc_myYR>1528)&&(esc_myYR<=1531)) document.myFORM.myRESULT.value=\"享禄\"+(esc_myYR-1527)+\", [堺公方] 大永\"+(esc_myYR-1520
			if (esc_myYR==1532) document.myFORM.myRESULT.value=\"享禄\"+(esc_myYR-1527)+\", 天文\"+(esc_myYR-1531)+\", [堺公方] 大永\"+(esc_myYR-1520
			if ((esc_myYR>1532)&&(esc_myYR<=1533)) document.myFORM.myRESULT.value=\"天文\"+(esc_myYR-1531
			if ((esc_myYR>1533)&&(esc_myYR<=1554)) document.myFORM.myRESULT.value=\"天文\"+(esc_myYR-1531)+\", 信長数え歳\"+(esc_myYR-1533
			if (esc_myYR==1555) document.myFORM.myRESULT.value=\"天文\"+(esc_myYR-1531)+\", 弘治\"+(esc_myYR-1554)+\", 信長数え歳\"+(esc_myYR-1533
			if ((esc_myYR>1555)&&(esc_myYR<=1557)) document.myFORM.myRESULT.value=\"弘治\"+(esc_myYR-1554)+\", 信長数え歳\"+(esc_myYR-1533
			if (esc_myYR==1558) document.myFORM.myRESULT.value=\"弘治\"+(esc_myYR-1554)+\", 永禄\"+(esc_myYR-1557)+\", 信長数え歳\"+(esc_myYR-1533
			if ((esc_myYR>1558)&&(esc_myYR<=1569)) document.myFORM.myRESULT.value=\"永禄\"+(esc_myYR-1557)+\", 信長数え歳\"+(esc_myYR-1533
			if (esc_myYR==1570) document.myFORM.myRESULT.value=\"永禄\"+(esc_myYR-1557)+\", 元亀\"+(esc_myYR-1569
			if ((esc_myYR>1570)&&(esc_myYR<=1572)) document.myFORM.myRESULT.value=\"元亀\"+(esc_myYR-1569)+\", 信長数え歳\"+(esc_myYR-1533
			if (esc_myYR==1573) document.myFORM.myRESULT.value=\"元亀\"+(esc_myYR-1569)+\", 天正\"+(esc_myYR-1572)+\", 信長数え歳\"+(esc_myYR-1533
			if ((esc_myYR>1573)&&(esc_myYR<=1582)) document.myFORM.myRESULT.value=\"天正\"+(esc_myYR-1572)+\", 信長数え歳\"+(esc_myYR-1533
			if ((esc_myYR>1582)&&(esc_myYR<=1591)) document.myFORM.myRESULT.value=\"天正\"+(esc_myYR-1572
			if (esc_myYR==1592) document.myFORM.myRESULT.value=\"天正\"+(esc_myYR-1572)+\", 文禄\"+(esc_myYR-1591
			if ((esc_myYR>1592)&&(esc_myYR<=1595)) document.myFORM.myRESULT.value=\"文禄\"+(esc_myYR-1591
			if (esc_myYR==1596) document.myFORM.myRESULT.value=\"文禄\"+(esc_myYR-1591)+\", 慶長\"+(esc_myYR-1595
			if ((esc_myYR>1596)&&(esc_myYR<=1614)) document.myFORM.myRESULT.value=\"慶長\"+(esc_myYR-1595
			if (esc_myYR==1615) document.myFORM.myRESULT.value=\"慶長\"+(esc_myYR-1595)+\", 元和\"+(esc_myYR-1614
			if ((esc_myYR>1615)&&(esc_myYR<=1623)) document.myFORM.myRESULT.value=\"元和\"+(esc_myYR-1614
			if (esc_myYR==1624) document.myFORM.myRESULT.value=\"元和\"+(esc_myYR-1614)+\", 寛永\"+(esc_myYR-1623
			if ((esc_myYR>1624)&&(esc_myYR<=1643)) document.myFORM.myRESULT.value=\"寛永\"+(esc_myYR-1623
			if (esc_myYR==1644) document.myFORM.myRESULT.value=\"寛永\"+(esc_myYR-1623)+\", 正保\"+(esc_myYR-1643
			if ((esc_myYR>1644)&&(esc_myYR<=1647)) document.myFORM.myRESULT.value=\"正保\"+(esc_myYR-1643
			if (esc_myYR==1648) document.myFORM.myRESULT.value=\"正保\"+(esc_myYR-1643)+\", 慶安\"+(esc_myYR-1647
			if ((esc_myYR>1648)&&(esc_myYR<=1651)) document.myFORM.myRESULT.value=\"慶安\"+(esc_myYR-1647
			if (esc_myYR==1652) document.myFORM.myRESULT.value=\"慶安\"+(esc_myYR-1647)+\", 承応\"+(esc_myYR-1651
			if ((esc_myYR>1652)&&(esc_myYR<=1654)) document.myFORM.myRESULT.value=\"承応\"+(esc_myYR-1651
			if (esc_myYR==1655) document.myFORM.myRESULT.value=\"承応\"+(esc_myYR-1651)+\", 明暦\"+(esc_myYR-1654
			if ((esc_myYR>1655)&&(esc_myYR<=1657)) document.myFORM.myRESULT.value=\"明暦\"+(esc_myYR-1654
			if (esc_myYR==1658) document.myFORM.myRESULT.value=\"明暦\"+(esc_myYR-1654)+\", 万治\"+(esc_myYR-1657
			if ((esc_myYR>1658)&&(esc_myYR<=1660)) document.myFORM.myRESULT.value=\"万治\"+(esc_myYR-1657
			if (esc_myYR==1661) document.myFORM.myRESULT.value=\"万治\"+(esc_myYR-1657)+\", 寛文\"+(esc_myYR-1660
			if ((esc_myYR>1661)&&(esc_myYR<=1672)) document.myFORM.myRESULT.value=\"寛文\"+(esc_myYR-1660
			if (esc_myYR==1673) document.myFORM.myRESULT.value=\"寛文\"+(esc_myYR-1660)+\", 延宝\"+(esc_myYR-1672
			if ((esc_myYR>1673)&&(esc_myYR<=1680)) document.myFORM.myRESULT.value=\"延宝\"+(esc_myYR-1672
			if (esc_myYR==1681) document.myFORM.myRESULT.value=\"延宝\"+(esc_myYR-1672)+\", 天和\"+(esc_myYR-1680
			if ((esc_myYR>1681)&&(esc_myYR<=1683)) document.myFORM.myRESULT.value=\"天和\"+(esc_myYR-1680
			if (esc_myYR==1684) document.myFORM.myRESULT.value=\"天和\"+(esc_myYR-1680)+\", 貞享\"+(esc_myYR-1683
			if ((esc_myYR>1684)&&(esc_myYR<=1687)) document.myFORM.myRESULT.value=\"貞享\"+(esc_myYR-1683
			if (esc_myYR==1688) document.myFORM.myRESULT.value=\"貞享\"+(esc_myYR-1683)+\", 元禄\"+(esc_myYR-1687
			if ((esc_myYR>1688)&&(esc_myYR<=1703)) document.myFORM.myRESULT.value=\"元禄\"+(esc_myYR-1687
			if (esc_myYR==1704) document.myFORM.myRESULT.value=\"元禄\"+(esc_myYR-1687)+\", 宝永\"+(esc_myYR-1703
			if ((esc_myYR>1704)&&(esc_myYR<=1710)) document.myFORM.myRESULT.value=\"宝永\"+(esc_myYR-1703
			if (esc_myYR==1711) document.myFORM.myRESULT.value=\"宝永\"+(esc_myYR-1703)+\", 正徳\"+(esc_myYR-1710
			if ((esc_myYR>1711)&&(esc_myYR<=1715)) document.myFORM.myRESULT.value=\"正徳\"+(esc_myYR-1710
			if (esc_myYR==1716) document.myFORM.myRESULT.value=\"正徳\"+(esc_myYR-1710)+\", 享保\"+(esc_myYR-1715
			if ((esc_myYR>1716)&&(esc_myYR<=1735)) document.myFORM.myRESULT.value=\"享保\"+(esc_myYR-1715
			if (esc_myYR==1736) document.myFORM.myRESULT.value=\"享保\"+(esc_myYR-1715)+\", 元文\"+(esc_myYR-1735
			if ((esc_myYR>1736)&&(esc_myYR<=1740)) document.myFORM.myRESULT.value=\"元文\"+(esc_myYR-1735
			if (esc_myYR==1741) document.myFORM.myRESULT.value=\"元文\"+(esc_myYR-1735)+\", 寛保\"+(esc_myYR-1740
			if ((esc_myYR>1741)&&(esc_myYR<=1743)) document.myFORM.myRESULT.value=\"寛保\"+(esc_myYR-1740
			if (esc_myYR==1744) document.myFORM.myRESULT.value=\"寛保\"+(esc_myYR-1740)+\", 延享\"+(esc_myYR-1743
			if ((esc_myYR>1743)&&(esc_myYR<=1747)) document.myFORM.myRESULT.value=\"延享\"+(esc_myYR-1743
			if (esc_myYR==1748) document.myFORM.myRESULT.value=\"延享\"+(esc_myYR-1743)+\", 寛延\"+(esc_myYR-1747
			if ((esc_myYR>1747)&&(esc_myYR<=1750)) document.myFORM.myRESULT.value=\"寛延\"+(esc_myYR-1747
			if (esc_myYR==1751) document.myFORM.myRESULT.value=\"寛延\"+(esc_myYR-1747)+\", 宝暦\"+(esc_myYR-1750
			if ((esc_myYR>1751)&&(esc_myYR<=1763)) document.myFORM.myRESULT.value=\"宝暦\"+(esc_myYR-1750
			if (esc_myYR==1764) document.myFORM.myRESULT.value=\"宝暦\"+(esc_myYR-1750)+\", 明和\"+(esc_myYR-1763
			if ((esc_myYR>1764)&&(esc_myYR<=1771)) document.myFORM.myRESULT.value=\"明和\"+(esc_myYR-1763
			if (esc_myYR==1772) document.myFORM.myRESULT.value=\"明和\"+(esc_myYR-1763)+\", 安永\"+(esc_myYR-1771
			if ((esc_myYR>1772)&&(esc_myYR<=1780)) document.myFORM.myRESULT.value=\"安永\"+(esc_myYR-1771
			if (esc_myYR==1781) document.myFORM.myRESULT.value=\"安永\"+(esc_myYR-1771)+\", 天明\"+(esc_myYR-1780
			if ((esc_myYR>1781)&&(esc_myYR<=1788)) document.myFORM.myRESULT.value=\"天明\"+(esc_myYR-1780
			if (esc_myYR==1789) document.myFORM.myRESULT.value=\"天明\"+(esc_myYR-1780)+\", 寛政\"+(esc_myYR-1788
			if ((esc_myYR>1789)&&(esc_myYR<=1800)) document.myFORM.myRESULT.value=\"寛政\"+(esc_myYR-1788
			if (esc_myYR==1801) document.myFORM.myRESULT.value=\"寛政\"+(esc_myYR-1788)+\", 享和\"+(esc_myYR-1800
			if ((esc_myYR>1801)&&(esc_myYR<=1803)) document.myFORM.myRESULT.value=\"享和\"+(esc_myYR-1800
			if (esc_myYR==1804) document.myFORM.myRESULT.value=\"享和\"+(esc_myYR-1800)+\", 文化\"+(esc_myYR-1803
			if ((esc_myYR>1804)&&(esc_myYR<=1817)) document.myFORM.myRESULT.value=\"文化\"+(esc_myYR-1803
			if (esc_myYR==1818) document.myFORM.myRESULT.value=\"文化\"+(esc_myYR-1803)+\", 文政\"+(esc_myYR-1817
			if ((esc_myYR>1818)&&(esc_myYR<=1829)) document.myFORM.myRESULT.value=\"文政\"+(esc_myYR-1817
			if (esc_myYR==1830) document.myFORM.myRESULT.value=\"文政\"+(esc_myYR-1817)+\", 天保\"+(esc_myYR-1829
			if ((esc_myYR>1830)&&(esc_myYR<=1843)) document.myFORM.myRESULT.value=\"天保\"+(esc_myYR-1829
			if (esc_myYR==1844) document.myFORM.myRESULT.value=\"天保\"+(esc_myYR-1829)+\", 弘化\"+(esc_myYR-1843
			if ((esc_myYR>1844)&&(esc_myYR<=1847)) document.myFORM.myRESULT.value=\"弘化\"+(esc_myYR-1843
			if (esc_myYR==1848) document.myFORM.myRESULT.value=\"弘化\"+(esc_myYR-1843)+\", 嘉永\"+(esc_myYR-1847
			if ((esc_myYR>1848)&&(esc_myYR<=1853)) document.myFORM.myRESULT.value=\"嘉永\"+(esc_myYR-1847
			if (esc_myYR==1854) document.myFORM.myRESULT.value=\"嘉永\"+(esc_myYR-1847)+\", 安政\"+(esc_myYR-1853
			if ((esc_myYR>1854)&&(esc_myYR<=1859)) document.myFORM.myRESULT.value=\"安政\"+(esc_myYR-1853
			if (esc_myYR==1860) document.myFORM.myRESULT.value=\"安政\"+(esc_myYR-1853)+\", 万延\"+(esc_myYR-1859
			if (esc_myYR==1861) document.myFORM.myRESULT.value=\"万延\"+(esc_myYR-1859)+\", 文久\"+(esc_myYR-1860
			if ((esc_myYR>1861)&&(esc_myYR<=1863)) document.myFORM.myRESULT.value=\"文久\"+(esc_myYR-1860
			if (esc_myYR==1864) document.myFORM.myRESULT.value=\"文久\"+(esc_myYR-1860)+\", 元治\"+(esc_myYR-1863
			if (esc_myYR==1865) document.myFORM.myRESULT.value=\"元治\"+(esc_myYR-1863)+\", 慶應\"+(esc_myYR-1864
			if ((esc_myYR>1865)&&(esc_myYR<=1867)) document.myFORM.myRESULT.value=\"慶應\"+(esc_myYR-1864
			if (esc_myYR==1868) document.myFORM.myRESULT.value=\"慶應\"+(esc_myYR-1864)+\", 明治\"+(esc_myYR-1867
			if ((esc_myYR>1868)&&(esc_myYR<=1911)) document.myFORM.myRESULT.value=\"明治\"+(esc_myYR-1867
			if (esc_myYR==1912) document.myFORM.myRESULT.value=\"明治\"+(esc_myYR-1867)+\", 大正\"+(esc_myYR-1911
			if ((esc_myYR>1912)&&(esc_myYR<=1925)) document.myFORM.myRESULT.value=\"大正\"+(esc_myYR-1911
			if (esc_myYR==1926) document.myFORM.myRESULT.value=\"大正\"+(esc_myYR-1911)+\", 昭和\"+(esc_myYR-1925
			if ((esc_myYR>1926)&&(esc_myYR<=1988)) document.myFORM.myRESULT.value=\"昭和\"+(esc_myYR-1925
			if (esc_myYR==1989) document.myFORM.myRESULT.value=\"昭和\"+(esc_myYR-1925)+\", 平成\"+(esc_myYR-1988
			if (esc_myYR>1989) document.myFORM.myRESULT.value=\"平成\"+(esc_myYR-1988
		} else {
			if (esc_myYR >= 10000) {
				alert("その年はありません。");
				return false;
			}
			esc_myRESULT=document.myFORM.myRESULT.value;
			if (esc_myRESULT <= 0) {
				esc_myBC=(esc_myRESULT-1)*-1;
				document.myFORM.myRESULT.value=(esc_myRESULT)+\" (BC\"+(esc_myBC)+\")\";
			}
		}
			}
			self.focus(
			isNN2 = (navigator.appVersion.charAt(0) >= 2 && (navigator.appName).indexOf(\"Netscape\") != -1
			isIE3 = (navigator.appVersion.charAt(0) >= 3 && (navigator.appVersion).indexOf(\"MSIE\") != -1
			function getKEYCODE(e){
// --押されたキ－コ－ドを返す
if(document.layers) return e.which;
if(document.all) return event.keyCode;
			}
			function keypres(e){
// マウスダウンした時に実行する命令を
// このファンクション内に書きます
// --キ－コ－ドを文字に直す
// var keyName=String.fromCharCode(getKEYCODE(e)
// alert(getKEYCODE(e)
if (getKEYCODE(e) == \"13\") { getValue( }
if (getKEYCODE(e) == \"10\") {
	document.myFORM.myYR.value=\"\";
	document.myFORM.myRESULT.value=\"\";
	if ( isNN2 || isIE3 ) { document.myFORM.myYR.focus( }
}
if (getKEYCODE(e) == \"110\") {
	document.myFORM.reset(
	if ( isNN2 || isIE3 ) { document.myKANSHI.myRESULT.focus( }
	document.myKANSHI.reset(
}
if (getKEYCODE(e) == \"112\") {
	document.myKANSHI.reset(
	if ( isNN2 || isIE3 ) { document.myFORM.myYR.focus( }
	document.myFORM.reset(
}
if (getKEYCODE(e) == \"127\") {
	document.myFORM.reset(
	document.myKANSHI.reset(
	if ( isNN2 || isIE3 ) { document.myFORM.myYR.focus( }
}
			}
			document.onkeypress=keypres;
			if(document.layers)document.captureEvents(Event.KEYPRESS)
			function kanshi () {
document.myKANSHI.myRESULT.value=document.myKANSHI.myNG.options[document.myKANSHI.myNG.selectedIndex].value;
if ( isNN2 || isIE3 ) { document.myKANSHI.myRESULT.focus( }
			}
			<select name=\"myNG\">
<option selected value=\"nengo\">西暦→年号・天皇</option>
<option value=\"-660\">皇紀(神武暦)→西暦</option>
<option value=\"----\">---------------</option>
<option value=\"-660\">１ 神武天皇</option>
<option value=\"-584\">― 手研耳命</option>
<option value=\"-581\">２ 綏靖天皇</option>
<option value=\"-548\">３ 安寧天皇</option>
<option value=\"-510\">４ 懿徳天皇</option>
<option value=\"-475\">５ 孝昭天皇</option>
<option value=\"-392\">６ 孝安天皇</option>
<option value=\"-290\">７ 孝霊天皇</option>
<option value=\"-214\">８ 孝元天皇</option>
<option value=\"-157\">９ 開化天皇</option>
<option value=\"-97\">10 崇神天皇</option>
<option value=\"-29\">11 垂仁天皇</option>
<option value=\"70\">12 景行天皇</option>
<option value=\"130\">13 成務天皇</option>
<option value=\"187\">[邪馬台国] 卑弥呼</option>
<option value=\"191\">14 仲哀天皇</option>
<option value=\"200\">― 神功皇后</option>
<option value=\"248\">[邪馬台国] 壱与</option>
<option value=\"269\">15 応神天皇</option>
<option value=\"310\">― 菟道稚郎子</option>
<option value=\"312\">16 仁徳天皇</option>
<option value=\"399\">17 履中天皇</option>
<option value=\"405\">18 反正天皇</option>
<option value=\"411\">19 允恭天皇</option>
<option value=\"453\">20 安康天皇</option>
<option value=\"456\">21 雄略天皇</option>
<option value=\"479\">22 清寧天皇</option>
<option value=\"483\">― 飯豊皇女</option>
<option value=\"484\">23 顕宗天皇</option>
<option value=\"487\">24 仁賢天皇</option>
<option value=\"498\">25 武烈天皇</option>
<option value=\"506\">26 継体天皇</option>
<option value=\"531\">[二朝並立] 欽明</option>
<option value=\"533\">27 安閑天皇</option>
<option value=\"535\">28 宣化天皇</option>
<option value=\"539\">29 欽明天皇</option>
<option value=\"571\">30 敏達天皇</option>
<option value=\"585\">31 用明天皇</option>
<option value=\"587\">32 崇峻天皇</option>
<option value=\"592\">33 推古天皇</option>
<option value=\"628\">34 舒明天皇</option>
<option value=\"641\">35 皇極天皇</option>
<option value=\"644\">36 孝徳天皇</option>
<option value=\"644\">大化 (645～)</option>
<option value=\"649\">白雉 (650～)</option>
<option value=\"654\">37 斉明天皇</option>
<option value=\"661\">38 天智天皇</option>
<option value=\"671\">39 弘文天皇</option>
<option value=\"671\">40 天武天皇</option>
<option value=\"671\">[寺社] 白鳳 (672～)</option>
<option value=\"685\">朱鳥 (650～)</option>
<option value=\"686\">41 持統天皇</option>
<option value=\"696\">42 文武天皇</option>
<option value=\"700\">大宝 (701～)</option>
<option value=\"703\">慶雲 (704～)</option>
<option value=\"707\">和銅 (708～)</option>
<option value=\"714\">霊亀 (715～)</option>
<option value=\"716\">養老 (717～)</option>
<option value=\"723\">神亀 (724～)</option>
<option value=\"728\">天平 (729～)</option>
<option value=\"748\">天平感宝 (749～)</option>
<option value=\"748\">天平勝宝 (749～)</option>
<option value=\"756\">天平宝字 (757～)</option>
<option value=\"764\">天平神護 (765～)</option>
<option value=\"766\">神護景雲 (767～)</option>
<option value=\"769\">宝亀 (770～)</option>
<option value=\"780\">天応 (781～)</option>
<option value=\"781\">延暦 (782～)</option>
<option value=\"805\">大同 (806～)</option>
<option value=\"809\">弘仁 (810～)</option>
<option value=\"823\">天長 (824～)</option>
<option value=\"833\">承和 (834～)</option>
<option value=\"847\">嘉祥 (848～)</option>
<option value=\"850\">仁寿 (851～)</option>
<option value=\"853\">斉衡 (854～)</option>
<option value=\"856\">天安 (857～)</option>
<option value=\"858\">貞観 (859～)</option>
<option value=\"876\">元慶 (877～)</option>
<option value=\"884\">仁和 (885～)</option>
<option value=\"888\">寛平 (889～)</option>
<option value=\"897\">昌泰 (898～)</option>
<option value=\"900\">延喜 (901～)</option>
<option value=\"922\">延長 (923～)</option>
<option value=\"930\">承平 (931～)</option>
<option value=\"937\">天慶 (938～)</option>
<option value=\"946\">天暦 (947～)</option>
<option value=\"956\">天徳 (957～)</option>
<option value=\"960\">応和 (961～)</option>
<option value=\"963\">康保 (964～)</option>
<option value=\"967\">安和 (968～)</option>
<option value=\"969\">天禄 (970～)</option>
<option value=\"972\">天延 (973～)</option>
<option value=\"975\">貞元 (976～)</option>
<option value=\"977\">天元 (978～)</option>
<option value=\"982\">永観 (983～)</option>
<option value=\"984\">寛和 (985～)</option>
<option value=\"986\">永延 (987～)</option>
<option value=\"988\">永祚 (989～)</option>
<option value=\"989\">正暦 (990～)</option>
<option value=\"994\">長徳 (995～)</option>
<option value=\"998\">長保 (999～)</option>
<option value=\"1003\">寛弘 (1004～)</option>
<option value=\"1011\">長和 (1012～)</option>
<option value=\"1016\">寛仁 (1017～)</option>
<option value=\"1020\">治安 (1021～)</option>
<option value=\"1023\">万寿 (1024～)</option>
<option value=\"1027\">長元 (1028～)</option>
<option value=\"1036\">長暦 (1037～)</option>
<option value=\"1039\">長久 (1040～)</option>
<option value=\"1043\">寛徳 (1044～)</option>
<option value=\"1045\">永承 (1046～)</option>
<option value=\"1052\">天喜 (1053～)</option>
<option value=\"1057\">康平 (1058～)</option>
<option value=\"1064\">治暦 (1065～)</option>
<option value=\"1068\">延久 (1069～)</option>
<option value=\"1073\">承保 (1074～)</option>
<option value=\"1076\">承暦 (1077～)</option>
<option value=\"1080\">永保 (1081～)</option>
<option value=\"1083\">応徳 (1084～)</option>
<option value=\"1086\">寛治 (1087～)</option>
<option value=\"1093\">嘉保 (1094～)</option>
<option value=\"1095\">永長 (1096～)</option>
<option value=\"1096\">承徳 (1097～)</option>
<option value=\"1098\">康和 (1099～)</option>
<option value=\"1103\">長治 (1104～)</option>
<option value=\"1105\">嘉承 (1106～)</option>
<option value=\"1107\">天仁 (1108～)</option>
<option value=\"1109\">天永 (1110～)</option>
<option value=\"1112\">永久 (1113～)</option>
<option value=\"1117\">元永 (1118～)</option>
<option value=\"1119\">保安 (1120～)</option>
<option value=\"1123\">天治 (1124～)</option>
<option value=\"1125\">大治 (1126～)</option>
<option value=\"1130\">天承 (1131～)</option>
<option value=\"1131\">長承 (1132～)</option>
<option value=\"1134\">保延 (1135～)</option>
<option value=\"1140\">永治 (1141～)</option>
<option value=\"1141\">康治 (1142～)</option>
<option value=\"1143\">天養 (1144～)</option>
<option value=\"1144\">久安 (1145～)</option>
<option value=\"1150\">仁平 (1151～)</option>
<option value=\"1153\">久寿 (1154～)</option>
<option value=\"1155\">保元 (1156～)</option>
<option value=\"1158\">平治 (1159～)</option>
<option value=\"1159\">永暦 (1160～)</option>
<option value=\"1160\">応保 (1161～)</option>
<option value=\"1162\">長寛 (1163～)</option>
<option value=\"1164\">永万 (1165～)</option>
<option value=\"1165\">仁安 (1166～)</option>
<option value=\"1168\">嘉応 (1169～)</option>
<option value=\"1170\">承安 (1171～)</option>
<option value=\"1174\">安元 (1175～)</option>
<option value=\"1176\">[源氏] 治承 (1177～)</option>
<option value=\"1180\">[平氏] 養和 (1181～)</option>
<option value=\"1181\">[平氏] 寿永 (1182～)</option>
<option value=\"1183\">[源氏] 元暦 (1184～)</option>
<option value=\"1184\">文治 (1185～)</option>
<option value=\"1189\">建久 (1190～)</option>
<option value=\"1198\">正治 (1199～)</option>
<option value=\"1200\">建仁 (1201～)</option>
<option value=\"1203\">元久 (1204～)</option>
<option value=\"1205\">建永 (1206～)</option>
<option value=\"1206\">承元 (1207～)</option>
<option value=\"1210\">建暦 (1211～)</option>
<option value=\"1212\">建保 (1213～)</option>
<option value=\"1218\">承久 (1219～)</option>
<option value=\"1221\">貞応 (1222～)</option>
<option value=\"1223\">元仁 (1224～)</option>
<option value=\"1224\">嘉禄 (1225～)</option>
<option value=\"1226\">安貞 (1227～)</option>
<option value=\"1228\">寛喜 (1229～)</option>
<option value=\"1231\">貞永 (1232～)</option>
<option value=\"1232\">天福 (1233～)</option>
<option value=\"1233\">文暦 (1234～)</option>
<option value=\"1234\">嘉禎 (1235～)</option>
<option value=\"1237\">暦仁 (1238～)</option>
<option value=\"1238\">延応 (1239～)</option>
<option value=\"1239\">仁治 (1240～)</option>
<option value=\"1242\">寛元 (1243～)</option>
<option value=\"1246\">宝治 (1247～)</option>
<option value=\"1248\">建長 (1249～)</option>
<option value=\"1255\">康元 (1256～)</option>
<option value=\"1256\">正嘉 (1257～)</option>
<option value=\"1258\">正元 (1259～)</option>
<option value=\"1259\">文応 (1260～)</option>
<option value=\"1260\">弘長 (1261～)</option>
<option value=\"1263\">文永 (1264～)</option>
<option value=\"1274\">建治 (1275～)</option>
<option value=\"1277\">弘安 (1278～)</option>
<option value=\"1287\">正応 (1288～)</option>
<option value=\"1292\">永仁 (1293～)</option>
<option value=\"1298\">正安 (1299～)</option>
<option value=\"1301\">乾元 (1302～)</option>
<option value=\"1302\">嘉元 (1303～)</option>
<option value=\"1305\">徳治 (1306～)</option>
<option value=\"1307\">延慶 (1308～)</option>
<option value=\"1310\">応長 (1311～)</option>
<option value=\"1311\">正和 (1312～)</option>
<option value=\"1316\">文保 (1317～)</option>
<option value=\"1318\">元応 (1319～)</option>
<option value=\"1320\">元亨 (1321～)</option>
<option value=\"1323\">正中 (1324～)</option>
<option value=\"1325\">嘉暦 (1326～)</option>
<option value=\"1328\">元徳 (1329～)</option>
<option value=\"1330\">[南朝] 元弘 (1331～)</option>
<option value=\"1331\">[北朝] 正慶 (1332～)</option>
<option value=\"1333\">[北朝] 建武 (1334～)</option>
<option value=\"1335\">[南朝] 延元 (1336～)</option>
<option value=\"1337\">[北朝] 暦応 (1338～)</option>
<option value=\"1339\">[南朝] 興国 (1340～)</option>
<option value=\"1341\">[北朝] 康永 (1342～)</option>
<option value=\"1344\">[北朝] 貞和 (1345～)</option>
<option value=\"1345\">[南朝] 正平 (1346～)</option>
<option value=\"1349\">[北朝] 観応 (1350～)</option>
<option value=\"1351\">[北朝] 文和 (1352～)</option>
<option value=\"1355\">[北朝] 延文 (1356～)</option>
<option value=\"1360\">[北朝] 康安 (1361～)</option>
<option value=\"1361\">[北朝] 貞治 (1362～)</option>
<option value=\"1367\">[北朝] 応安 (1368～)</option>
<option value=\"1369\">[南朝] 建徳 (1370～)</option>
<option value=\"1371\">[南朝] 文中 (1372～)</option>
<option value=\"1374\">[北朝] 永和 (1375～)</option>
<option value=\"1374\">[南朝] 天授 (1375～)</option>
<option value=\"1378\">[北朝] 康暦 (1379～)</option>
<option value=\"1380\">[南朝] 弘和 (1381～)</option>
<option value=\"1380\">[北朝] 永徳 (1381～)</option>
<option value=\"1383\">[北朝] 至徳 (1384～)</option>
<option value=\"1383\">[南朝] 元中 (1384～)</option>
<option value=\"1386\">[北朝] 嘉慶 (1387～)</option>
<option value=\"1388\">[北朝] 康応 (1389～)</option>
<option value=\"1389\">[北朝] 明徳 (1390～)</option>
<option value=\"1393\">応永 (1394～)</option>
<option value=\"1427\">[鎌倉] 正長 (1428～)</option>
<option value=\"1428\">永享 (1429～)</option>
<option value=\"1440\">嘉吉 (1441～)</option>
<option value=\"1443\">文安 (1444～)</option>
<option value=\"1448\">宝徳 (1449～)</option>
<option value=\"1451\">[古河] 享徳 (1452～)</option>
<option value=\"1454\">康正 (1455～)</option>
<option value=\"1456\">長禄 (1457～)</option>
<option value=\"1459\">寛正 (1460～)</option>
<option value=\"1465\">文正 (1466～)</option>
<option value=\"1466\">応仁 (1467～)</option>
<option value=\"1468\">文明 (1469～)</option>
<option value=\"1486\">長享 (1487～)</option>
<option value=\"1488\">延徳 (1489～)</option>
<option value=\"1491\">明応 (1492～)</option>
<option value=\"1500\">文亀 (1501～)</option>
<option value=\"1503\">永正 (1504～)</option>
<option value=\"1520\">[堺] 大永 (1521～)</option>
<option value=\"1527\">享禄 (1528～)</option>
<option value=\"1531\">天文 (1532～)</option>
<option value=\"1533\">― 織田信長 (数え歳)</option>
<option value=\"1554\">弘治 (1555～)</option>
<option value=\"1557\">永禄 (1558～)</option>
<option value=\"1569\">元亀 (1570～)</option>
<option value=\"1572\">天正 (1573～)</option>
<option value=\"1591\">文禄 (1592～)</option>
<option value=\"1595\">慶長 (1596～)</option>
<option value=\"1614\">元和 (1615～)</option>
<option value=\"1623\">寛永 (1624～)</option>
<option value=\"1643\">正保 (1644～)</option>
<option value=\"1647\">慶安 (1648～)</option>
<option value=\"1651\">承応 (1652～)</option>
<option value=\"1654\">明暦 (1655～)</option>
<option value=\"1657\">万治 (1658～)</option>
<option value=\"1660\">寛文 (1661～)</option>
<option value=\"1672\">延宝 (1673～)</option>
<option value=\"1680\">天和 (1681～)</option>
<option value=\"1683\">貞享 (1684～)</option>
<option value=\"1687\">元禄 (1688～)</option>
<option value=\"1703\">宝永 (1704～)</option>
<option value=\"1710\">正徳 (1711～)</option>
<option value=\"1715\">享保 (1716～)</option>
<option value=\"1735\">元文 (1736～)</option>
<option value=\"1740\">寛保 (1741～)</option>
<option value=\"1743\">延享 (1744～)</option>
<option value=\"1747\">寛延 (1748～)</option>
<option value=\"1750\">宝暦 (1751～)</option>
<option value=\"1763\">明和 (1764～)</option>
<option value=\"1771\">安永 (1772～)</option>
<option value=\"1780\">天明 (1783～)</option>
<option value=\"1788\">寛政 (1789～)</option>
<option value=\"1800\">享和 (1801～)</option>
<option value=\"1803\">文化 (1804～)</option>
<option value=\"1817\">文政 (1818～)</option>
<option value=\"1829\">天保 (1830～)</option>
<option value=\"1843\">弘化 (1844～)</option>
<option value=\"1847\">嘉永 (1848～)</option>
<option value=\"1853\">安政 (1854～)</option>
<option value=\"1859\">万延 (1860～)</option>
<option value=\"1860\">文久 (1861～)</option>
<option value=\"1863\">元治 (1864～)</option>
<option value=\"1864\">慶應 (1865～)</option>
<option value=\"1867\">明治 (1868～)</option>
<option value=\"1911\">大正 (1912～)</option>
<option value=\"1925\">昭和 (1926～)</option>
<option value=\"1988\">平成 (1989～)</option>
			</select>*/
	}
});
