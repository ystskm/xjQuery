/*
 *  Create by Y.Sakamoto 2010/08/20
 *  ----------------
 *  NECESSARY ALONE:
 *  	(1) i18n
 *  ----------------
 */
$xj.extend(xjQuery,'i18n',$xj.i18n, {
    Messages:{
    	 xjbase_promptmsg_close:{
    		ja:'本当に閉じても良いですか？'
    	}
    	,xjbase_errmsg_system:{
    		 ja:'システムエラーが発生しました。'
    		,en:'Internal system error occured.'
    	}
    	,xjbase_errmsg_pdostatement:{
    		 ja:"クエリエラーが発生しました。\nDBキーが誤っていないか、また、DBの準備を行ったかご確認ください。"
    	}
    	,xjbase_errmsg_session:{
    		 ja:'他のセッションからのログインがありました。<br/>サーバーとの通信再開には再度ログインが必要です。<br/>（OKボタンを押すと、ログイン画面に戻ります。）'
    		,en:'Your session is intercept.To access to server, login again please.<br/> (after pressing "OK", move to login) '
    	}
    }
});
