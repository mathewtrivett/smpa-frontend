export default {
  calculateNavigation (proposalFlow, currentWorks, currentLevel) {

    console.log('proposalFlow', proposalFlow);
    console.log('currentWorks', currentWorks);
    console.log('currentLevel', currentLevel);

    //find currentLevel in the current proposal
    var currentLevelIndex = currentWorks.goTo.findIndex(function(element) {
      return element === currentLevel;
    });

    // if (currentWorks.goTo.length > 1 && currentWorks.goTo.length < currentLevelIndex + 1) {
      
    if (currentWorks.goTo.length > 1 && currentWorks.goTo.length > currentLevelIndex + 1) {
      
      return { name: currentWorks.goTo[currentLevelIndex + 1], params: {currentLevelInfo: currentWorks }};

    } else {
      //check if it is the last item inside current flow.

      var currentWorkIndexInFlow = proposalFlow.findIndex(element => 
        element.proposalId ===currentWorks.proposalId
      );

      if (proposalFlow.length === currentWorkIndexInFlow + 1) {
        var needsFloorArea = proposalFlow.find(function(element) {
          return element.proposalId === 'single_storey_extension' || 
          element.proposalId === 'two_storey_extension' || 
          element.proposalId === 'part_single_part_two_storey_extension' ||
          element.proposalId === 'outbuilding' ||
          element.proposalId === 'porch';
        });

        if (needsFloorArea) {
          return {name: 'DescriptionOfTheWorks'}
        } else {
          return {name: 'Trees'}
        }

      } else {
        return { name: proposalFlow[currentWorkIndexInFlow + 1].goTo[0], params: {currentLevelInfo: proposalFlow[currentWorkIndexInFlow + 1], id: proposalFlow[currentWorkIndexInFlow + 1].proposalId }};
      }
    }
  }
}
