QUnit.module __filename

test 'percent gets set', ->
  expect(1)
  visit('/')
  Ember.run -> App.__container__.lookup('controller:application').set('percent', 42)
  andThen ->
    result = find('.loading-bar-percent').attr('style')
    equal(result, 'width: 42%;', 'width should have been set to 42%')

asyncTest 'is-start get set', ->
  expect(2)
  visit('/').then ->
    Ember.run -> App.__container__.lookup('controller:application').set('percent', 0)
    result = find('.loading-bar').attr('class')
    equal(result, 'ember-view loading-bar is-start', 'is-start should be set as class name when percent is 0')
    Ember.run.later ->
      Ember.run -> App.__container__.lookup('controller:application').set('percent', 10)
      result = find('.loading-bar').attr('class')
      equal(result, 'ember-view loading-bar', 'is-start should have been removed after 500ms')
      start()
    , 1000

test 'is-end get set', ->
  expect(1)
  visit('/')
  Ember.run -> App.__container__.lookup('controller:application').set('percent', 100)
  andThen ->
    result = find('.loading-bar').attr('class')
    equal(result, 'ember-view loading-bar is-end', 'is-end should be set as class name when percent is 100')
