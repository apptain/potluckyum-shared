import {Machine} from "xstate";

export const EVENT_CHANGE = '@potluckyum/EVENT_CHANGE';
export const EVENT_CREATE = '@potluckyum/EVENT_CREATE';

export const INVITATION_CHANGE = '@potluckyum/INVITATION_CHANGE';
export const INVITATION_ADD = '@potluckyum/INVITATION_ADD';
export const INVITATION_SEND = '@potluckyum/INVITATION_SEND';
export const INVITATION_REMOVE = '@potluckyum/INVITATION_REMOVE';
export const INVITATION_CANCEL = '@potluckyum/INVITATION_CANCEL';

export const EVENT_GET_REQUEST = '@potluck/EVENT_GET_REQUEST';
export const EVENT_GET_REQUEST_SUCCESS = '@potluck/EVENT_GET_REQUEST_SUCCESS';
export const EVENT_GET_REQUEST_FAIL = '@potluck/EVENT_GET_REQUEST_FAIL';

export const INVITATION_SEND_REQUEST = '@potluck/INVITATION_SEND_REQUEST';
export const INVITATION_SEND_SUCCESS = '@potluck/INVITATION_SEND_SUCCESS';
export const INVITATION_SEND_FAIL = '@potluck/INVITATION_SEND_FAIL';

export const EVENT_POST_REQUEST = '@potluck/EVENT_POST_REQUEST';
export const EVENT_POST_REQUEST_SUCCESS = '@potluck/EVENT_POST_REQUEST_SUCCESS';
export const EVENT_POST_REQUEST_FAIL = '@potluck/EVENT_POST_REQUEST_FAIL';

export const EVENT_PUT_REQUEST = '@potluck/EVENT_PUT_REQUEST';
export const EVENT_PUT_REQUEST_SUCCESS = '@potluck/EVENT_PUT_REQUEST_SUCCESS';
export const EVENT_PUT_REQUEST_FAIL = '@potluck/EVENT_PUT_REQUEST_FAIL';

export const EVENT_PATCH_REQUEST = '@potluck/EVENT_PATCH_REQUEST';
export const EVENT_PATCH_REQUEST_SUCCESS = '@potluck/EVENT_PATCH_REQUEST_SUCCESS';
export const EVENT_PATCH_REQUEST_FAIL = '@potluck/EVENT_PATCH_REQUEST_FAIL';

export const EVENT_DELETE_REQUEST = '@potluck/EVENT_DELETE_REQUEST';
export const EVENT_DELETE_REQUEST_SUCCESS = '@potluck/EVENT_DELETE_REQUEST_SUCCESS';
export const EVENT_DELETE_REQUEST_FAIL = '@potluck/EVENT_DELETE_REQUEST_FAIL';

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

  eventChange: (ctx, { dispatch, changes }) =>
  {
    dispatch({
      type: EVENT_CHANGE,
      selectedEvent: {...ctx.selectedEvent, ...changes}
    });
  },
  invitationChange: (ctx, { dispatch, changes }) =>
  {

    dispatch({
      type: INVITATION_CHANGE,
      selectedInvitation: {...ctx.selectedInvitation, ...changes}
    });
  },
  invitationAdd: (ctx, { dispatch, selectedEvent, selectedInvitation }) =>
  {
    if(!selectedEvent.invitations) {
      selectedEvent.invitations = [];
    }
    selectedEvent.invitations.push( selectedInvitation);
    dispatch({
      type: INVITATION_ADD,
      selectedEvent,
      selectedInvitation: {}
    });
  },
  eventWizardPrevious: (ctx, { dispatch, selectedWizardIndex }) =>
  {
    dispatch({
      type: EVENT_WIZARD_PREVIOUS,
      selectedWizardIndex: selectedWizardIndex - 1
    });
  },
  eventWizardNext: (ctx, { dispatch, selectedWizardIndex }) =>
  {
    debugger;
    dispatch({
      type: EVENT_WIZARD_NEXT,
      selectedWizardIndex:  selectedWizardIndex + 1
    });
  },
  eventCreate: (ctx, { dispatch, selectedEvent }) =>
  {
    //notify saga
    dispatch({
      type: EVENT_CREATE,
      event: selectedEvent
    });
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
  invitationSend: (ctx, { dispatch, selectedEvent, invitation }) =>
  {
    debugger;
    //notify saga
    dispatch({
      type: INVITATION_SEND_REQUEST,
      eventId: selectedEvent.id,
      invitation
    });
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
  },
  eventWizardShouldMoveNext: (ctx, {selectedWizardIndex, wizardStepsCount}) => {
    return selectedWizardIndex < wizardStepsCount - 1;
  },
  eventWizardShouldMovePrevious: (ctx, {selectedWizardIndex, wizardStepsCount}) => {
    return selectedWizardIndex > 0
  },
};

export const EVENT_WIZARD_READY = '@potluckyum/state/EVENT_CREATE';
export const EVENT_WIZARD_NEXT = '@potluckyum/state/EVENT_WIZARD_NEXT';
export const EVENT_WIZARD_PREVIOUS = 'potluckyum/state/EVENT_WIZARD_PREVIOUS';
export const EVENT_WIZARD_CREATE = '@potluck/EVENT_WIZARD_CREATE';
export const EVENT_WIZARD_UPDATE = '@potluck/EVENT_WIZARD_UPDATE';
export const EVENT_WIZARD_CANCEL = '@potluck/EVENT_WIZARD_CANCEL';
export const EVENT_WIZARD_REVIEW = '@potluck/EVENT_WIZARD_REVIEW';
export const EVENT_WIZARD_DELETE = '@potluck/EVENT_WIZARD_DELETE';

const flowMachine = Machine({
  initial: EVENT_WIZARD_READY,
  states: {
    [EVENT_WIZARD_READY]: {
      on: {
        [EVENT_CHANGE]: {
          actions: 'eventChange',
        },
        [INVITATION_CHANGE]: {
          actions: 'invitationChange',
        },
        [INVITATION_ADD]: {
          actions: 'invitationAdd',
        },
        [INVITATION_SEND]: {
          actions: 'invitationSend',
        },
        [EVENT_WIZARD_PREVIOUS]: {
          cond: 'eventWizardShouldMovePrevious',
          actions: 'eventWizardPrevious'
        },
        [EVENT_WIZARD_NEXT]: {
          cond: 'eventWizardShouldMoveNext',
          actions: 'eventWizardNext'
        },
        [EVENT_CREATE]: {
          //cond: 'eventWizardCreateGuard',
          actions: 'eventCreate'
        }
      }
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
  selectedWizardIndex: 0,
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
  //state = initialState;
  switch (action.type) {
    case EVENT_CHANGE:
      return {...state, selectedEvent: action.selectedEvent};
    case INVITATION_CHANGE:
      return {...state, selectedInvitation: action.selectedInvitation};
    case INVITATION_ADD:
      return {...state, selectedEvent: action.selectedEvent, selectedInvitation: action.selectedInvitation};
    case EVENT_WIZARD_PREVIOUS:
      return {...state, selectedWizardIndex: action.selectedWizardIndex};
    case EVENT_WIZARD_NEXT:
      return {...state, selectedWizardIndex: action.selectedWizardIndex};
    // case WIZARD_NAVIGATE:
      //return {...state, selectedInvitation: action.selectedInvitation};
    // case EVENTS_LIST:
    //   return {...state, selectedEvents: [], eventsGetting: true};
    // case EVENTS_LIST_SUCCESS:
    //   return { ...state, selectedEvents: action.data, eventsGetting: false};
    // case EVENTS_LIST_FAIL:
    //   return { ...state, selectedEvents: [], eventsGetting: false};
    // case EVENT_GET:
    //   return { ...state, selectedEvent: null, eventGetting : true};
    // case EVENT_GET_SUCCESS:
    //   return { ...state, selectedEvent: action.data, eventGetting: false};
    // case EVENT_GET_FAIL:
    //   return { ...state, selectedEvent: null, eventGetting: false};
    // case EVENT_CREATE:
    //   return {...state, eventUpdating: true};
    // case EVENT_CREATE_SUCCESS:
    //   return { ...state, event: action.data, eventUpdating: false};
    // case EVENT_CREATE_FAIL:
    //   return { ...state, eventUpdating: false};
    // case EVENT_UPDATE:
    //   return {...state, eventUpdating: true};
    // case EVENT_UPDATE_SUCCESS:
    //   return { ...state, event: action.data, eventUpdating: false};
    // case EVENT_UPDATE_FAIL:
    //   return { ...state, eventUpdating: false};
    // case EVENT_DELETE:
    //   return {...state, eventUpdating: true};
    // case EVENT_DELETE_SUCCESS:
    //   return { ...state, event: action.data, eventUpdating: false};
    // case EVENT_DELETE_FAIL:
    //   return { ...state, eventUpdating: false};


    default:
      return state
  }
}