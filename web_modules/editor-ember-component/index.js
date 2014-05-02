/**
 * Editor Ember Component
 *
 * @class EditorComponent
 * @extends Ember.Component
 */
var CodeMirror = require('codemirror');
require('codemirror/lib/codemirror.css');
module.exports = Ember.Component.extend({
  defaultTemplate: require('./index.hbs'),
  classNames: ['editor'],

  /**
   * Content of the text area
   *
   * @property content
   * @type {String}
   */
  content: function(key, val) {
    return val;
  },

  /**
   * When the element is inserted into the DOM, attach CodeMirror
   *
   * @method didInsertElement
   */
  didInsertElement: function() {
    var editor = CodeMirror.fromTextArea(this.$('textarea').get(0), {
      lineNumbers: true,
      mode: 'htmlmixed',
    });
    editor.setValue(this.get('content'));
    editor.on('change', function() {
      this.set('content', editor.getValue());
    }.bind(this));
  },
});