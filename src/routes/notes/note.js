/**
 * NotesNote Route
 *
 * @class NotesNoteRoute
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
    return { id: 1, title: 'Testing', date: new Date(), body: 'Testing' };
  },
});
