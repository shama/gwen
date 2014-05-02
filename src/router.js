var Router = module.exports = Ember.Router.extend()

Router.map(function() {
  this.resource('about');
  this.resource('login');
  this.resource('notes', function() {
    this.route('note', { path: ':note_id' });
  });
});
