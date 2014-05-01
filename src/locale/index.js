require('script!cldr-plurals');
require('script!ember-i18n');

// Hijack Ember.I18n.compile if in PRODUCTION
// It uses Ember.Handlebars.compile which doesnt exist in production mode
// TODO: This part will not work if a i18n string is a handlebars template, fix this!
if (PRODUCTION) {
  Ember.I18n.compile = function(source) {
    return function(context) {
      return source;
    }
  };
}

module.exports = function(lang) {
  Ember.I18n.translations = require('./' + lang + '.js');
  CLDR.defaultLanguage = lang;
};
