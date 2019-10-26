import {
  EVENT_CREATE, EVENT_CREATE_FAIL, EVENT_CREATE_SUCCESS, EVENT_DELETE, EVENT_DELETE_FAIL, EVENT_DELETE_SUCCESS,
  EVENT_GET, EVENT_GET_FAIL, EVENT_GET_SUCCESS,
  EVENT_UPDATE, EVENT_UPDATE_FAIL, EVENT_UPDATE_SUCCESS,
  EVENTS_LIST, EVENTS_LIST_FAIL, EVENTS_LIST_SUCCESS, INVITATION_CHANGE
} from "../../../potluckyum-share-bu/src/redux/modules/events";
import {
  CHANGE,
  CREATE,
  eventCreate,
  eventCreatePersist,
  eventUpdate,
  invitationSend,
  ready,
  UPDATE
} from "./statemachine/events";
import {Machine} from "xstate";

export const EVENT_CHANGE = 'potluckyum/events/EVENT_CHANGE';
export const EVENT_INVITATION_CHANGE = 'potluckyum/events/EVENT_CHANGE';

export const EVENT_GET_CALL = '@state/EVENT_GET_CALL';
export const EVENT_GET_CALL_SUCCESS = '@state/EVENT_GET_CALL_SUCCESS';
export const EVENT_GET_CALL_FAIL = '@state/EVENT_GET_CALL_FAIL';

export const EVENT_POST_CALL = '@state/EVENT_POST_CALL';
export const EVENT_POST_CALL_SUCCESS = '@state/EVENT_POST_CALL_SUCCESS';
export const EVENT_POST_CALL_FAIL = '@state/EVENT_POST_CALL_FAIL';

export const EVENT_PUT_CALL = '@state/EVENT_PUT_CALL';
export const EVENT_PUT_CALL_SUCCESS = '@state/EVENT_PUT_CALL_SUCCESS';
export const EVENT_PUT_CALL_FAIL = '@state/EVENT_PUT_CALL_FAIL';

export const EVENT_PATCH_CALL = '@state/EVENT_PATCH_CALL';
export const EVENT_PATCH_CALL_SUCCESS = '@state/EVENT_PATCH_CALL_SUCCESS';
export const EVENT_PATCH_CALL_FAIL = '@state/EVENT_PATCH_CALL_FAIL';

export const EVENT_DELETE_CALL = '@state/EVENT_DELETE_CALL';
export const EVENT_DELETE_CALL_SUCCESS = '@state/EVENT_DELETE_CALL_SUCCESS';
export const EVENT_DELETE_CALL_FAIL = '@state/EVENT_DELETE_CALL_FAIL';

const initialContext = {
  selectedEvent: {},
  selectedInvitation: {},
  unsavedChanges: {},
  validationErrors: [],
  eventUpdating: false,
  eventGetting: false,
  invitationSending: {},
  invitationSendingResult: {},
  selectedWizardIndex: 0
};

export const actions = {
  // export function eventChange(event) {
  //   return {type: EVENT_CHANGE, event};
  // }
  //
  // export function eventsList() {
  //   return {type: EVENTS_LIST};
  // }
  //
  // export function eventCreate(event) {
  //   return {type: EVENT_CREATE, event};
  // }
  //
  // export function eventUpdate(id, event) {
  //   return {type: EVENT_UPDATE, event};
  // }
  //
  // export function eventGet(id) {
  //   return {type: EVENT_GET, id};
  // }
  //
  // export function eventDelete(id) {
  //   return {type: EVENT_DELETE, id};
  // }

  eventChange: (ctx, { changes }) =>
  {
    debugger;
    return {
      type: EVENT_CHANGE,
      selectedEvent: {...ctx.selectedEvent, ...changes}
    }
  },
  invitationChange: (ctx, { changes }) =>
  {
    return {
      type: EVENT_CHANGE,
      selectedEvent: {...ctx.selectedEvent, ...changes}
    }
  },
  eventGet: (id) => {
    return {type: eventGet, id};
  },
  eventCreatePersist: (event) => {
    return {type: eventCreatePersist, event};
  },
  eventUpdatePersist: (event) => {
    return {type: eventCreatePersist, event};
  },
  invitationSend: () => {
    return {type: invitationSend, id};
  }
};

const guards = {
  shouldCreateNewEvent: (ctx, event) => {
    //TODO
    return true;
  },
  shouldUpdateEvent: (ctx, event) => {
    //TODO
    return true;
  },
  shouldSendInvitation: (ctx, event) => {
    //TODO
    return true;
  }
};


const flowMachine = Machine({
  initial: ready,
  states: {
    [ready]: {
      on: {
        [CREATE]: {
          target: eventCreate,
          cond: 'shouldCreateNewEvent',
        },
        [UPDATE]: {
          target: eventUpdate,
          cond: 'shouldCreateNewEvent',
        }
      }
    },
    [eventCreate]: {
      on: {
        [CHANGE]: {
          actions: 'eventChange'
        }
      }
    },
    [eventUpdate]: {

    }
  }
});

export const configureMachine = (context = initialContext) =>
flowMachine
  .withConfig({
    actions,
    guards
  });

const initialState = {
  selectedEvent: {},
  selectedInvitation: {},
  unsavedChanges: {},
  validationErrors: [],
  eventUpdating: false,
  eventGetting: false,
  invitationSending: {},
  invitationSendingResult: {}
};

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