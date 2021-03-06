/*
 *  Create by Y.Sakamoto 2010/08/20
 *  ----------------
 *  NECESSARY ALONE:
 *  	(1) i18n
 *  ----------------
 */
$xj.extend(xjQuery, 'i18n', $xj.i18n, {
    Currency: {
        def: {
            'en': 'USD',
            'ja': 'JPY'
        },
        decimal: {
            ARS: 2,
            AUD: 2,
            BHD: 2,
            BWP: 2,
            BRL: 2,
            GBP: 2,
            BND: 2,
            BGN: 2,
            CAD: 2,
            CLP: 2,
            CNY: 2,
            COP: 2,
            HRK: 2,
            CZK: 2,
            DKK: 2,
            EEK: 2,
            EUR: 2,
            HKD: 2,
            HUF: 2,
            ISK: 2,
            INR: 2,
            IDR: 2,
            IRR: 2,
            ILS: 2,
            JPY: 0,
            KZT: 2,
            KWD: 2,
            LVL: 2,
            LYD: 2,
            LTL: 2,
            MYR: 2,
            MTL: 2,
            MUR: 2,
            MXN: 2,
            NPR: 2,
            NZD: 2,
            NOK: 2,
            OMR: 2,
            PKR: 2,
            PHP: 2,
            PLN: 2,
            QAR: 2,
            RON: 2,
            RUB: 2,
            SAR: 2,
            SGD: 2,
            ZAR: 2,
            KRW: 0,
            LKR: 2,
            SEK: 2,
            CHF: 2,
            TWD: 2,
            THB: 2,
            TTD: 2,
            TRY: 2,
            USD: 2,
            AED: 2,
            VEF: 2
        },
        en: {
            ARS: 'Argentine Peso',
            AUD: 'Australian Dollar',
            BHD: 'Bahraini Dinar',
            BWP: 'Botswana Pula',
            BRL: 'Brazilian Real',
            GBP: 'British Pound',
            BND: 'Brunei dollar',
            BGN: 'Bulgarian Lev',
            CAD: 'Canadian Dollar',
            CLP: 'Chilean Peso',
            CNY: 'Chinese Yuan',
            COP: 'Colombian Peso',
            HRK: 'Croatian Kuna',
            CZK: 'Czech Koruna',
            DKK: 'Danish Krone',
            EEK: 'Estonian Kroon',
            EUR: 'Euro',
            HKD: 'Hong Kong Dollar',
            HUF: 'Hungarian Forint',
            ISK: 'Iceland Krona',
            INR: 'Indian Rupee',
            IDR: 'Indonesian Rupiah',
            IRR: 'Iranian Rial',
            ILS: 'Israeli New Shekel',
            JPY: 'Japanese Yen',
            KZT: 'Kazakhstani Tenge',
            KWD: 'Kuwaiti Dinar',
            LVL: 'Latvian Lat',
            LYD: 'Libyan Dinar',
            LTL: 'Lithuanian Litas',
            MYR: 'Malaysian Ringgit',
            MTL: 'Maltese Lira',
            MUR: 'Mauritius Rupee',
            MXN: 'Mexican Peso',
            NPR: 'Nepalese Rupee',
            NZD: 'New Zealand Dollar',
            NOK: 'Norwegian Kroner',
            OMR: 'Omani Rial',
            PKR: 'Pakistan Rupee',
            PHP: 'Philippine Peso',
            PLN: 'Polish Zloty',
            QAR: 'Qatari Rial',
            RON: 'Romanian Leu',
            RUB: 'Russian Ruble',
            SAR: 'Saudi Riyal',
            SGD: 'Singapore Dollar',
            ZAR: 'South African Rand',
            KRW: 'South Korean Won',
            LKR: 'Sri Lanka Rupee',
            SEK: 'Swedish Krona',
            CHF: 'Swiss Franc',
            TWD: 'Taiwan Dollar',
            THB: 'Thai Baht',
            TTD: 'Trinidad and Tobago Dollar',
            TRY: 'Turkish Lira',
            USD: 'US Dollar',
            AED: 'Utd. Arab Emir. Dirham',
            VEF: 'Venezuelan Bolivar'
        },
        ja: {
            JPY: '日本 円',
            USD: '米国 ドル',
            EUR: 'ユーロ',
            CNY: '中国 人民元',
            TWD: '台湾 ドル',
            KRW: '韓国 ウォン',
            AUD: 'オーストラリア ドル',
            SGD: 'シンガポール ドル',
            HKD: '香港 ドル',
            GBP: '英国 ポンド',
            CAD: 'カナダ ドル',
            THB: 'タイ バーツ',
            RUB: 'ロシア ルーブル',
            INR: 'インド ルピー',
            NZD: 'ニュージーランド ドル',
            ZAR: '南アフリカ ランド',
            ARS: 'アルゼンチン ペソ',
            BHD: 'バーレーン ディナール',
            BWP: 'ボツワナ プーラ',
            BRL: 'ブラジル レアル',
            BND: 'ブルネイ ドル',
            BGN: 'ブルガリアレフ',
            CLP: 'チリ ペソ',
            COP: 'コロンビア ペソ',
            HRK: 'クロアチア クーナ',
            CZK: 'チェコ コルナ',
            DKK: 'デンマーク クローネ',
            EEK: 'エストニア クルーン',
            HUF: 'ハンガリー フォリント',
            ISK: 'アイスランド クローナ',
            IDR: 'インドネシア ルピー',
            IRR: 'イラン リアル',
            ILS: 'イスラエル 新シェケル',
            KZT: 'カザフスタン テンゲ',
            KWD: 'クウェート ディナール',
            LVL: 'ラトビア ラット',
            LYD: 'リビア ディナール',
            LTL: 'リトアニア リタス',
            MYR: 'マレーシア リンギット',
            MTL: 'マルタ リラ',
            MUR: 'モーリシャス ルピー',
            MXN: 'メキシコ  ペソ',
            NPR: 'ネパール ルピー',
            NOK: 'ノルウェー クローネ',
            OMR: 'オマーン リアル',
            PKR: 'パキスタン ルピー',
            PHP: 'フィリッピン ペソ',
            PLN: 'ポーランド ズウォティ',
            QAR: 'カタール リアル',
            RON: 'ルーマニア レイ',
            SAR: 'サウジアラビア リヤル',
            LKR: 'スリランカ ルピー',
            SEK: 'スウェーデン クローナ',
            CHF: 'スイス フラン',
            TTD: 'トリニダードトバゴ ドル',
            TRY: 'トルコ リラ',
            AED: 'UAE ディルハム',
            VEF: 'ベネズエラ ボリバル'
        },
        'zh-CN': {
            ARS: '阿根廷比索',
            AUD: '澳大利亚元',
            BHD: '巴林第纳尔',
            BWP: '博茨瓦纳普拉',
            BRL: '巴西里亚尔',
            GBP: '英镑',
            BND: '文莱元',
            BGN: '保加利亚列弗',
            CAD: '加币',
            CLP: '智利比索',
            CNY: '中国元',
            COP: '哥伦比亚比索',
            HRK: '克罗地亚库纳',
            CZK: '捷克克朗',
            DKK: '丹麦克朗',
            EEK: '爱沙尼亚克朗',
            EUR: '欧元',
            HKD: '港元',
            HUF: '匈牙利福林',
            ISK: '冰岛克朗',
            INR: '印度卢比',
            IDR: '印尼盾',
            IRR: '伊朗里亚尔',
            ILS: '以色列新谢克尔',
            JPY: '日元',
            KZT: '哈萨克斯坦坚戈',
            KWD: '科威特第纳尔',
            LVL: '拉脱维亚纬度',
            LYD: '利比亚第纳尔',
            LTL: '捷克克朗',
            MYR: '马来西亚林吉特',
            MTL: '马耳他里拉',
            MUR: '毛里求斯卢比',
            MXN: '墨西哥比索',
            NPR: '尼泊尔卢比',
            NZD: '新西兰元',
            NOK: '挪威克朗',
            OMR: '阿曼里亚尔',
            PKR: '巴基斯坦卢比',
            PHP: '菲律宾比索',
            PLN: '波兰兹罗提',
            QAR: '卡塔尔里亚尔',
            RON: '罗马尼亚列伊',
            RUB: '卢布',
            SAR: '沙特里亚尔',
            SGD: '新加坡币',
            ZAR: '南非兰特',
            KRW: '韩国元',
            LKR: '斯里兰卡卢比',
            SEK: '瑞典克朗',
            CHF: '瑞士法郎',
            TWD: '新台币',
            THB: '泰铢',
            TTD: '特立尼达和多巴哥元',
            TRY: '土耳其里拉',
            USD: '美元',
            AED: '阿拉伯埃米尔迪拉姆',
            VEF: '委内瑞拉玻利瓦尔'
        }
    }
});
