export const INVITATION_CHANGE = 'potluckyum/invitations/INVITATIONS_CHANGE';

export const INVITATIONS_LIST = 'potluckyum/invitations/INVITATIONS_LIST';
export const INVITATIONS_LIST_SUCCESS = 'potluckyum/invitations/INVITATIONS_LIST_SUCCESS';
export const INVITATIONS_LIST_FAIL = 'potluckyum/invitations/INVITATIONS_LIST_FAIL';
export const INVITATION_CREATE = 'potluckyum/invitations/INVITATION_CREATE';
export const INVITATION_CREATE_SUCCESS = 'potluckyum/invitations/INVITATION_CREATE_SUCCESS';
export const INVITATION_CREATE_FAIL = 'potluckyum/invitations/INVITATION_CREATE_FAIL';
export const INVITATION_GET = 'potluckyum/invitations/INVITATION_GET';
export const INVITATION_GET_SUCCESS = 'potluckyum/invitations/INVITATION_GET_SUCCESS';
export const INVITATION_GET_FAIL = 'potluckyum/invitations/INVITATION_GET_FAIL';
export const INVITATION_UPDATE = 'potluckyum/invitations/INVITATION_UPDATE';
export const INVITATION_UPDATE_SUCCESS = 'potluckyum/invitations/INVITATION_UPDATE_SUCCESS';
export const INVITATION_UPDATE_FAIL = 'potluckyum/invitations/INVITATION_UPDATE_FAIL';
export const INVITATION_DELETE = 'potluckyum/invitations/INVITATION_DELETE';
export const INVITATION_DELETE_SUCCESS = 'potluckyum/invitations/INVITATION_DELETE_SUCCESS';
export const INVITATION_DELETE_FAIL = 'potluckyum/invitations/INVITATION_DELETE_FAIL';

const initialState = {
  selectedEvents: [],
  selectedEvent: {},
  invitationUpdating: false,
  invitationGetting: false,
  invitationsGetting: false
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case INVITATIONS_LIST:
      return {...state, selectedEvents: [], invitationsGetting: true};
    case INVITATIONS_LIST_SUCCESS:
      return { ...state, selectedEvents: action.data, invitationsGetting: false};
    case INVITATIONS_LIST_FAIL:
      return { ...state, selectedEvents: [], invitationsGetting: false};
    case INVITATION_GET:
      return { ...state, selectedEvent: null, invitationGetting : true};
    case INVITATION_GET_SUCCESS:
      return { ...state, selectedEvent: action.data, invitationGetting: false};
    case INVITATION_GET_FAIL:
      return { ...state, selectedEvent: null, invitationGetting: false};
    case INVITATION_CREATE:
      return {...state, invitationUpdating: true};
    case INVITATION_CREATE_SUCCESS:
      return { ...state, invitation: action.data, invitationUpdating: false};
    case INVITATION_CREATE_FAIL:
      return { ...state, invitationUpdating: false};
    case INVITATION_UPDATE:
      return {...state, invitationUpdating: true};
    case INVITATION_UPDATE_SUCCESS:
      return { ...state, invitation: action.data, invitationUpdating: false};
    case INVITATION_UPDATE_FAIL:
      return { ...state, invitationUpdating: false};
    case INVITATION_DELETE:
      return {...state, invitationUpdating: true};
    case INVITATION_DELETE_SUCCESS:
      return { ...state, invitation: action.data, invitationUpdating: false};
    case INVITATION_DELETE_FAIL:
      return { ...state, invitationUpdating: false};
    default:
      return state
  }
}

export function invitationChange(invitation) {
  return {type: INVITATION_CHANGE, invitation};
}

export function invitationsList() {
  return {type: INVITATIONS_LIST};
}

export function invitationCreate(invitation) {
  return {type: INVITATION_CREATE, invitation};
}

export function invitationUpdate(id, invitation) {
  return {type: INVITATION_UPDATE, invitation};
}

export function invitationGet(id) {
  return {type: INVITATION_GET, id};
}

export function invitationDelete(id) {
  return {type: INVITATION_DELETE, id};
}
