//creates application with application id returned from the backend, selected address info and site's geojson
export function createApplication (state, data) {
  const applications = state.state.applications;
  applications.push(data);
  state.state.applications = applications;
}

export function updateApplication (state, data) {
  const position = state.state.applications.findIndex( application => application.data.id === data.id );

  if (position) {
    state.state.applications[position].data = data;
  }
}

export function createFirstFlow (state, data) {
  data.selectedProposal.forEach(function(element, index) {
    state.state.proposalFlow.forEach(function(el) {

      if (element === el.proposalId) {
        data.selectedProposal.splice(index, 1);
      }
    });
  });

  if (data.selectedProposal.length === 0) {
    return;
  }

  var mapKeys = Object.keys(state.state.proposalMap);

  var currentLevelInMap = mapKeys.find(function(element) {
    return element === data.currentLevel;
  });

  var listOfOptions = state.state.proposalMap[currentLevelInMap];

  let firstFlow = [];

  data.selectedProposal.forEach(function(element) {
    var selectedProposal = listOfOptions.find(function(option) {
      return option.proposalId === element;
    });

    firstFlow.push(selectedProposal);

  });

  state.state.proposalFlow = firstFlow;

}

export function updateFlow (state, data) {
  //todo check if selected proposal already exists
  data.selectedProposal.forEach(function(element, index) {
    state.state.proposalFlow.forEach(function(el) {

      if (element === el.proposalId) {
        data.selectedProposal.splice(index, 1);
      }
    });
  });

  if (data.selectedProposal.length === 0) {
    return;
  }

  var mapKeys = Object.keys(state.state.proposalMap);

  var currentLevelInMap = mapKeys.find(function(element) {
    return element === data.currentLevel;
  });

  var listOfOptions = state.state.proposalMap[currentLevelInMap];

  let flow = [];

  data.selectedProposal.forEach(function(element) {
    var selectedProposal = listOfOptions.find(function(option) {
      return option.proposalId === element;
    });

    flow.push(selectedProposal);

  });

  var currentLevelPosition = state.state.proposalFlow.findIndex(x => x.proposalId === currentLevelInMap);

  for (let i = 0; i < flow.length; i++) { 
    state.state.proposalFlow.splice(currentLevelPosition + 1 + i, 0, flow[i]);
  }

  // console.log('--------FINAL FLOW', state.state.proposalFlow);
}





