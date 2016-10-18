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
	      var rewardLevels = this.trackerOpts.rewardLevels,
	          prizes = this.trackerOpts.prizes,
	          rewardClass = this._rewardClass(rewardLevels.length),
	          
	          rewardHtml = this._buildCollection(RtDomBuilder.rewardLevel, rewardLevels, {
	                          rewardClass: rewardClass,
	                          rewardLevels: rewardLevels}),
	                          
	          prizeHtml = this._buildCollection(RtDomBuilder.prize, prizes, {
	            prizeClass: rewardClass,
	            prizes: prizes
	          });
	      this.rewardLevelNodes = {
	        html: rewardHtml,
	        offsetClass: this._offsetClass(rewardLevels.length)
	      };
	      this.prizeNodes = {
	        html: prizeHtml
	      }
	    },
	    
	    buildRewardRow: function() {
	      var $el = this.$el,
	          referralTrackerRewards = new RtDomBuilder.rewardLevelsContainer({
	            rewardLevelNodes: this.rewardLevelNodes.html
	          });
	      $el.html(referralTrackerRewards.html);
	      $el.find('.reward-level:first').addClass(this.rewardLevelNodes.offsetClass);
	    },
	    
	    buildPrizeRow: function() {
	      // build prize divs showing
	      var $el = this.$el,
	          prizeRow = new RtDomBuilder.prizeRow({
	            prizeNodes: this.prizeNodes.html
	          });
	      $el.append(prizeRow.html);
	      $el.find('.reward-level-prize:first').addClass(this.rewardLevelNodes.offsetClass);
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
	    },
	    
	    _buildCollection: function(Obj, collection, opts) {
	      var opts = opts || {},
	          html = '';
	      for(var i = 0; i < collection.length; i++) {
	        opts.index = i;
	        html += new Obj(opts).html;
	      }
	      return html;
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
	  
	  // Must return an object with an html property.
	  //
	  
	  this.rewardLevel = function(opts) {
	    var opts = opts || {};
	    var level = $('<div class="' + opts.rewardClass + ' reward-level reward-level-' + opts.index + '"></div>');
	    level.append('<span class="reward-level-text">' + opts.rewardLevels[opts.index] + '</span>')
	    this.html = level.wrap('<p/>').parent().html();
	  };
	  
	  this.rewardLevelsContainer = function(opts) {
	    var opts = opts || {rewardLevelNodes: ''},
	        elemHtml = '<div class="row referral-tracker-rewards" style="text-align: left">';
	        elemHtml += opts.rewardLevelNodes;
	        elemHtml += '</div>';
	    this.html = elemHtml;
	  }
	  
	  this.prizeRow = function(opts) {
	    var opts = opts || {prizeNodes: ''},
	        elemHtml = '<div class="row referral-tracker-prizes" style="text-align: left">';
	        elemHtml += opts.prizeNodes;
	        elemHtml += '</div>';
	    this.html = elemHtml;
	  }
	  
	  this.prize = function(opts) {
	    var opts = opts || {};
	    var prizeLevel = $('<div class="' + opts.prizeClass + ' reward-level-prize reward-level-' + opts.index + '">' + opts.prizes[opts.index] + '</div>');
	    this.html = prizeLevel.wrap('<p/>').parent().html();
	  }
	};

	module.exports = new RtDomBuilder();

/***/ }
/******/ ]);