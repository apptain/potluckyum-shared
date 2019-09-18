const NOTIFICATION_SEND = 'redux-example/notifications/NOTIFICATION_SEND';
const NOTIFICATION_DISMISS = 'redux-example/notifications/NOTIFICATION_DISMISS';
const NOTIFICATION_CLEAR = 'redux-example/notifications/NOTIFICATION_CLEAR';
const NOTIFICATION_CLEAR_ALL = 'redux-example/notifications/NOTIFICATION_CLEAR_ALL';

const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case NOTIFICATION_SEND:
      return { ...state, [action.namespace]: [action.payload, ...(state[action.namespace] || [])] };
    case NOTIFICATION_DISMISS:
      return {
        ...state,
        [action.namespace]: (state[action.namespace] || []).filter(notif => notif.id !== action.payload)
      };
    case NOTIFICATION_CLEAR:
      return { ...state, [action.namespace]: [] };
    case NOTIFICATION_CLEAR_ALL:
      return {};
    default:
      return state;
  }
}

export function notificationSend(notif, namespace = 'global') {
  if (!notif.id) {
    notif.id = new Date().getTime() * Math.random();
  }
  return dispatch => {
    dispatch({ type: NOTIFICATION_SEND, namespace, payload: notif });

    if (notif.dismissAfter) {
      setTimeout(() => dispatch({ type: NOTIFICATION_DISMISS, namespace, payload: notif.id }), notif.dismissAfter);
    }
  };
}

export function notificationDismiss(id, namespace = 'global') {
  return { type: NOTIFICATION_DISMISS, namespace, payload: id };
}

export function notificationClear(namespace = 'global') {
  return { type: NOTIFICATION_CLEAR, namespace };
}

export function notificationClearAll() {
  return { type: NOTIFICATION_CLEAR_ALL };
}
