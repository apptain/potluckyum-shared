import { combineReducers } from 'redux';

import auth from './auth';
import events from './events';
import invitations from './invitations';

export default combineReducers({
  auth,
  events,
  invitations
})
