/**
 * Date Helper
 */
var moment = require('moment');
Ember.Handlebars.helper('date', function(value, format) {
  if (typeof format === 'string') return moment(value).format(format);
  else return moment(value).fromNow();
});
