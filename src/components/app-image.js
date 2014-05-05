/**
 * App Image Ember Component
 *
 * @class AppImageComponent
 * @extends Ember.Component
 */
module.exports = Ember.Component.extend({
  tagName: 'img',
  attributeBindings: ['src', 'alt'],

  /**
   * Source of the image
   *
   * @property src
   * @type {String}
   */
  src: function(key, val) {
    return require('../assets/' + val);
  }.property(),

  /**
   * Alt of the image
   *
   * @property alt
   * @type {String}
   */
  alt: '',
});
