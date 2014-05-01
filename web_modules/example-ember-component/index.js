/******/ (function(modules) { // webpackBootstrap
/******/ 	
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/ 	
/******/ 	// The require function
/******/ 	function require(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/ 		
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/ 		
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, require);
/******/ 		
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 		
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// The bundle contains no chunks. A empty chunk loading function.
/******/ 	require.e = function requireEnsure(_, callback) {
/******/ 		callback.call(null, this);
/******/ 	};
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	require.modules = modules;
/******/ 	
/******/ 	// expose the module cache
/******/ 	require.cache = installedModules;
/******/ 	
/******/ 	// __webpack_public_path__
/******/ 	require.p = "";
/******/ 	
/******/ 	
/******/ 	// Load entry module and return exports
/******/ 	return require(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, require) {

	module.exports = Ember.Component.extend({
	  defaultTemplate: require(1),
	  classNames: ['loading-bar'],
	  classNameBindings: ['isStart', 'isEnd'],
	  /**
	  # Whether to show the spinner
	  #
	  # @property spinner
	  # @type {Boolean}
	  */

	  spinner: true,
	  /**
	  # Percent the bar should display
	  #
	  # @property percent
	  # @type {Number}
	  */

	  percent: (function(key, val) {
	    if (val == null) {
	      val = 0;
	    }
	    return val;
	  }).property(),
	  /**
	  # Style for the percent loading bar
	  #
	  # @property percentStyle
	  # @type {String}
	  */

	  percentStyle: (function(key, val) {
	    return 'width: ' + this.get('percent') + '%;';
	  }).property('percent'),
	  /**
	  # Class names for percent loading bar
	  #
	  # @property percentClassNames
	  # @type {Array}
	  */

	  percentClassNames: (function(key, val) {
	    if (val == null) {
	      val = "loading-bar-percent";
	    }
	    return val;
	  }).property(),
	  /**
	  # Whether we're at the start, fade in and remove class after 500ms
	  #
	  # @property isStart
	  # @type {Boolean}
	  */

	  isStart: (function(key, val) {
	    var percent,
	      _this = this;
	    if (val == null) {
	      val = false;
	    }
	    percent = this.get('percent');
	    if (percent === 0) {
	      this.set('_isStarting', true);
	      val = true;
	      Ember.run.later(function() {
	        _this.set('isStart', false);
	        return _this.set('_isStarting', false);
	      }, 500);
	    }
	    return val || this.get('_isStarting');
	  }).property('percent'),
	  /**
	  # Internal flag to know whether we're starting
	  #
	  # @property _isStarting
	  # @type {Boolean}
	  */

	  _isStarting: false,
	  /**
	  # Whether we're at the end, assume it complets and just fades out
	  #
	  # @property isEnd
	  # @type {Boolean}
	  */

	  isEnd: (function(key, val) {
	    if (val == null) {
	      val = false;
	    }
	    return this.get('percent') === 100;
	  }).property('percent')
	});


/***/ },
/* 1 */
/***/ function(module, exports, require) {

	module.exports = Ember.Handlebars.template(function anonymous(Handlebars,depth0,helpers,partials,data) {
	this.compilerInfo = [4,'>= 1.0.0'];
	helpers = this.merge(helpers, Ember.Handlebars.helpers); data = data || {};
	  var buffer = '', stack1, escapeExpression=this.escapeExpression, self=this;

	function program1(depth0,data) {
	  
	  
	  data.buffer.push("\n  <div class=\"loading-bar-spinner\"><div class=\"spinner-icon\"></div></div>\n");
	  }

	  data.buffer.push("<div ");
	  data.buffer.push(escapeExpression(helpers['bind-attr'].call(depth0, {hash:{
	    'class': ("view.percentClassNames"),
	    'style': ("view.percentStyle")
	  },hashTypes:{'class': "ID",'style': "ID"},hashContexts:{'class': depth0,'style': depth0},contexts:[],types:[],data:data})));
	  data.buffer.push("></div>\n");
	  stack1 = helpers['if'].call(depth0, "view.spinner", {hash:{},hashTypes:{},hashContexts:{},inverse:self.noop,fn:self.program(1, program1, data),contexts:[depth0],types:["ID"],data:data});
	  if(stack1 || stack1 === 0) { data.buffer.push(stack1); }
	  return buffer;
	  
	}); module.exports.isMethod = false;

/***/ }
/******/ ])