// Helper methods to determine which classes are appropriate
// given a variable amount of prize levels.
//
var rtClasses = {
  offset: function(rewardLevels) {
    var levels = parseInt(rewardLevels);
    if(levels === 5) {
      return 'col-sm-offset-1';
    } else {
      return 'col-sm-offset-0';
    }
  },
  
  reward: function(rewardLevels) {
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
};

module.exports = rtClasses;