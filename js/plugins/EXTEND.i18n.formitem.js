/*
 *  Create by Y.Sakamoto 2010/08/20
 *  ----------------
 *  NECESSARY ALONE:
 *  	(1) i18n
 *  ----------------
 */
$xj.extend(xjQuery, 'i18n', $xj.i18n, {
    Pay: {
        en: ['Cash', 'Credit', 'Debuit', 'Prepaid', 'wire', 'Others'],
        ja: ['現金', 'クレジット', 'デビット', 'プリペイド', '銀行振込', 'その他'],
        'zh-CN': ['现金', '信用', 'Debuit', '预付', '銀行振込', '其他'],
        symbol: ['', 'C', 'D', 'P', 'X']
    },
    Tax: {
        en: ['Include Tax', 'Exclude Tax', 'Tax Free', 'Others'],
        ja: ['内税', '外税', '非課税', 'その他'],
        'zh-CN': ['包括税', '不包括税', '免税', '其他']
    },
    Sex: {
        en: ['Male', 'Female'],
        ja: ['男性', '女性'],
        'zh-CN': ['人', '女']
    },
    YN1: {
        ja: ['する', 'しない']
    },
    YN2: {
        ja: ['許可', '拒否']
    }
});
$xj
        .extend(
                xjQuery,
                'i18n',
                {
                    fWord: function(k, n) {
                        return (this[k] && this[k][xjQuery.i18n.Language] && this[k][xjQuery.i18n.Language][n]) ? this[k][xjQuery.i18n.Language][n]
                                : k;
                    }
                });
jQuery.extend(xjQuery.i18n.Dictionary, {
    name: {
        ja: '名前'
    },
    furi: {
        ja: 'ふりがな'
    },
    email: {
        ja: 'メールアドレス'
    },
    passwd: {
        ja: 'パスワード'
    },
    aname: {
        ja: 'アカウント名'
    },
    phone: {
        ja: '電話番号'
    },
    comment: {
        ja: '問い合わせ内容'
    }
});
jQuery
        .extend(
                xjQuery.i18n.Messages,
                {
                    "xjbase_send_content": {
                        ja: '以下の内容で送信します。'
                    },
                    "xjbase_mail_foot": {
                        ja: "◎本メールに心当たりのない場合は、恐れ入りますが本メールを破棄下さい。\n\n◎本メールは自動的に送信されるメールです。\n送信元にそのまま返信されても、ご返答は致しかねます。\n\n───────────────────────────────────\n■ 発行元 ： 株式会社 東雲（East Cloud Inc.)\nhttp://east-cloud.co.jp\n"
                    }
                });
