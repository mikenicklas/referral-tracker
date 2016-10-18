;(function($) {
  var RtDomBuilder = require('./rt-dom-builder.js'),
      rtClasses = require('./rt-classes.js'),
      styles = require('./styles.scss');

  var ReferralTracker = function(el, trackerOpts) {
    this.trackerOpts = trackerOpts || {},
    this.$el = $(el);
    this.createTracker();
  };
  
  ReferralTracker.prototype = {
    createTracker: function() {
      this.$el.addClass('row');
      this.setupTrackerData();
      this.buildRewardRow();
      this.buildPrizeRow();
      // Setup mobile version?
    },
    
    setupTrackerData: function() {
      var rewardLevels = this.trackerOpts.rewardLevels;
      this._set('rtData', {
        rewardLevels: rewardLevels,
        prizes: this.trackerOpts.prizes,
        rewardClass: rtClasses.reward(rewardLevels.length),
        offsetClass: rtClasses.offset(rewardLevels.length)
      });
    },
    
    buildRewardRow: function() {
      var $el = this.$el,
          rewardCollection = this.buildRewardCollection(),
          referralTrackerRewards = new RtDomBuilder.rewardLevelsContainer({rewardLevelNodes: rewardCollection.html});
      $el.html(referralTrackerRewards.html);
      $el.find('.reward-level:first').addClass(this._get('offsetClass'));
    },
    
    buildPrizeRow: function() {
      var $el = this.$el,
          prizeCollection = this.buildPrizeCollection(),
          prizeRow = new RtDomBuilder.prizeRow({prizeNodes: prizeCollection.html});
      $el.append(prizeRow.html);
      $el.find('.reward-level-prize:first').addClass(this._get('offsetClass'));
    },
    
    buildRewardCollection: function() {
      var collection = new RtDomBuilder.collection(RtDomBuilder.rewardLevel, this._get('rewardLevels'), {
                                rewardClass: this._get('rewardClass'),
                                rewardLevels: this._get('rewardLevels')});
      return collection;
    },
    
    buildPrizeCollection: function() {
      var collection = new RtDomBuilder.collection(RtDomBuilder.prize, this._get('prizes'), {
                              prizeClass: this._get('rewardClass'),
                              prizes: this._get('prizes')});
      return collection;
    },
    
    _set: function(attr, obj) {
      this[attr] = obj;
    },
    
    _get: function (attr) {
      try {
        return this.rtData[attr];
      } catch (err) {
        return '';
      }
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