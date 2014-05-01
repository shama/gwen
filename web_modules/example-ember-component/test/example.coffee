###*
# Create an example of the component here
###

require('./style.styl')

App = Ember.Application.create()
App.ApplicationRoute = Ember.Route.extend()

App.ApplicationController = Ember.Controller.extend
  init: ->
    @_super()
    Ember.run =>
      setInterval =>
        percent = @get('percent') + 1
        percent = 0 if (percent > 100)
        @set('percent', percent)
      , 100
  percent: 0

App.LoadingBarComponent = require('../index.coffee')
Ember.TEMPLATES['components/loading-bar'] = require('../index.hbs')
