import { assign } from 'xstate';
import getQuestionByStateKey from './lib/getQuestionByStateKey';
import {
  ready,
  eventCreate,
  eventUpdate
} from './lib/constants/States';
import {EVENT_CHANGE, } from "../../redux/modules/events";

const eventChange = (event) => {
  return () => {
    assign({
      selectedEvent: event
    });
  }
}

const eventGet = (id) => {
  return {type: EVENT_GET, id};
}

const eventSave = (event) => {
  return {type: EVENT_SAVE, event};
}


