import {Machine} from "xstate";

// creating/updating/deleting
//
// change/undo
//
// valid/invalid

const docFormStateMachine = Machine({
  id: "doc",
  initial: "blank",
  states: {
    blank: {
      on: {
        CHANGE: {
          target: "new"
        },
        UNDO: {
          target: "alert"
        },
        SAVE: {
          target: "alert"
        }
      }
    },
    new: {
      on: {
        CHANGE: {
          onEntry: "",
          target: "new"
        },
        SAVE: {
          target: ""
        }
      }
    },
    updated: {

    }
  }
});

export default docFormStateMachine;