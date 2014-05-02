/**
 * App Icon Component
 *
 * @class AppIconComponent
 * @extends Ember.Component
 */
module.exports = Ember.Component.extend({
  tagName: 'i',
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
});