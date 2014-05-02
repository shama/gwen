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
    return this.get('store').find('note', params.note_id);
  },
});
