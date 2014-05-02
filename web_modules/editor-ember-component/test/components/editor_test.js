QUnit.module(__filename);

test('editor has been displayed', function() {
  expect(1);
  visit('/');
  andThen(function() {
    ok(true);
  });
});
