export const EVENT_CHANGE = 'potluckyum/events/EVENT_CHANGE';
export const INVITATION_CHANGE = 'potluckyum/events/EVENT_CHANGE';

export const EVENTS_LIST = 'potluckyum/events/EVENTS_LIST';
export const EVENTS_LIST_SUCCESS = 'potluckyum/events/EVENTS_LIST_SUCCESS';
export const EVENTS_LIST_FAIL = 'potluckyum/events/EVENTS_LIST_FAIL';
export const EVENT_CREATE = 'potluckyum/events/EVENT_CREATE';
export const EVENT_CREATE_SUCCESS = 'potluckyum/events/EVENT_CREATE_SUCCESS';
export const EVENT_CREATE_FAIL = 'potluckyum/events/EVENT_CREATE_FAIL';
export const EVENT_GET = 'potluckyum/events/EVENT_GET';
export const EVENT_GET_SUCCESS = 'potluckyum/events/EVENT_GET_SUCCESS';
export const EVENT_GET_FAIL = 'potluckyum/events/EVENT_GET_FAIL';
export const EVENT_UPDATE = 'potluckyum/events/EVENT_UPDATE';
export const EVENT_UPDATE_SUCCESS = 'potluckyum/events/EVENT_UPDATE_SUCCESS';
export const EVENT_UPDATE_FAIL = 'potluckyum/events/EVENT_UPDATE_FAIL';
export const EVENT_DELETE = 'potluckyum/events/EVENT_DELETE';
export const EVENT_DELETE_SUCCESS = 'potluckyum/events/EVENT_DELETE_SUCCESS';
export const EVENT_DELETE_FAIL = 'potluckyum/events/EVENT_DELETE_FAIL';

const initialState = {
  selectedEvent: {},
  selectedInvitation: {},
  unsavedChanges: {},
  validationErrors: [],
  eventUpdating: false,
  eventGetting: false,
  invitationSending: {},
  invitationSendingResult: {}
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case EVENT_CHANGE:

      return {...state, selectedEvent: action.selectedEvent};
    case INVITATION_CHANGE:

      return {...state, selectedInvitation: action.selectedInvitation};
    case EVENTS_LIST:
      return {...state, selectedEvents: [], eventsGetting: true};
    case EVENTS_LIST_SUCCESS:
      return { ...state, selectedEvents: action.data, eventsGetting: false};
    case EVENTS_LIST_FAIL:
      return { ...state, selectedEvents: [], eventsGetting: false};
    case EVENT_GET:
      return { ...state, selectedEvent: null, eventGetting : true};
    case EVENT_GET_SUCCESS:
      return { ...state, selectedEvent: action.data, eventGetting: false};
    case EVENT_GET_FAIL:
      return { ...state, selectedEvent: null, eventGetting: false};
    case EVENT_CREATE:
      return {...state, eventUpdating: true};
    case EVENT_CREATE_SUCCESS:
      return { ...state, event: action.data, eventUpdating: false};
    case EVENT_CREATE_FAIL:
      return { ...state, eventUpdating: false};
    case EVENT_UPDATE:
      return {...state, eventUpdating: true};
    case EVENT_UPDATE_SUCCESS:
      return { ...state, event: action.data, eventUpdating: false};
    case EVENT_UPDATE_FAIL:
      return { ...state, eventUpdating: false};
    case EVENT_DELETE:
      return {...state, eventUpdating: true};
    case EVENT_DELETE_SUCCESS:
      return { ...state, event: action.data, eventUpdating: false};
    case EVENT_DELETE_FAIL:
      return { ...state, eventUpdating: false};


    default:
      return state
  }
}

export function eventChange(event) {
  return {type: EVENT_CHANGE, event};
}

export function eventsList() {
  return {type: EVENTS_LIST};
}

export function eventCreate(event) {
  return {type: EVENT_CREATE, event};
}

export function eventUpdate(id, event) {
  return {type: EVENT_UPDATE, event};
}

export function eventGet(id) {
  return {type: EVENT_GET, id};
}

export function eventDelete(id) {
  return {type: EVENT_DELETE, id};
}
