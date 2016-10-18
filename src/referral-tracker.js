;(function($) {
  var RtDomBuilder = require('./rt-dom-builder.js'),
      rtClasses = require('./rt-classes.js');

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
          rewardClass = rtClasses.reward(rewardLevels.length),
          offsetClass = rtClasses.offset(rewardLevels.length),
          Builder = RtDomBuilder.collection,
          rewardHtml = new Builder(RtDomBuilder.rewardLevel, rewardLevels, {
                                    rewardClass: rewardClass,
                                    rewardLevels: rewardLevels}),
          prizeHtml = new Builder(RtDomBuilder.prize, prizes, {
                                  prizeClass: rewardClass,
                                  prizes: prizes});
      this._set('rewardLevelNodes', {html: rewardHtml.html, offsetclass: offsetClass});
      this._set('prizeNodes', {html: prizeHtml.html});
    },
    
    buildRewardRow: function() {
      var $el = this.$el,
          Builder = RtDomBuilder.rewardLevelsContainer;
          referralTrackerRewards = new Builder({rewardLevelNodes: this.rewardLevelNodes.html});
      $el.html(referralTrackerRewards.html);
      $el.find('.reward-level:first').addClass(this.rewardLevelNodes.offsetClass);
    },
    
    buildPrizeRow: function() {
      var $el = this.$el,
          Builder = RtDomBuilder.prizeRow,
          prizeRow = new Builder({prizeNodes: this.prizeNodes.html});
      $el.append(prizeRow.html);
      $el.find('.reward-level-prize:first').addClass(this.rewardLevelNodes.offsetClass);
    },
    
    _set: function(attr, obj) {
      this[attr] = obj;
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