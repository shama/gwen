QUnit.module __filename

test 'has 2 posts', ->
  expect(1)
  visit('/posts')
  andThen ->
    equal(find('li', find('#sideNav')).length, 2, 'should display 2 posts')
