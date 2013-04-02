$xj.add('JSON', {
	jsonEscape:function (s) {
		s=s.replace(/\r|\r\n|\n/g,'\\\\n')
			.replace(/\\r|\\r\n|\\n/g,'\\\\\\n')
			;
		return s;
	}
});