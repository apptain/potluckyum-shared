import { Machine } from 'xstate';

const eventMachine = () => {
  debugger;
  const guards = {
    eventValid: (context, e) => {
      debugger;
      //return context.validationErrors.length === 0;
    },
    shouldCreateNewTicket: (ctx, { data }) => { debugger; return data.value === "new_ticket" },
    shouldFindTicket: (ctx, { data }) => data.value === "find_ticket"
  };

// actions.js - functions that perform an action like updating the stateful data in the app
  const actions = {
    askIntroQuestion: ctx => {
      debugger;
      console.log('HITME')
      return {
        ...ctx,
        chat: ["How may I help you?"]
      };
    }
  };


  const eventMachine = Machine({
    id: "event",
    initial: "creating",
    type: 'parallel',
    context: {
      event: {},
      validationErrors: [],
      unsavedChanges: {}
    },
    states: {
      creating: {
        on: {
          CHANGE: {
            cond: "shouldCreateNewTicket",
            actions: 'askIntroQuestion',
            target: "saving"
          }
        },
      },
      updating: {
        //Container will set this state and context
      },
      saving: {

      },
      closing: {

      }
    }
  });

  debugger;

  const configMachine = eventMachine.withConfig({
    actions,
    guards
  });

  return configMachine;
}



export default eventMachine;