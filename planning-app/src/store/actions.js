import { 
  AuthService,
  ApplicationsService, 
  ExtensionProposalService, 
  EquipmentProposalService,
  CreateBothProposals,
  GenericWorkService,
  SubmitWorksLocation 
} from '@/common/api.service';

export function signIn ({commit}, payload) {
  return AuthService
  .post(payload)
  .then( response => {
    commit('signIn', response.data);
  });
}

export function createApplication ({commit}, applicationData) {
  return ApplicationsService
  .create()
  .then( response => {
    applicationData.data = response.data;
    commit('createApplication', applicationData);
    return applicationData;
  });
}

export function getApplication ({commit}, id) {
  return ApplicationsService
  .get(id)
  .then( response => {
    console.log('------RESPONSE', response.data);
    commit('getApplication', response.data);
  });
}

export function updateApplication ({commit}, data) {
  return ApplicationsService
  .update(data.id, data.data)
  .then( response => {
    commit('updateApplication', response.data);
  });
}

export function createFirstFlow ({commit}, data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      commit('createFirstFlow', data);
      resolve();
    }, 1000);
  });
}

export function updateFlow ({commit}, data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      commit('updateFlow', data);
      resolve();
    }, 1000);
  });
}

export function createExtensionProposal ({commit}, application) {
  return ExtensionProposalService
    .post(application)
    .then( response => {
      commit('addProposal', {
        'applicationId': application.application_id,
        'data': response.data,
        'type': 'extension'
      });
    });
}

export function updateExtensionProposal ({commit}, data) {
  return ExtensionProposalService
    .update(data.selectedProposals, data.extension_id )
    .then( response => {
      commit('updateProposal', {
        'applicationId': data.application_id,
        'data': response.data,
        'type': 'extension'
      });
    });

}

export function createEquipmentProposal ({commit}, application) {
  return EquipmentProposalService
    .post(application)
    .then( response => {
      commit('addProposal', {
        'applicationId': application.application_id,
        'data': response.data,
        'type': 'equipment'
      });
    });
}

export function updateEquipmentProposal ({commit}, data) {
  return ExtensionProposalService
    .update(data.selectedProposals, data.extension_id )
    .then( response => {
      commit('updateProposal', {
        'applicationId': data.application_id,
        'data': response.data,
        'type': 'equipment'
      });
    });
}

export function createBothProposals ({commit}, application) {
  return CreateBothProposals
    .create(application)
    .then ( response => {
      commit('addProposal', {
        'applicationId': application.application_id,
        'data': response
      });
    });
}


export function getDefaultData ({commit}, type) {
  return GenericWorkService
    .get(type)
    .then( response => {
      return response;
    });
}

export function getDefaultDataFromTwoSources ({commit}, resource) {
  return GenericWorkService
    .getBoth(resource)
    .then( response => {
      return response;
    });
}

export function submitWorksLocation ({commit}, payload) {
  return SubmitWorksLocation
    .update(payload)
    .then( response => {
      commit('updateProposal', {
        'applicationId': response.data.application_id,
        'data': response.data,
        'type': payload.type
      });
    });
}


//generate the content for state.js
export function generateProposalEquipment ({commit}, data) {
  let proposal_equipment = [];

  data.forEach(element => {
    var finalObject = {
      'proposalName': element.name,
      'proposalId': element.id,
      'goTo': ["WorksXLocation"]
    }

    proposal_equipment.push(finalObject);
  });

  commit('updateEquipmentFlow', {
    'proposal_equipment': proposal_equipment
  });
}
