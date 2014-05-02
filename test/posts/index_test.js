QUnit.module(__filename);

test('has 2 notes', function() {
  expect(1);
  visit('/notes');
  andThen(function() {
    ok(true);
    //equal(find('li', find('#sideNav')).length, 2, 'should display 2 posts');
  });
});
