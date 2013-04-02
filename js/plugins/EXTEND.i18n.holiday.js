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
                    holiday: {
                        en: function(dt) {
                            return "";
                        },
                        ja: function(dt) {
                            var y = dt.getFullYear(), m = dt.getMonth() + 1, d = dt.getDate(), w = dt
                                    .getDay(), s = hdays(y, m, d);
                            return s ? s
                                    : (dt < new Date(1973, 4, 12)) ? ""
                                            : (w == 1 && hdays(y, m, d - 1)) ? y >= 1985 ? "国民の休日"
                                                    : "振替休日"
                                                    : (w == 2 && y >= 2005
                                                       && hdays(y, m, d - 1) && hdays(y, m, d - 2)) ? "振替休日"
                                                            : (w == 3 && y >= 2005
                                                               && hdays(y, m, d - 1)
                                                               && hdays(y, m, d - 2) && hdays(y, m,
                                                                    d - 3)) ? " 振替休日": "";
                            function hdays(y, m, d) {
                                var monday = function(y, m, n) {
                                    var w = (new Date(y, m, 1)).getDay();
                                    return (w > 1 ? 9: 2) - w
                                           + (n - 1)
                                           * 7;
                                };
                                return (y < 1950) ? ""
                                        : (y == 1959 && m == 4 && d == 10) ? "皇太子明仁親王の結婚の儀"
                                                : (y == 1989 && m == 2 && d == 24) ? "昭和天皇の大喪の礼"
                                                        : (y == 1990 && m == 11 && d == 12) ? "即位礼正殿の儀"
                                                                : (y == 1993 && m == 6 && d == 9) ? "皇太子徳仁親王の結婚の儀"
                                                                        :
                                                                        //                (m==1)?(d==1?"元日":(d==15&&y<2000||d==monday(y,1,2)&&y>=2000)?" 成人の日":""):                    (m==1)?(d==1?"元日":(d==15&&y<2000||d==monday(y,1,2)&&y>=2000)?" 成人の日":""):
                                                                        (m == 1) ? (d == 1 ? "元日"
                                                                                : (d == 15 && y < 2000 || d == monday(
                                                                                        y, m - 1, 2)      && y >= 2000) ? " 成人の日"
                                                                                        : "")
                                                                                : (m == 2) ? (d == 11 && y >= 1966) ? "建国記念の日"
                                                                                        : ""
                                                                                        :
                                                                                        //                  (m==3)?(d==Math.round(0.24242*y-Math.floor(y/4)+35.84))?"春分の日":"":
                                                                                        (m == 3) ? (d == shunbun(y)) ? "春分の日"
                                                                                                : ""
                                                                                                : (m == 4) ? (d == 29) ? ((y < 1989) ? "天皇誕生日"
                                                                                                        : (y < 2007) ? "みどりの日"
                                                                                                                : "昭和の日")
                                                                                                        : ""
                                                                                                        : (m == 5) ? (d == 3) ? "憲法記念日"
                                                                                                                : (d == 4 && y >= 2007) ? "みどりの日"
                                                                                                                        : (d == 5) ? "こどもの日"
                                                                                                                                : ""
                                                                                                                :
                                                                                                                //                (m==7)?(d==20&&y>=1995&&y<2003||d==monday(y,7,3)&&y>=2003)?" 海の日":"":
                                                                                                                (m == 7) ? (d == 20 && y >= 1995
                                                                                                                            && y < 2003 || d == monday(
                                                                                                                        y,
                                                                                                                        m - 1,
                                                                                                                        3)                 && y >= 2003) ? " 海の日"
                                                                                                                        : ""
                                                                                                                        :
                                                                                                                        //                (m==9)?(d==15&&y>=1966&&y<2003||d==monday(y,9,3)&&y>=2003)?" 敬老の日":
                                                                                                                        (m == 9) ? (d == 15 && y >= 1966
                                                                                                                                    && y < 2003 || d == monday(
                                                                                                                                y,
                                                                                                                                m - 1,
                                                                                                                                3)                 && y >= 2003) ? " 敬老の日"
                                                                                                                                :
                                                                                                                                //                    (d==Math.round(0.24204*y-Math.floor(y/4)+39.01))?"秋分の日":"":
                                                                                                                                (d == shuubun(y)) ? "秋分の日"
                                                                                                                                        : ""
                                                                                                                                :
                                                                                                                                //                (m==10)?(d==10&&y>=1966&&y<2000||d==monday(y,10,2)&&y>=2000)?" 体育の日":"":
                                                                                                                                (m == 10) ? (d == 10 && y >= 1966
                                                                                                                                             && y < 2000 || d == monday(
                                                                                                                                        y,
                                                                                                                                        m - 1,
                                                                                                                                        2)                  && y >= 2000) ? " 体育の日"
                                                                                                                                        : ""
                                                                                                                                        : (m == 11) ? (d == 3) ? "文化の日"
                                                                                                                                                : (d == 23) ? "勤労感謝の日"
                                                                                                                                                        : ""
                                                                                                                                                : (m == 12) ? (d == 23 && y >= 1989) ? "天皇誕生日"
                                                                                                                                                        : ""
                                                                                                                                                        : "";
                                function shunbun(y) {
                                    // cf. Wikipedia 
                                    // http://ja.wikipedia.org/wiki/%E6%98%A5%E5%88%86%E3%81%AE%E6%97%A5
                                    var q = y % 4;
                                    if(q == 0) {
                                        if(1900 <= y && y <= 1956)
                                            return 21;
                                        if(1960 <= y && y <= 2088)
                                            return 20;
                                        if(2092 <= y && y <= 2096)
                                            return 19;
                                        return 0;
                                    } else if(q == 1) {
                                        if(1901 <= y && y <= 1989)
                                            return 21;
                                        if(1993 <= y && y <= 2097)
                                            return 20;
                                        return 0;
                                    } else if(q == 2) {
                                        if(1902 <= y && y <= 2022)
                                            return 21;
                                        if(2026 <= y && y <= 2098)
                                            return 20;
                                        return 0;
                                    } else if(q == 3) {
                                        if(1903 <= y && y <= 1923)
                                            return 22;
                                        if(1927 <= y && y <= 2055)
                                            return 21;
                                        if(2059 <= y && y <= 2099)
                                            return 20;
                                        return 0;
                                    } else {
                                        return 0;
                                    }
                                }
                                function shuubun(y) {
                                    // cf. Wikipedia 
                                    // http://ja.wikipedia.org/wiki/%E7%A7%8B%E5%88%86%E3%81%AE%E6%97%A5
                                    var q = y % 4;
                                    if(q == 0) {
                                        if(1900 <= y && y <= 2008)
                                            return 23;
                                        if(2012 <= y && y <= 2096)
                                            return 22;
                                        return 0;
                                    } else if(q == 1) {
                                        if(1901 <= y && y <= 1917)
                                            return 24;
                                        if(1921 <= y && y <= 2041)
                                            return 23;
                                        if(2045 <= y && y <= 2097)
                                            return 22;
                                        return 0;
                                    } else if(q == 2) {
                                        if(1902 <= y && y <= 1946)
                                            return 24;
                                        if(1950 <= y && y <= 2074)
                                            return 23;
                                        if(2078 <= y && y <= 2098)
                                            return 22;
                                        return 0;
                                    } else if(q == 3) {
                                        if(1903 <= y && y <= 1979)
                                            return 24;
                                        if(1983 <= y && y <= 2099)
                                            return 23;
                                        return 0;
                                    } else {
                                        return 0;
                                    }
                                }
                            }
                        },
                        'zh-CN': function(dt) {
                            return "";
                        }
                    },
                    Holiday: function(dt) {
                        return i18n.holiday[i18n.Language](dt);
                    }
                });
