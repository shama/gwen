module.exports = Ember.Component.extend
  defaultTemplate: require('./index.hbs')
  classNames: ['loading-bar']
  classNameBindings: ['isStart', 'isEnd']

  ###*
  # Whether to show the spinner
  #
  # @property spinner
  # @type {Boolean}
  ###
  spinner: true

  ###*
  # Percent the bar should display
  #
  # @property percent
  # @type {Number}
  ###
  percent: ((key, val=0) ->
    val
  ).property()

  ###*
  # Style for the percent loading bar
  #
  # @property percentStyle
  # @type {String}
  ###
  percentStyle: ((key, val) ->
    'width: ' + @get('percent') + '%;'
  ).property('percent')

  ###*
  # Class names for percent loading bar
  #
  # @property percentClassNames
  # @type {Array}
  ###
  percentClassNames: ((key, val="loading-bar-percent") ->
    val
  ).property()

  ###*
  # Whether we're at the start, fade in and remove class after 500ms
  #
  # @property isStart
  # @type {Boolean}
  ###
  isStart: ((key, val=false) ->
    percent = @get('percent')
    if (percent == 0)
      @set('_isStarting', true)
      val = true
      Ember.run.later =>
        @set('isStart', false)
        @set('_isStarting', false)
      , 500
    val || @get('_isStarting')
  ).property('percent')

  ###*
  # Internal flag to know whether we're starting
  #
  # @property _isStarting
  # @type {Boolean}
  ###
  _isStarting: false

  ###*
  # Whether we're at the end, assume it complets and just fades out
  #
  # @property isEnd
  # @type {Boolean}
  ###
  isEnd: ((key, val=false) ->
    return (@get('percent') == 100)
  ).property('percent')
