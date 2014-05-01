/**
 * Login Route
 *
 * @class LoginRoute
 * @extends Ember.Route
 */
module.exports = Ember.Route.extend({
  actions: {
    willTransition: function(transition) {
      this.send('reset');
    },
    reset: function() {
      this.get('controller').setProperties({
        username: '',
        password: '',
        errorMessage: ''
      });
    },
    login: function() {
      var data = this.get('controller').getProperties('username', 'password');
      this.set('errorMessage', null);
      Ember.$.post('/api/auth', data).then(function(response) {
        this.set('errorMessage', response.message);
        if (response.success) {
          this.set('token', response.token);
          this.transitionTo('posts');
        }
      }.bind(this));
    }
  }
});
