QUnit.module __filename

test 'has a post', ->
  expect(1)
  visit('/posts/1')
  andThen ->
    equal(find('h1').text(), 'New Species of Dolphin Found', 'should be about dolphins')
