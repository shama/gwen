var Application = require('../src/app');
var Router = require('../src/router');

// Include QUnit libs
require('script!qunit/qunit/qunit.js');
require('qunit/qunit/qunit.css');

// Global access to App
window.App = null;

// When each test starts
QUnit.testStart(function() {
  // Reset the router
  Router.reopen({location: 'none'});
  // Create a new App
  Ember.run(function() {
    window.App = Application.create({
      rootElement: '#qunit-fixture',
      LOG_ACTIVE_GENERATION: true,
      LOG_VIEW_LOOKUPS: false,
    });
    // Enable testing
    window.App.setupForTesting();
    // Add in test helpers (visit, click, andThen, etc)
    window.App.injectTestHelpers();
  });
  // Reset the entire App
  window.App.reset();
});

// When each test is done
QUnit.testDone(function() {
  // Destroy the app
  Ember.run(window.App, 'destroy');
});

// Automatically load all tests (files that end with _test.js)
var requireTest = require.context('./', true, /_test\.js$/);
requireTest.keys().forEach(function(name) {
  requireTest(name);
});
