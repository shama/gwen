window.App = null
Router = Ember.Router.create()

QUnit.testStart ->
  Router.reopen(location: 'none')
  Ember.run ->
    window.App = Ember.Application.create(rootElement: '#qunit-fixture')
    window.App.setupForTesting()
    window.App.injectTestHelpers()
  window.App.reset()

  # Setup Application Fixture
  window.App.ApplicationRoute = Ember.Route.extend()
  window.App.ApplicationController = Ember.Controller.extend
    percent: 50

  window.App.LoadingBarComponent = require('../index.coffee')
  Ember.TEMPLATES['components/loading-bar'] = require('../index.hbs')

QUnit.testDone ->
  Ember.run(window.App, 'destroy')

# Automatically load all tests (files that end with _test.coffee)
requireTest = require.context('./', true, /_test\.coffee$/)
requireTest(name) for name in requireTest.keys()
