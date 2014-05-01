###*
# Post
#
# @class Post
# @extends Ember.Model
###
module.exports = DS.Model.extend
  title: DS.attr('string')
  created: DS.attr('date')
  body: DS.attr('string')

