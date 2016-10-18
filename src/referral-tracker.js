;(function($) {
  var RtDomBuilder = require('./rt-dom-builder.js');

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
          rewardHtml = this._buildCollection(RtDomBuilder.rewardLevel, rewardLevels, {
                          rewardClass: rewardClass,
                          rewardLevels: rewardLevels});
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