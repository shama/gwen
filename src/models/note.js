/**
 * Note Model
 *
 * @class Note
 * @extends DS.Model
 */
module.exports = DS.Model.extend({
  title: DS.attr('string'),
  created: DS.attr('date'),
  body: DS.attr('string'),
});
