YNAB = require('../src/app')
Router = require('../src/router')

# Include QUnit libs
require('script!qunit/qunit/qunit.js')
require('qunit/qunit/qunit.css')

# include ember/qunit helpers
require('./helpers.coffee')

# Global access to App
window.App = null

# When each test starts
QUnit.testStart ->
  # Reset the router
  Router.reopen(location: 'none')
  # Create a new App
  Ember.run ->
    window.App = YNAB.create
      rootElement: '#qunit-fixture'
      LOG_ACTIVE_GENERATION: true
      LOG_VIEW_LOOKUPS: false
    # Enable testing
    window.App.setupForTesting()
    # Add in test helpers (visit, click, andThen, etc)
    window.App.injectTestHelpers()
    # Reset lastKnownRoute
    window.App.__container__.lookup('controller:application').set('lastKnownRoute', 'budget')
  # Reset the entire App
  window.App.reset()

# When each test is done
QUnit.testDone ->
  # Destroy the app
  Ember.run(window.App, 'destroy')

# Automatically load all tests (files that end with _test.coffee)
requireTest = require.context('./', true, /_test\.coffee$/)
requireTest(name) for name in requireTest.keys()
