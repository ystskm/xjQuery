/*
 *  Create by Y.Sakamoto 2010/08/20
 *  ----------------
 *  NECESSARY LIB:
 *      (1) jQuery-UI
 *  ----------------
 *  NECESSARY ALONE:
 *  	(1) class
 *  	(2) dom
 *      (3) timeUtil (for debug)
 *      (4) log (for debug)
 *  ----------------
 *  NECESSARY COMPLEX:
 *  	(1) ajax -> ALONE: (1) jsonUtil (2) session
 *  	(2) form
 *  ----------------
 */
$xj.extend(xjQuery.FORM, 'CONTROL', {
    Form_Classed_Constants: {
        MESSAGE: {
            SYSTEM_ERROR: {}
        },
        COMMON: {}
    },
    centering: function(slave, o) {
        o = $.extend({
            master: $(window),
            'margin-left': 0,
            'margin-top': 0,
            left: null,
            top: null
        }, o);
        var master = o['master'];
        slave.css('position', 'absolute');
        master.bind('resize', wcenter);
        wcenter();
        function wcenter() {
            centered();
        }
        function centered() {
            var cc = centerCss();
            slave.css({
                left: o['left'] ? o['left']: cc.left + o['margin-left'],
                top: o['top'] ? o['top']: cc.top + o['margin-top']
            });
        }
        ;
        function centerCss() {
            var l = (stat(master, 'width') - stat(slave, 'width')) / 2;
            var t = (stat(master, 'height') - stat(slave, 'height')) / 2;
            return {
                left: l > 0 ? l: 0,
                top: t > 0 ? t: 0
            };
        }
        ;
        function stat(dom, dirc) {
            var css = null;
            try {
                css = dom.css(dirc), aft;
            } catch(e) {
            }
            ;
            if(!css || isNaN(aft = css.replace('px')))
                return dom[dirc]();
            else
                return parseInt(aft);
        }
        ;
    }
});
