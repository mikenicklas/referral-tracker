var RtDomBuilder = function() {
  
  // Must return an object with an html property.
  //
  
  this.rewardLevel = function(opts) {
    var opts = opts || {};
    var level = $('<div class="' + opts.rewardClass + ' reward-level reward-level-' + opts.index + '"></div>');
    level.append('<span class="reward-level-text">' + opts.rewardLevels[opts.index] + '</span>')
    this.html = level.wrap('<div>').parent().html();
  };
  
  this.rewardLevelsContainer = function(opts) {
    var opts = opts || {rewardLevelNodes: ''},
        elemHtml = '<div class="col-sm-12 col-xs-3 referral-tracker-rewards" style="text-align: left">';
        elemHtml += opts.rewardLevelNodes;
        elemHtml += '</div>';
    this.html = elemHtml;
  }
  
  this.prizeRow = function(opts) {
    var opts = opts || {prizeNodes: ''},
        elemHtml = '<div class="col-sm-12 col-xs-9 referral-tracker-prizes" style="text-align: left">';
        elemHtml += opts.prizeNodes;
        elemHtml += '</div>';
    this.html = elemHtml;
  }
  
  this.prize = function(opts) {
    var opts = opts || {};
    var prizeLevel = $('<div class="' + opts.prizeClass + ' reward-level-prize reward-level-' + opts.index + '">' + opts.prizes[opts.index] + '</div>');
    this.html = prizeLevel.wrap('<div>').parent().html();
  }
  
  this.collection = function(Obj, collection, data) {
    var data = data || {},
        html = '';
    for(var i = 0; i < collection.length; i++) {
      data.index = i;
      html += new Obj(data).html;
    }
    this.html = html;
  }
};

module.exports = new RtDomBuilder();