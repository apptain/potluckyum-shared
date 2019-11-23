import {Machine} from "xstate";

export const EVENT_CHANGE = '@potluckyum/EVENT_CHANGE';
export const INVITATION_CHANGE = '@potluckyum/INVITATION_CHANGE';
export const INVITATION_ADD = '@potluckyum/INVITATION_ADD';
export const INVITATION_REMOVE = '@potluckyum/INVITATION_REMOVE';
export const INVITATION_CANCEL = '@potluckyum/INVITATION_CANCEL';

export const EVENT_GET_CALL = '@potluck/EVENT_GET_CALL';
export const EVENT_GET_CALL_SUCCESS = '@potluck/EVENT_GET_CALL_SUCCESS';
export const EVENT_GET_CALL_FAIL = '@potluck/EVENT_GET_CALL_FAIL';

export const EVENT_POST_CALL = '@potluck/EVENT_POST_CALL';
export const EVENT_POST_CALL_SUCCESS = '@potluck/EVENT_POST_CALL_SUCCESS';
export const EVENT_POST_CALL_FAIL = '@potluck/EVENT_POST_CALL_FAIL';

export const EVENT_PUT_CALL = '@potluck/EVENT_PUT_CALL';
export const EVENT_PUT_CALL_SUCCESS = '@potluck/EVENT_PUT_CALL_SUCCESS';
export const EVENT_PUT_CALL_FAIL = '@potluck/EVENT_PUT_CALL_FAIL';

export const EVENT_PATCH_CALL = '@potluck/EVENT_PATCH_CALL';
export const EVENT_PATCH_CALL_SUCCESS = '@potluck/EVENT_PATCH_CALL_SUCCESS';
export const EVENT_PATCH_CALL_FAIL = '@potluck/EVENT_PATCH_CALL_FAIL';

export const EVENT_DELETE_CALL = '@potluck/EVENT_DELETE_CALL';
export const EVENT_DELETE_CALL_SUCCESS = '@potluck/EVENT_DELETE_CALL_SUCCESS';
export const EVENT_DELETE_CALL_FAIL = '@potluck/EVENT_DELETE_CALL_FAIL';

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
    debugger;
    dispatch({
      type: INVITATION_CHANGE,
      selectedInvitation: {...ctx.selectedInvitation, ...changes}
    });
  },
  invitationAdd: (ctx, { dispatch }) =>
  {

    const {selectedEvent, selectedInvitation} = ctx.eventsState;
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
    dispatch({
      type: EVENT_WIZARD_NEXT,
      selectedWizardIndex:  selectedWizardIndex + 1
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
  },
  eventWizardShouldMoveNext: (ctx, {selectedWizardIndex, wizardStepsCount}) => {
    return selectedWizardIndex < wizardStepsCount - 1;
  },
  eventWizardShouldMovePrevious: (ctx, {selectedWizardIndex, wizardStepsCount}) => {
    return selectedWizardIndex > 0;
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
        [EVENT_WIZARD_CREATE]: {
          target: EVENT_WIZARD_CREATE,
          cond: 'shouldCreateNewEvent',
        },
        [EVENT_CHANGE]: {
          actions: 'eventChange',
        }
        // [EVENT_WIZARD_UPDATE]: {
        //   target: EVENT_WIZARD_UPDATE,
        //   //cond: 'shouldCreateNewEvent',
        // }
      }
    },
    [EVENT_WIZARD_CREATE]: {
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
        [EVENT_WIZARD_PREVIOUS]: {
          cond: 'eventWizardShouldMovePrevious',
          actions: 'eventWizardPrevious'
        },
        [EVENT_WIZARD_NEXT]: {
          cond: 'eventWizardShouldMoveNext',
          actions: 'eventWizardNext'
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