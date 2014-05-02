/**
 * App Button Component
 *
 * @class AppButtonComponent
 * @extends Ember.Component
 */
module.exports = Ember.Component.extend({
  tagName: 'button',
  classNames: ['fa'],
  classNameBindings: ['type'],

  /**
   * Type of the button
   *
   * @property type
   * @type {String}
   */
  type: function(key, val) {
    return 'fa-' + (val || 'heart');
  }.property(),

  /**
   * On click, send action
   *
   * @method click
   * @param {Event} e
   */
  click: function(e) {
    this.sendAction('action');
  },
});