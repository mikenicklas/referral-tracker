/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	;(function($) {
	  var RtDomBuilder = __webpack_require__(1);

	  var ReferralTracker = function(el, trackerOpts) {
	    this.trackerOpts = trackerOpts || {},
	    this.$el = $(el);
	    this.createTracker();
	  };
	  
	  ReferralTracker.prototype = {
	    createTracker: function() {
	      this.setupTrackerData();
	      this.buildRewardRow();
	      this.buildPrizeRow();
	      // Setup mobile version?
	    },
	    
	    setupTrackerData: function() {
	      // Figure out number of reward levels
	      // Determine bootstrap classes
	      // Loop reward levels and append html
	      // Setup a data object to easily access things
	      //
	      var rewardLevels = this.trackerOpts.rewardLevels,
	          rewardClass = this._rewardClass(rewardLevels.length),
	          rewardHtml = '';
	      for(var i = 0; i < rewardLevels.length; i++) {
	        var level = new RtDomBuilder.rewardLevel({
	          rewardClass: rewardClass,
	          rewardNumber: i,
	          rewardLevel: rewardLevels[i]
	        });
	        rewardHtml += level.html;
	      }
	      this.rewardLevelNodes = {
	        html: rewardHtml,
	        offsetClass: this._offsetClass(rewardLevels.length)
	      };
	    },
	    
	    buildRewardRow: function() {
	      // build top level row showing reward levels
	      var $el = this.$el,
	          referralTrackerRewards = new RtDomBuilder.rewardLevelsContainer({
	            rewardLevelNodes: this.rewardLevelNodes.html
	          });
	      $el.html(referralTrackerRewards.html);
	      $el.find('.reward-level:first').addClass(this.rewardLevelNodes.offsetClass);
	    },
	    
	    buildPrizeRow: function() {
	      // build prize divs showing
	    },
	    
	    _offsetClass: function(rewardLevels) {
	      var levels = parseInt(rewardLevels);
	      if(levels === 5) {
	        return 'col-sm-offset-1';
	      } else {
	        return 'col-sm-offset-0';
	      }    
	    },
	    
	    _rewardClass: function(rewardLevels) {
	      var rewardClass;
	      switch(rewardLevels) {
	        case 2:
	          rewardClass = 'col-sm-6';
	          break;
	        case 3:
	          rewardClass = 'col-sm-4';
	          break;
	        case 4:
	          rewardClass = 'col-sm-3';
	          break;
	        case 5:
	          rewardClass = 'col-sm-2';
	          break;
	        default:
	          throw 'You must provide between 2-5 Reward Levels.';
	      }
	      return rewardClass;
	    }
	  }
	  
	  $.fn.referralTracker = function(trackerOpts) {
	    if (this.length > 1) {
	      for(var i = 0; i < this.length; i++) {
	        new ReferralTracker(this[i], trackerOpts);
	      }
	    } else {
	      new ReferralTracker(this, trackerOpts);
	    }
	  };
	})($);

/***/ },
/* 1 */
/***/ function(module, exports) {

	var RtDomBuilder = function() {
	  this.rewardLevel = function(opts) {
	    var opts = opts || {};
	    var level = $('<div class="' + opts.rewardClass + ' reward-level reward-level-' + opts.rewardNumber + '"></div>');
	    level.append('<span class="reward-level-text">' + opts.rewardLevel + '</span>')
	    this.html = level.wrap('<p/>').parent().html();
	  };
	  
	  this.rewardLevelsContainer = function(opts) {
	    var opts = opts || {rewardLevelNodes: ''},
	        elemHtml = '<div class="row referral-tracker-rewards" style="text-align: left">';
	        elemHtml += opts.rewardLevelNodes;
	        elemHtml += '</div>';
	    this.html = elemHtml;
	  }
	};

	module.exports = new RtDomBuilder();

/***/ }
/******/ ]);