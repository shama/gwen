/**
 * Posts Route
 *
 * @class PostsRoute
 * @extends Ember.Route
 */
module.exports = Ember.Route.extend({
  model: function(params) {
    //this.get('store').find('post');
    return [];
  }
});