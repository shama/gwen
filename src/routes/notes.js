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
    //this.get('store').find('notes');
    return [
      { id: 1, title: 'Testing', body: 'Testing' }
    ];
  },
  actions: {
    /**
     * Adds a note
     *
     * @method add
     */
    add: function() {
      var next = this.controller.content.length;
      this.controller.content.pushObject({id: next, title: 'New Note', body: 'Testing'});
      this.transitionTo('notes.note', next);
    },
  },
});
