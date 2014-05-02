/**
 * Create an example of the component here
 */

// An example style
require('./style.styl');

// Create an example application
var App = Ember.Application.create();
App.ApplicationRoute = Ember.Route.extend();
App.ApplicationController = Ember.Controller.extend({
  content: 'My sample text'
});

// Manually load the component for simplicity
App.MyEditorComponent = require('../index.js')
Ember.TEMPLATES['components/my-editor'] = require('../index.hbs')
