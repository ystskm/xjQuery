/*
 *  Create by Y.Sakamoto 2010/08/20
 *  ----------------
 *  NECESSARY ALONE:
 *  	(1) class
 *  	(2) stringUtil
 *  	(3) i18n
 *  ----------------
 *  NECESSARY COMPLEX:
 *  	(1) form
 *  ----------------
 *  NECESSARY EXTEND:
 *  	(1) i18n.validator
 */

// jQuery extend
$.fn.ecValidate=function(settings){
	var settings=$.extend({},xjQuery.VALIDATOR._DefaultValidatorSettings,settings);
    if(settings.closeOnNewValidate)
        $(".xjbaseValidationError").fadeOut(150,function(){$(this).remove()});
    if(settings.errorCloseDocumentEvent)
        $(document).bind(settings.errorCloseDocumentEvent,function(){$(".xjbaseValidationError").fadeOut(150,function(){$(this).remove()})});
	var tgts;
	if(settings.selfValidation === true)
	    tgts = $(this).filter("[class*=validate]");
	else if(settings.inlineValidation === true)
	    tgts = $(this).find("[class*=validate]");
	if(tgts.length){
	    for(var i=0;i<tgts.length;i++)
	        $xj.data(tgts.eq(i),'xjbaseValidationSettings',settings);
        tgts.not("[type=checkbox]")[settings.validationEventSet](settings.validationEventTriggers,function(e){ 
            _inlinEvent(this,settings,e);
        });
        tgts.filter("[type=checkbox]")[settings.validationEventSet]("click", function(e){ 
            _inlinEvent(this,settings,e);
        });
	}
	if (!settings.selfValidation && settings.submitValidation === true){
		$(this).submit(function(caller){
			xjQuery.VALIDATOR._onSubmitValid = true;
			if(xjQuery.VALIDATOR.submitValidation(this,settings,caller) === false){
				var res=xjQuery.VALIDATOR.submitForm(this,settings);
				return res;
			}else
				return (typeof settings.failure == 'function')?settings.failure():false;
		});
	}else
		$(this).unbind("submit");
	if (settings.liveStart === true)
	    $(".xjbaseValidationError").live(settings.errorCloseEvent,function(){$(this).fadeOut(150,function(){$(this).remove()})});
	if (settings.returnIsValid === true)
		return xjQuery.VALIDATOR.submitValidation(this,settings)?false:true;
	return this;
	function _inlinEvent(caller,settings,event){
		if(xjQuery.VALIDATOR._intercept === false || !xjQuery.VALIDATOR._intercept){
			xjQuery.VALIDATOR._onSubmitValid=false;
			xjQuery.VALIDATOR._loadValidation(caller,settings,event); 
		}else{
			xjQuery.VALIDATOR._intercept = false;
		}
	}
};
$xj.add('VALIDATOR', {
	//inner parameters
	 _DefaultValidatorSettings:{
		 validationEventSet		:"bind"
		,validationEventTriggers:"focus focusout"
		,beforeInputEvents		:"focus"
		,errorCloseEvent		:"mouseover"
	    ,errorCloseDocumentEvent: false
	    ,closeOnNewValidate     : true
		,width					:180
		,slide					:30
		,opacity				:[0.95,0.78]
		,zIndex					:[5001,5000]
		,errorBackground		:['#66cc44','#ee0101']
		,errorArrowBackground	:['#88cc66','#ee0101']
 	    ,selfValidation         : false
		,inlineValidation		: true
		,submitValidation		: true
		,returnIsValid			: false
		,liveStart              : true
		,containerOverflow		: false
		,containerOverflowDOM	:""
		,scroll					: true
		,promptPosition			:"topRight"
	    ,beforeValidate         : function(v){return v}
		,success				: function() {return false}
		,failure				: function() {return false}
	}
    ,Validating:'execute'
	,AjaxValidArray:[]
    ,validating:function(val){
        return xjQuery.VALIDATOR.Validating = val;
    }
    ,dropValidateMessages:function(){
        $(".xjbaseValidationError").fadeOut(150,function(){$(this).remove()})
    }
	,_loadValidation: function(caller ,settings ,event) {
		var tgt = $(caller);
		var getRules = /\[(.*)\]/.exec(tgt.attr('class'));
		if(getRules === null)
			return true;
		if(!settings)
			settings = $xj.data(tgt ,'xjbaseValidationSettings');
		return !xjQuery.VALIDATOR._validateCall(caller ,getRules[1].split(/\[|,|\]/) ,settings ,event);
	}
	,_validateCall: function(caller ,rules ,settings ,event) {
	    /*
		if(!$(caller).attr("id")){
			alert("## xjQuery ERROR ## This field have no ID attribut( name & class displayed): "+$(caller).attr("name")+" "+$(caller).attr("class"));
			return;
		}*/
	    if(this.Validating != 'execute')
	        return this.Validating;

	    var promptText = "";
		var callerName = $(caller).attr("name");
		var callerType = $(caller).attr("type");
		var isBeforeInput=(settings && event && new RegExp(event.type).test(settings['beforeInputEvents']))?true:false;
		$xj.data(caller,'isBeforeInput',isBeforeInput);
		xjQuery.VALIDATOR.isError		= false;
		xjQuery.VALIDATOR.showTriangle 	= true ;
		var callerVal = settings.beforeValidate($(caller).val());
		for (var i=0; i<rules.length;i++){
			var mainrules=rules[i].split(/\(|\)/);
			if(event && $.inArray('submit',mainrules)!=-1)
				continue;
			switch (mainrules[0]){
			case "optional":
				if(isBeforeInput && $.inArray('always',mainrules)==-1)
					break;
				if(!$(caller).val()){
					xjQuery.VALIDATOR.closePrompt(caller);
					return xjQuery.VALIDATOR.isError;
				}
				break;
			case "required":
				_required(caller,rules);
				break;
			case "custom": 
				var subrules=rules[i+1].split(/\(|\)/);
				if(isBeforeInput && $.inArray('always',subrules)==-1)
					break;
				if($.inArray('reg',subrules)==-1)
					_customRegex(caller,subrules[0],i);
				else
					_fullcustomRegex(caller,subrules[0],i,($.inArray('not',subrules)==-1)?true:false);
				break;
			case "exemptString": 
				 _exemptString(caller,rules,i);
				 break;
			case "ajax": 
				if(!xjQuery.VALIDATOR.onSubmitValid)
					_ajax(caller,rules,i);	
				break;
			case "length":
				_length(caller,rules,i);
				break;
            case "range":
                _range(caller,rules,i);
                break;
			case "explain":
			    _explain(caller ,rules,i);
			    break;
			case "maxCheckbox": 
				_maxCheckbox(caller,rules,i);
			 	groupname = $(caller).attr("name");
			 	caller = $("input[name='"+groupname+"']");
			 	break;
			case "minCheckbox": 
				_minCheckbox(caller,rules,i);
				groupname = $(caller).attr("name");
			 	caller = $("input[name='"+groupname+"']");
			 	break;
			case "equals": 
				if(isBeforeInput)
					break;
				_equals(caller,rules,i);
				break;
			case "funcCall": 
		     	_funcCall(caller,rules,i);
		     	break;
			default:
				break;
			}
		}
		radioHack();
		if (xjQuery.VALIDATOR.isError === true){
			var linkTofieldText = "." +xjQuery.VALIDATOR.linkTofield(caller);
			if(linkTofieldText != ".")
				if(!$(linkTofieldText)[0])
					xjQuery.VALIDATOR.buildPrompt(caller,promptText,"error");
				else
					xjQuery.VALIDATOR.updatePromptText(caller,promptText);
			else
				xjQuery.VALIDATOR.updatePromptText(caller,promptText);
		}else
			xjQuery.VALIDATOR.closePrompt(caller);
		return xjQuery.VALIDATOR.isError;
		function radioHack(){
			if($("input[name='"+callerName+"']").size()> 1 && (callerType == "radio" || callerType == "checkbox")) {        // Hack for radio/checkbox group button, the validation go the first radio/checkbox of the group
				caller = $("input[name='"+callerName+"'][type!=hidden]:first");     
				xjQuery.VALIDATOR.showTriangle = false;
			}
	    }
		function _required(caller,rules){
			var callerType = $(caller).attr("type");
			if (callerType == "text" || callerType == "password" || callerType == "textarea" || callerType == "radio" || callerType == "checkbox"){
				if(!$(caller).ecVal()){
					xjQuery.VALIDATOR.isError = true;
					if($(caller).attr("name"))
					    promptText += $xj.message('xjbase_requirederr',$xj.word($(caller).attr("name")),$xj.word('is'))+"<br />";
					else
					    promptText += $xj.message('xjbase_requirederr','','') +"<br />";
				}
			}
			if (callerType == "select-one") { // added by paul@kinetek.net for select boxes, Thank you		
				if(!$(caller).val()) {
					xjQuery.VALIDATOR.isError = true;
					promptText += xjQuery.VALIDATOR.settings.allrules[rules[i]].alertText+"<br />";
				}
			}
			if (callerType == "select-multiple") { // added by paul@kinetek.net for select boxes, Thank you	
				if(!$(caller).find("option:selected").val()) {
					xjQuery.VALIDATOR.isError = true;
					promptText += xjQuery.VALIDATOR.settings.allrules[rules[i]].alertText+"<br />";
				}
			}
		}
		function _fullcustomRegex(caller,customRule,position,not){		 // VALIDATE REGEX RULES
			var pattern = new RegExp(customRule);
			var judge = pattern.test($(caller).ecVal());
			if(customRule!="" && ((!not && !judge) || (not && judge))){
				xjQuery.VALIDATOR.isError = true;
				promptText += $xj.message(['fullcustomerr_',$(caller).attr('id')].join(""))+"<br />";
			}
		}
		function _customRegex(caller,customRule,position){		 // VALIDATE REGEX RULES
			if($xj.Functions[customRule])
				$(caller).ecVal($xj.Functions[customRule]($(caller).ecVal()));
			var pattern = new RegExp($xj.vRule(customRule));
			if(!pattern.test($(caller).ecVal())){
				xjQuery.VALIDATOR.isError = true;
				promptText += $xj.message(['xjbase_',customRule.toLowerCase(),'err'].join(""))+"<br />";
			}
		}
		function _exemptString(caller,rules,position){		 // VALIDATE REGEX RULES
			var customString = rules[position+1];
			if(customString == $(caller).attr('value')){
				xjQuery.VALIDATOR.isError = true;
				promptText += xjQuery.VALIDATOR.settings.allrules['required'].alertText+"<br />";
			}
		}
		function _funcCall(caller,rules,position){  		// VALIDATE CUSTOM FUNCTIONS OUTSIDE OF THE ENGINE SCOPE
			var customRule = rules[position+1];
			var funce = xjQuery.VALIDATOR.settings.allrules[customRule].nname;
			
			var fn = window[funce];
			if (typeof(fn) === 'function'){
				var fn_result = fn();
				if(!fn_result){
					xjQuery.VALIDATOR.isError = true;
				}
				
				promptText += xjQuery.VALIDATOR.settings.allrules[customRule].alertText+"<br />";
			}
		}
		function _ajax(caller,rules,position){				 // VALIDATE AJAX RULES
			
			customAjaxRule = rules[position+1];
			postfile = xjQuery.VALIDATOR.settings.allrules[customAjaxRule].file;
			fieldValue = $(caller).val();
			ajaxCaller = caller;
			fieldId = $(caller).attr("id");
			ajaxValidate = true;
			ajaxisError = xjQuery.VALIDATOR.isError;

			if(xjQuery.VALIDATOR.settings.allrules[customAjaxRule].extraData){
				extraData = xjQuery.VALIDATOR.settings.allrules[customAjaxRule].extraData;
			}else{
				extraData = "";
			}
			if(!ajaxisError){
				$.ajax({
				   	type: "POST",
				   	url: postfile,
				   	async: true,
				   	data: "validateValue="+fieldValue+"&validateId="+fieldId+"&validateError="+customAjaxRule+"&extraData="+extraData,
				   	beforeSend: function(){
				   		if(xjQuery.VALIDATOR.settings.allrules[customAjaxRule].alertTextLoad){
				   			if(!$("div."+fieldId+"xjbaseValidationError")[0]){				   				
	 			 				return xjQuery.VALIDATOR.buildPrompt(ajaxCaller,xjQuery.VALIDATOR.settings.allrules[customAjaxRule].alertTextLoad,"load");
	 			 			}else{
	 			 				xjQuery.VALIDATOR.updatePromptText(ajaxCaller,xjQuery.VALIDATOR.settings.allrules[customAjaxRule].alertTextLoad,"load");
	 			 			}
			   			}
			  	 	},
			  	 	error: function(data,transport){ xjQuery.VALIDATOR.debug("error in the ajax: "+data.status+" "+transport); },
					success: function(data){
						data = eval( "("+data+")");
						ajaxisError = data.jsonValidateReturn[2];
						customAjaxRule = data.jsonValidateReturn[1];
						ajaxCaller = $("#"+data.jsonValidateReturn[0])[0];
						fieldId = ajaxCaller;
						ajaxErrorLength = xjQuery.VALIDATOR.AjaxValidArray.length;
						existInarray = false;
						
			 			 if(ajaxisError == "false"){
			 			 	_checkInArray(false);
			 			 	if(!existInarray){
				 			 	xjQuery.VALIDATOR.ajaxValidArray[ajaxErrorLength] =  new Array(2);
				 			 	xjQuery.VALIDATOR.ajaxValidArray[ajaxErrorLength][0] = fieldId;
				 			 	xjQuery.VALIDATOR.ajaxValidArray[ajaxErrorLength][1] = false;
				 			 	existInarray = false;
			 			 	}
			 			 	xjQuery.VALIDATOR.ajaxValid = false;
							promptText += xjQuery.VALIDATOR.settings.allrules[customAjaxRule].alertText+"<br />";
							xjQuery.VALIDATOR.updatePromptText(ajaxCaller,promptText,"",true);				
						 }else{	 
						 	_checkInArray(true);
						 	xjQuery.VALIDATOR.ajaxValid = true; 			
						 	if(!customAjaxRule)	{
						 		xjQuery.VALIDATOR.debug("wrong ajax response, are you on a server or in xampp? if not delete de ajax[ajaxUser] validating rule from your form ");}		   
						 	if(xjQuery.VALIDATOR.settings.allrules[customAjaxRule].alertTextOk){	// NO OK TEXT MEAN CLOSE PROMPT	 			
	 			 				xjQuery.VALIDATOR.updatePromptText(ajaxCaller,xjQuery.VALIDATOR.settings.allrules[customAjaxRule].alertTextOk,"pass",true);
				 				}else{
				 			 	ajaxValidate = false;		 	
				 			 	xjQuery.VALIDATOR.closePrompt(ajaxCaller);
				 				}		
			 			 }
			 			function  _checkInArray(validate){
			 				for(var x=0 ;x<ajaxErrorLength;x++){
			 			 		if(xjQuery.VALIDATOR.ajaxValidArray[x][0] == fieldId){
			 			 			xjQuery.VALIDATOR.ajaxValidArray[x][1] = validate;
			 			 			existInarray = true;
			 			 		}
			 			 	}
			 			}
			 		}				
				});
			}
		}
		function _equals(caller,rules,position){		 // VALIDATE FIELD MATCH
			var equalsField = rules[position+1];
			
			if($(caller).attr('value') != $("#"+equalsField).attr('value')){
				xjQuery.VALIDATOR.isError = true;
				promptText += $xj.message('xjbase_equalserr')+"<br />";
			}
		}
		function _length(caller,rules,position){    	  // VALIDATE LENGTH
			var startLength = eval(rules[position+1]);
			var endLength = eval(rules[position+2]);
			var feildLength = callerVal.length;
	
			if(feildLength<startLength || feildLength>endLength){
				xjQuery.VALIDATOR.isError = true;
				if(startLength==endLength)
					promptText += $xj.message('xjbase_eqlengtherr',startLength)+"<br />";
				else if((startLength || startLength===0) && (!endLength && endLength!==0))
                    promptText += $xj.message('xjbase_flengtherr',startLength)+"<br />";
                else if((!startLength && startLength!==0) && (endLength || endLength===0))
                    promptText += $xj.message('xjbase_llengtherr',endLength)+"<br />";
				else
					promptText += $xj.message('xjbase_lengtherr',startLength,endLength)+"<br />";					
			}
		}
        function _range(caller,rules,position){          // VALIDATE LENGTH
            var from = eval(rules[position+1]);
            var to = eval(rules[position+2]);
            var feild = parseFloat(callerVal);
    
            if(feild<from || feild>to || !feild && feild!==0){
                xjQuery.VALIDATOR.isError = true;
                if((from || from===0) && (!to && to!==0))
                    promptText += $xj.message('xjbase_frangeerr',from)+"<br />";
                else if((!from && from!==0) && (to || to===0))
                    promptText += $xj.message('xjbase_lrangeerr',to)+"<br />";                   
                else
                    promptText += $xj.message('xjbase_rangeerr',from,to)+"<br />";                   
            }
        }
        function _explain(caller ,rules, position){
            promptText = rules[position+1].replace(/\\n/g,'<br/>') + "<br/>" + promptText;
        }
		function _maxCheckbox(caller,rules,position){  	  // VALIDATE CHECKBOX NUMBER
		
			var nbCheck = eval(rules[position+1]);
			var groupname = $(caller).attr("name");
			var groupSize = $("input[name='"+groupname+"']:checked").size();
			if(groupSize > nbCheck){	
				xjQuery.VALIDATOR.showTriangle = false;
				xjQuery.VALIDATOR.isError = true;
				promptText += xjQuery.VALIDATOR.settings.allrules["maxCheckbox"].alertText+"<br />";
			}
		}
		function _minCheckbox(caller,rules,position){  	  // VALIDATE CHECKBOX NUMBER
		
			var nbCheck = eval(rules[position+1]);
			var groupname = $(caller).attr("name");
			var groupSize = $("input[name='"+groupname+"']:checked").size();
			if(groupSize < nbCheck){	
			
				xjQuery.VALIDATOR.isError = true;
				xjQuery.VALIDATOR.showTriangle = false;
				promptText += xjQuery.VALIDATOR.settings.allrules["minCheckbox"].alertText+" "+nbCheck+" "+xjQuery.VALIDATOR.settings.allrules["minCheckbox"].alertText2+"<br />";
			}
		}
		return (xjQuery.VALIDATOR.isError) ? xjQuery.VALIDATOR.isError : false;
	},
	submitForm : function(caller ,settings){
		if (typeof settings.success == 'function')
			return settings.success($(caller).serialize());
		else
			return false;
		
	},
	buildPrompt : function(caller,promptText,type,ajaxed) {
		var settings=$xj.data($(caller),'xjbaseValidationSettings');
		var deleteItself = "." + $(caller).attr("id") + "xjbaseValidationError";
	
		if($(deleteItself)[0]) {
			$(deleteItself).stop();
			$(deleteItself).remove();
		}

		var divFormError = document.createElement('div');
		var formErrorContent = document.createElement('div');
		var linkTofield = xjQuery.VALIDATOR.linkTofield(caller);
		var statInt = $xj.data(caller,'isBeforeInput')?0:1;
		$(divFormError).addClass("xjbaseValidationError").css({
			 position	:'absolute'
			,top		:'300px'
			,left		:'200px'
			,display	:'block'
			,'z-index'	: settings['zIndex'][statInt]
			,cursor		:'pointer'
		});
		
		if(ajaxed)
			$(divFormError).addClass("ajaxed");
		
		$(divFormError).addClass(linkTofield);
		$(formErrorContent).addClass("formErrorContent").ecSetAll({css:{
			 width:'100%' 
			,background:settings['errorBackground'][statInt]
			,color:'#fff'
			,width:settings['width']
			,'font-family':'tahoma'
			,'font-size':'11px'
			,border:'2px solid #ddd'
			,'box-shadow': '0px 0px 3px #666'
			,padding:'4px 10px'
			,'border-radius': '6px'
		}});
		
		if(settings.containerOverflow)		// Is the form contained in an overflown container?
			$(caller).before(divFormError);
		else
			$("body").append(divFormError);
				
		$(divFormError).append(formErrorContent);
			
		if(xjQuery.VALIDATOR.showTriangle != false){		// NO TRIANGLE ON MAX CHECKBOX AND RADIO
			var arrow = document.createElement('div');
			$(arrow).addClass(linkTofield+"_formErrorArrow").css({
				 width:'15px'
				,margin:'-2px 0 0 13px'
				,'z-index':5000
			});
			$(divFormError).append(arrow);
			if(settings.promptPosition == "bottomLeft" || settings.promptPosition == "bottomRight") {
				$(arrow).addClass("formErrorArrowBottom").css({
					 top:0
					,margin:'-6px'
				});
				$(arrow).html('<div class="line1"><!-- --></div><div class="line2"><!-- --></div><div class="line3"><!-- --></div><div class="line4"><!-- --></div><div class="line5"><!-- --></div><div class="line6"><!-- --></div><div class="line7"><!-- --></div><div class="line8"><!-- --></div><div class="line9"><!-- --></div><div class="line10"><!-- --></div>');
			}
			else if(settings.promptPosition == "topLeft" || settings.promptPosition == "topRight"){
				$(divFormError).append(arrow);
				$(arrow).html('<div class="line10"><!-- --></div><div class="line9"><!-- --></div><div class="line8"><!-- --></div><div class="line7"><!-- --></div><div class="line6"><!-- --></div><div class="line5"><!-- --></div><div class="line4"><!-- --></div><div class="line3"><!-- --></div><div class="line2"><!-- --></div><div class="line1"><!-- --></div>');
			}
			$('.'+linkTofield+'_formErrorArrow').find('div').ecSetAll({css:{
				 'border-left'	:'2px solid #ddd'
				,'border-right'	:'2px solid #ddd'
				,'box-shadow'	:'0px 2px 3px #666'
				,'font-size'	:'0px'
				, height		:'1px'
				, background	:settings['errorArrowBackground'][statInt]
				,'line-height'	:'0px'
				,'font-size'	:'0px'
				, display		:'block'
			}});
			$('.'+linkTofield+'_formErrorArrow').find('div').ecSetAll({css:{
				 'box-shadow'	:'none'
			}});
			for(var i=3;i<=10;i++)
				$(['.'+linkTofield+'_formErrorArrow .line',i].join("")).css({
					 width:[(i-3)*2+1,'px'].join("")
					,'margin-left':[i-3/2,'px'].join("")
				});
			$('.'+linkTofield+'_formErrorArrow .line3').css({
				 'border-left'  :'2px solid #ddd'
				,'border-right' :'2px solid #ddd'
				,'border-bottom':'0px solid #ddd'
			});
			$('.'+linkTofield+'_formErrorArrow .line2').css({width:'3px',border:'none',background:'#ddd'});
			$('.'+linkTofield+'_formErrorArrow .line1').css({width:'1px',border:'none',background:'#ddd'});
			if(type == "pass"){
				$(divFormError).css({
					background:settings['errorBackground'][statInt]
				});
				$('.'+linkTofield+'_formErrorArrow').css({
					background:settings['errorArrowBackground'][statInt]
				});
			}
			if(type == "load"){
				$(divFormError).css({
					background:'#393939'
					,color:'#fff'
				});
				$('.'+linkTofield+'_formErrorArrow').css({
					background:'#393939'
				});
			}
		}
		$(formErrorContent).html(promptText);
		
		var calculatedPosition = xjQuery.VALIDATOR.calculatePosition(caller,promptText,type,ajaxed,divFormError,settings);
		calculatedPosition.callerTopPosition +="px";
		calculatedPosition.callerleftPosition +="px";
		calculatedPosition.marginTopSize +="px";
		$(divFormError).css({
			 "top"		:calculatedPosition.callerTopPosition
			,"left"		:calculatedPosition.callerleftPosition
			,"marginTop":calculatedPosition.marginTopSize
			,"opacity"	:0
		});
		return $(divFormError).animate({"opacity":settings['opacity'][statInt]});	
	},
	updatePromptText : function(caller,promptText,type,ajaxed) {	// UPDATE TEXT ERROR IF AN ERROR IS ALREADY DISPLAYED
		var settings= $xj.data($(caller),'xjbaseValidationSettings');
		var statInt = $xj.data(caller,'isBeforeInput')?0:1;
		var linkTofield = xjQuery.VALIDATOR.linkTofield(caller);
		var updateThisPrompt =  "."+linkTofield;
		
		if(type == "pass")
			$(updateThisPrompt).addClass("greenPopup");
		else
			$(updateThisPrompt).removeClass("greenPopup");
		
		if(type == "load")
			$(updateThisPrompt).addClass("blackPopup");
		else
			$(updateThisPrompt).removeClass("blackPopup");
		
		if(ajaxed)
			$(updateThisPrompt).addClass("ajaxed");
		else
			$(updateThisPrompt).removeClass("ajaxed");
	
		$(updateThisPrompt).find(".formErrorContent").html(promptText);
		
		var calculatedPosition = xjQuery.VALIDATOR.calculatePosition(caller,promptText,type,ajaxed,updateThisPrompt,settings);
		calculatedPosition.callerTopPosition +="px";
		calculatedPosition.callerleftPosition +="px";
		calculatedPosition.marginTopSize +="px";
		$(updateThisPrompt).animate({ 
			 "top"		:calculatedPosition.callerTopPosition
			,"marginTop":calculatedPosition.marginTopSize
            ,"opacity"	:settings['opacity'][statInt]
		});
		$(updateThisPrompt).css({
			 "z-index"	:settings['zIndex'][statInt]
		});
		$(updateThisPrompt).find('.formErrorContent').css({
			"background":settings['errorBackground'][statInt]
		});
		$(updateThisPrompt).find('.'+linkTofield+'_formErrorArrow').find('div').css({
			"background":settings['errorArrowBackground'][statInt]
		});
	},
	calculatePosition : function(caller,promptText,type,ajaxed,divFormError,settings){
		
		var callerTopPosition,callerleftPosition,inputHeight,marginTopSize;
		var callerWidth =  $(caller).width();
		
		if(settings.containerOverflow){		// Is the form contained in an overflown container?
			callerTopPosition = 0;
			callerleftPosition = 0;
			inputHeight = $(divFormError).height();					// compasation for the triangle
			marginTopSize = "-"+inputHeight;
		}else{
			callerTopPosition = $(caller).offset().top;
			callerleftPosition = $(caller).offset().left;
			inputHeight = $(divFormError).height();
			marginTopSize = 0;
		}
		
		/* POSITIONNING */
		if(settings.promptPosition == "topRight"){ 
			callerleftPosition += (callerWidth -settings['width'] > 0)?callerWidth -settings['width']+settings['slide']:callerWidth +settings['slide'];
			if(!settings.containerOverflow){		// Is the form contained in an overflown container?
				callerTopPosition += -inputHeight; 
			}
		}
		if(settings.promptPosition == "topLeft"){ callerTopPosition += -inputHeight -10; }
		
		if(settings.promptPosition == "centerRight"){ callerleftPosition +=  callerWidth +13; }
		
		if(settings.promptPosition == "bottomLeft"){
			callerTopPosition = callerTopPosition + $(caller).height() + 15;
		}
		if(settings.promptPosition == "bottomRight"){
			callerleftPosition +=  callerWidth -30;
			callerTopPosition +=  $(caller).height() +5;
		}
		return {
			"callerTopPosition":callerTopPosition,
			"callerleftPosition":callerleftPosition,
			"marginTopSize":marginTopSize
		};
	},
	linkTofield : function(caller){
		var linkTofield = $(caller).attr("id") + "xjbaseFormError";
		linkTofield = linkTofield.replace(/\[/g,""); 
		linkTofield = linkTofield.replace(/\]/g,"");
		return linkTofield;
	},
	closePrompt : function(caller,outside) {
		if(outside){
			$(caller).fadeTo("fast",0,function(){
				$(caller).remove();
			});
			return false;
		}
		if(typeof(ajaxValidate)=='undefined')
		{ ajaxValidate = false; }
		if(!ajaxValidate){
			var linkTofield = xjQuery.VALIDATOR.linkTofield(caller);
			var closingPrompt = "."+linkTofield;
			$(closingPrompt).fadeTo("fast",0,function(){
				$(closingPrompt).remove();
			});
		}
	},
	submitValidation : function(caller,settings) {					// FORM SUBMIT VALIDATION LOOPING INLINE VALIDATION
		var stopForm = false;
		xjQuery.VALIDATOR.ajaxValid = true;
		var toValidateSize = $(caller).find("[class*=validate]").size();
		
		$(caller).find("[class*=validate]").each(function(){
			var linkTofield = xjQuery.VALIDATOR.linkTofield(this);
			if(!$("."+linkTofield).hasClass("ajaxed")){	// DO NOT UPDATE ALREADY AJAXED FIELDS (only happen if no normal errors, don't worry)
				stopForm = !xjQuery.VALIDATOR._loadValidation(this);	
				if(stopForm)
					return false;
			};
		});
		var ajaxErrorLength = xjQuery.VALIDATOR.AjaxValidArray.length;
		for(var x=0;x<ajaxErrorLength;x++){
	 		if(xjQuery.VALIDATOR.AjaxValidArray[x][1] == false)
	 			xjQuery.VALIDATOR.AjaxValid = false;
			}
		if(stopForm || !xjQuery.VALIDATOR.ajaxValid){
			if(settings.scroll){
				if(!settings.containerOverflow){
					var destination = $(".xjbaseValidationError:not('.greenPopup'):first").offset().top;
					$(".formError:not('.greenPopup')").each(function(){
						var testDestination = $(this).offset().top;
						if(destination>testDestination)
							destination = $(this).offset().top;
					});
					$("html:not(:animated),body:not(:animated)").animate({ scrollTop: destination}, 1100);
				}else{
					var destination = $(".formError:not('.greenPopup'):first").offset().top;
					var scrollContainerScroll = $(settings.containerOverflowDOM).scrollTop();
					var scrollContainerPos = - parseInt($(settings.containerOverflowDOM).offset().top);
					destination = scrollContainerScroll + destination + scrollContainerPos -5;
					var scrollContainer = settings.containerOverflowDOM+":not(:animated)";
					
					$(scrollContainer).animate({ scrollTop: destination}, 1100);
				}
			}
			return true;
		}else{
			return false;
		}
	}
});
