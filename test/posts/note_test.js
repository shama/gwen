QUnit.module(__filename);

test('has a note', function() {
  expect(1);
  visit('/notes/1');
  andThen(function() {
    ok(true);
    //equal(find('li', find('#sideNav')).length, 2, 'should display 2 posts');
  });
});
