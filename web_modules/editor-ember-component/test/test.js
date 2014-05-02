window.App = null;

QUnit.testStart(function() {
  Ember.run(function() {
    window.App = Ember.Application.create({rootElement: '#qunit-fixture'});
    window.App.setupForTesting();
    window.App.injectTestHelpers();
  });
  window.App.reset();

  // Setup Application Fixture
  window.App.ApplicationRoute = Ember.Route.extend();
  window.App.ApplicationController = Ember.Controller.extend({
    content: 'Testing',
  });
  window.App.LoadingBarComponent = require('../index.js');
  Ember.TEMPLATES['components/my-editor'] = require('../index.hbs');
});

QUnit.testDone(function() {
  Ember.run(window.App, 'destroy');
});

// Automatically load all tests (files that end with _test.js)
var requireTest = require.context('./', true, /_test\.js$/);
requireTest.keys().forEach(function(name) {
  requireTest(name);
});
