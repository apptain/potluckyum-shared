import { combineReducers } from 'redux';

import auth from './auth';
import events from './events';
import invitations from './invitations';
import wizards from './wizard.ts'

export default combineReducers({
  auth,
  events,
  invitations,
  wizards
})
