import { Machine } from 'xstate';
import {
  ready,
  event,
  eventCreate,
  pending,
  done,
  error,
  noResults,
  itemOrdered,
  eventUpdate,
  pingEvent,
  shouldSkip,
  skipped
} from './lib/constants/States';
import { CREATE, UPDATE, DELETE, CHANGE } from './lib/constants/Actions';

const flowMachine = Machine({
  initial: ready,
  states: {
    [ready]: {
      initial: prompt,
      on: {
        [CREATE]: {
          target: eventCreate,
          cond: 'shouldCreateNewEvent',
          actions: 'updateCtxWithAnswer'
        },
        [UPDATE]: {
          target: eventUpdate,
          cond: 'shouldCreateNewEvent',
          actions: 'updateCtxWithAnswer'
        }
      },
      states: {
        [prompt]: { onEntry: 'askIntroQuestion' }
      }
    },
    [eventCreate]: {
      initial: event,
      [CHANGE]: {
        target: eventCreate,
        cond: 'shouldCreateNewEvent',
        actions: 'updateCtxWithAnswer'
      },
      on: {
        [CREATE]: { target: `.${pending}`, actions: 'updateCtxWithAnswer' }
      },
      states: {
        [event]: { onEntry: 'askNewEvent' },
        [error]: {},
        [noResults]: {},
        [pending]: {
          invoke: {
            src: 'getPeripheral',
            onDone: [
              {
                target: done,
                actions: 'updateCtxWithResults',
                cond: 'hasItems'
              },
              { target: noResults }
            ],
            onError: error
          }
        },
        [done]: {
          type: 'final'
        }
      },
      onDone: itemOrdered
    },
    [eventUpdate]: {
      initial: event,
      on: {
        [CREATE]: { target: `.${pending}`, actions: 'updateCtxWithAnswer' }
      },
      states: {
        [event]: { onEntry: 'askFindEvent' },
        [error]: {},
        [noResults]: {},
        [pending]: {
          invoke: {
            src: 'getEvent',
            onDone: [
              {
                target: done,
                actions: 'updateCtxWithResults',
                cond: 'foundEvent'
              },
              { target: noResults }
            ],
            onError: error
          }
        },
        [done]: { type: 'final' }
      },
      onDone: pingEvent
    }
  }
});

export default flowMachine;
