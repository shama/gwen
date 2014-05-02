// Require Ember + Deps
require('script!jquery/dist/jquery.js');
require('script!handlebars');
require('script!ember');

// Require ember-data
require('script!ember-data');

// Load the locale, default to en for now
require('./locale/index.js')('en');

//Ember.ENV.LOG_MODULE_RESOLVER = true
window.App = module.exports = Ember.Application.extend({
  init: function() {
    this._super();
    //Remove initial loading message
    $('body').removeClass('initial-is-loading');
    $('.initial-loading').remove();
  },
  LOG_TRANSITIONS: !!!PRODUCTION,
  Resolver: require('ember-webpack-resolver?' + __dirname)({
    components: {
      'note-editor': require('editor-ember-component')
    },
    extensions: ['.js', '.js6', '.coffee', '.hbs'],
  }),
  Store: DS.Store.extend({
    adapter: DS.RESTAdapter.extend({
      namespace: 'api',
    }),
  }),
});

// Load in CSS
require('font-awesome/css/font-awesome.css');
require('./css/style.styl');

// Load helpers
requireHelper = require.context('./helpers');
requireHelper.keys().forEach(requireHelper);

// Try to catch any uncaught errors
Ember.RSVP.configure('onerror', function(error) {
  if (error instanceof Error) {
    Ember.Logger.assert(false, error)
    Ember.Logger.error(error.stack)
  }
});
