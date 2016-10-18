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
  
  this.collection = function(Obj, collection, opts) {
    var opts = opts || {},
        html = '';
    for(var i = 0; i < collection.length; i++) {
      opts.index = i;
      html += new Obj(opts).html;
    }
    this.html = html;
  }
};

module.exports = new RtDomBuilder();