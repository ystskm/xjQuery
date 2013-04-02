/***/
$(function() {

  var DefaultLanguage = 'global';

  var Language = foonyah.Language || DefaultLanguage;

  var Dictionary = {};

  $xj.add('i18n', {
    writeDictionary: writeDictionary,
    language: language,
    i18n: i18n
  });

  function writeDictionary(obj) {

    // obj = { word: { lang1: "disp1", lang2: "disp2" }} ...
    var d = Dictionary;
    return d = $.extend(true, d, obj);

  }

  function language(lang) {
    return lang ? Language = lang: Language;
  }

  function i18n(s, l) {

    var def = DefaultLanguage, d = Dictionary;

    l = l || Language;

    if(d[s])
      s = d[s][l] ? d[s][l]: d[s][def] ? d[s][def]: s;

    if(arguments.length > 1)
      for( var i = 1; i < arguments.length; i++)
        s = s.replace(new RegExp('/%_' + i + '_%/g'), arguments[i]);

    return s;

  }

  var place = 'ALONEi18n';
  $xj.data('readystatus', place, 'ready'), $xj.trigger('ready', place);

});
