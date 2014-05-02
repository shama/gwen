/**
 * User Model
 *
 * @class User
 * @extends DS.Model
 */
module.exports = DS.Model.extend({
  id: DS.attr('number'),
  name: DS.attr('string'),
});
