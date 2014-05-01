/**
 * Application Route
 *
 * @class ApplicationRoute
 * @extends Ember.Route
 */
module.exports = Ember.Route.extend({
  actions: {
    error: function(reason, transition) {
      if (reason.status === 401) {
        this.transitionTo('login');
      }
    },
    willTransition: function(transition) {
      this.controllerFor('application').set('current', transition);
    }
  }
});
