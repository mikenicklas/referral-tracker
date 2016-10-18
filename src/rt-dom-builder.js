var RtDomBuilder = function() {
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
};

module.exports = new RtDomBuilder();