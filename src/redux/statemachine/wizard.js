import { Machine, assign } from 'xstate';

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
    []: {
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