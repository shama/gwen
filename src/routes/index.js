/**
 * Index Route
 *
 * @class IndexRoute
 * @extends Ember.Route
 */
module.exports = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('posts');
  }
});
