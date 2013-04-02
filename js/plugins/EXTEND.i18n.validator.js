/*
 *  Create by Y.Sakamoto 2010/08/20
 *  ----------------
 *  NECESSARY ALONE:
 *  	(1) i18n
 *  ----------------
 */
$xj
        .extend(
                xjQuery,
                'i18n',
                $xj.i18n,
                {
                    Functions: {
                        name: function(s) {
                            var a = $xj.replaceAll($.trim(s), '　', ' ').split(' ');
                            var fst = false;
                            var ret = "";
                            for( var i = 0; i < a.length; i++) {
                                if(a[i])
                                    if(fst)
                                        ret = [ret, ' ', a[i]].join("");
                                    else {
                                        ret = a[i];
                                        fst = true;
                                    }
                            }
                            return ret;
                        }
                        //		,email	:function(s){return $xj.full2half(s)}
                        //		,url	:function(s){return $xj.full2half(s)}
                        //		,phone	:function(s){return $xj.full2half(s)}
                        ,
                        email: function(s) {
                            return $xj.multi2single(s)
                        },
                        url: function(s) {
                            return $xj.multi2single(s)
                        },
                        phone: function(s) {
                            return $xj.multi2single(s)
                        },
                        noSpecificationNumber: function(s) {
                            try {
                                //				var ret=parseFloat($xj.full2half(s));
                                var ret = parseFloat($xj.multi2single(s));
                                return (ret || ret == 0) ? ret: '';
                            } catch(e) {
                                return ret;
                            }
                        }
                    },
                    Rules: {
                        name: {
                            global: "^.+ .+"
                        },
                        email: {
                            global: /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
                        },
                        password: {
                            global: "^([0-9a-zA-Z_@¥-])+$"
                        },
                        url: {
                            global: /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
                        },
                        date: {
                            global: "^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$"
                        },
                        phone: {
                            global: /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
                            ja: /^([0-9]{1,4}[\-]?)([0-9]{3,4}[\-]?)([0-9]{3,20})$/
                        },
                        integer: {
                            global: "^[\-\+]?\d+$"
                        },
                        number: {
                            global: "^[0-9\ ]+$"
                        },
                        account: {
                            global: "^[\-\+]?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)$"
                        },
                        noSpecificationNumber: {
                            global: "^[0-9]+$"
                        },
                        noSpecificationChar: {
                            global: "^[0-9a-zA-Z_\-]+$"
                        },
                        onlyLetter: {
                            global: "^[a-zA-Z\ \']+$"
                        },
                        ipv4: {
                            global: "^([1-9][0-9]{0,2})+\.([1-9][0-9]{0,2})+\.([1-9][0-9]{0,2})+\.([1-9][0-9]{0,2})+$"
                        }
                    },
                    Dictionary: {
                        "is": {
                            ja: 'は'
                        }
                    },
                    Messages: {
                        "xjbase_nameerr": {
                            en: "* A space is required between first and family",
                            ja: "* 姓と名の間にスペースを入れた形式で入力してください"
                        },
                        "xjbase_requirederr": {
                            en: "* This field is required",
                            ja: "* _%1_ _%2_入力必須です"
                        },
                        "xjbase_requirederr_checkbox": {
                            en: "* Please select an option"
                        },
                        "xjbase_requirederr_checkboxe": {
                            en: "* This checkbox is required"
                        },
                        "xjbase_eqlengtherr": {
                            en: "* _%1_ characters allowed",
                            ja: "* _%1_ 文字で入力してください"
                        },
                        "xjbase_lengtherr": {
                            en: "* Between _%1_ and _%2_ characters allowed",
                            ja: "* _%1_ 文字以上 _%2_ 文字以内で入力してください"
                        },
                        "xjbase_flengtherr": {
                            en: "* From _%1_ characters allowed",
                            ja: "* _%1_ 文字以上で入力してください"
                        },
                        "xjbase_lengtherr": {
                            en: "* Upto _%1_ characters allowed",
                            ja: "* _%2_ 文字以内で入力してください"
                        },
                        "xjbase_rangeerr": {
                            en: "* Between _%1_ and _%2_ allowed",
                            ja: "* _%1_ 以上 _%2_ 以下で入力してください"
                        },
                        "xjbase_frangeerr": {
                            en: "* From _%1_ allowed",
                            ja: "* _%1_ 以上で入力してください"
                        },
                        "xjbase_lrangeerr": {
                            en: "* Upto _%1_ allowed",
                            ja: "* _%1_ 以下で入力してください"
                        },
                        "xjbase_maxcheckboxerr": {
                            en: "* Checks allowed Exceeded"
                        },
                        "xjbase_mincheckboxerr": {
                            en: "* Please select _%1_ options"
                        },
                        "xjbase_equalserr": {
                            en: "* Fields do not match",
                            ja: "* 入力が一致していません。"
                        },
                        "xjbase_phoneerr": {
                            en: "* Invalid phone number",
                            ja: "* 無効な電話番号です"
                        },
                        "xjbase_emailerr": {
                            en: "* Invalid email address",
                            ja: "* 無効なメールアドレスです"
                        },
                        "xjbase_passworderr": {
                            en: "* Invalid charactor used.",
                            ja: "* パスワードで使用出来ない文字列が使われています。"
                        },
                        "xjbase_integererr": {
                            en: "* Not a valid integer"
                        },
                        "xjbase_numbererr": {
                            en: "* Invalid floating decimal number"
                        },
                        "xjbase_dateerr": {
                            en: "* Invalid date, must be in YYYY-MM-DD format"
                        },
                        "xjbase_urlerr": {
                            en: "* Invalid URL",
                            ja: "* 無効なURLです"
                        },
                        "xjbase_onlynumbererr": {
                            en: "* Numbers only"
                        },
                        "xjbase_nospecificationnumbererr": {
                            en: "* No special number allowed",
                            ja: "* 数字のみ入力してください"
                        },
                        "xjbase_nospecificationcharerr": {
                            en: "* No special caracters allowed",
                            ja: "* 半角英数字, ハイフン , アンダーバー のみ使用可能"
                        },
                        "xjbase_onlylettererr": {
                            en: "* Letters only"
                        }
                    },
                    vRule: function(k) {
                        return (this.Rules[k] && this.Rules[k][xjQuery.i18n.Language]) ? this.Rules[k][xjQuery.i18n.Language]
                                : this.Rules[k]["global"];
                    },
                    isOnReg: function(k, s) {
                        return (new RegExp(this.vRule(k)).test(s));
                    }
                });
