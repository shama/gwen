/**
 * Notes Route
 *
 * @class NotesRoute
 * @extends Ember.Route
 */
module.exports = Ember.Route.extend({
  /**
   * When the route first loads
   *
   * @method modal
   * @param {Object} params
   */
  model: function(params) {
    return this.get('store').find('note');
  },
  actions: {
    /**
     * Adds a note
     *
     * @method add
     */
    add: function() {
      var note = this.get('store').createRecord('note', {
        title: 'New note',
        body: 'Testing',
      });
      return note.save().then(function(post) {
        console.log('success!', post)
        this.transitionTo('notes.note', post);
      }.bind(this), function(err) {
        console.error(err);
      });
    },
  },
});
