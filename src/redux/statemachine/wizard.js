import { Machine, assign } from 'xstate';

export const actions = {
  eventChange: (ctx, { changes }) =>
  {
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