import { Machine, assign } from 'xstate';

//actions
export const ready = '@state/READY';
export const eventCreate = '@state/EVENT_CREATE';
export const eventUpdate = '@state/EVENT_UPDATE';

export const eventGet = '@state/EVENT_GET';
export const eventGetSuccess = '@state/EVENT_GET_SUCCESS';
export const eventGetFail = '@state/EVENT_GET_FAIL';

export const eventCreatePersist = '@state/EVENT_CREATE_PERSIST';
export const eventCreatePersistSuccess = '@state/EVENT_CREATE_PERSIST_SUCCESS';
export const eventCreatePersistFail = '@state/EVENT_CREATE_PERSIST_FAIL';

export const eventUpdatePersist = '@state/EVENT_UPDATE_PERSIST';
export const eventUpdatePersistSuccess = '@state/EVENT_UPDATE_PERSIST_SUCCESS';
export const eventUpdatePersistFail = '@state/EVENT_UPDATE_PERSIST_FAIL';

export const invitationSend = '@state/EVENT_PERSIST';
export const invitationSendSuccess = '@state/INVITATION_SEND_SUCCESS';
export const invitationSendFailure = '@state/INVITATION_SEND_FAIL';

export const CREATE = '@state/CREATE';
export const UPDATE = '@state/UPDATE';
export const DELETE = '@state/DELETE';
export const CHANGE = '@state/CHANGE';

import {EVENT_CHANGE} from '../modules/events';

const initialContext = {
  selectedEvent: {},
  selectedInvitation: {},
  unsavedChanges: {},
  validationErrors: [],
  eventUpdating: false,
  eventGetting: false,
  invitationSending: {},
  invitationSendingResult: {}
};

export const actions = {
  eventChange: (ctx, { changes }) =>
  {
    debugger;
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
}

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

const configureMachine = (context = initialContext) =>
  flowMachine
    .withConfig({
      guards
    });

export default configureMachine;