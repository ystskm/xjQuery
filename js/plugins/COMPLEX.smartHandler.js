/*
 *  Create by Y.Sakamoto 2010/08/20
 *  ----------------
 *  NECESSARY ALONE:
 *  	(1) session
 *  	(2) i18n
 *  ----------------
 */
/* TODO category , method... restruct!
$xj.extend(xjQuery.i18n, 'Messages',{
	beforeunload_msg :{ja:"ページを移動します。\n\n保存したいデータがある場合は現在のページにとどまり、保存処理を行ってください。"}
});	
$(window).bind("beforeunload",function(e){
	if(($xj.OnLogin && $xj.OnLogin.NoAlert) || $xj.OnSite.LogoutPhase) return;
	$xj.clearEvent(e);
	if(window.addEventListener) 
		return $xj.message('beforeunload_msg');
	else
		e.returnValue=$xj.message('beforeunload_msg');
});
*/
