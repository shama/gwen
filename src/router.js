var Router = module.exports = Ember.Router.extend()

Router.map(function() {
  this.resource('about');
  this.resource('login');
  this.resource('posts', function() {
    this.route('post', { path: ':post_id' });
  });
});
