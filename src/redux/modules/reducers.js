import { combineReducers } from 'redux';

import auth from './auth';
import events from './events';
import invitations from './invitations';
import { reducer as wizards } from 'react-redux-wizard';

export default combineReducers({
  auth,
  events,
  invitations,
  wizards
})
