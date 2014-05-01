###*
# Ember/QUnit Test Helpers
###

fixture = Ember.Object.create
  username: 'heroku@youneedabudget.com'
  password: 'ynab'

# Adds the helper testSkip() for skipping tests
QUnit.testSkip = ->
  QUnit.test arguments[0] + ' (SKIPPED)', ->
    QUnit.expect(0)
    li = document.getElementById QUnit.config.current.id
    QUnit.done -> li.style.background = '#FFFF99'
window.testSkip = QUnit.testSkip

# login helper
Ember.Test.registerAsyncHelper 'login', (app) ->
  stop()
  visit('/users/login')
  fillIn('.login-username', fixture.get('username'))
  fillIn('.login-password', fixture.get('password'))
  click('.login-submit')
  visit('/')
  andThen ->
    Ember.run.schedule 'afterRender', ->
      start()
