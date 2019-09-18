export const set = 'DISPLAY_SET';
export const insert = 'DISPLAY_INSERT';
export const remove = 'DISPLAY_REMOVE';
export const toggleOn = 'DISPLAY_TOGGLE_ON';
export const toggleOff = 'DISPLAY_TOGGLE_OFF';
export const clear = 'DISPLAY_CLEAR';

const initialState = {
  navBarItems: [],
  navBarSecondary: null,
  contentSecondary: null,
  sidebarItems: [],
  actionBarItems: [],
  actionLinks: []
}

//For now we are just overwriting all these value
export default function displayReducers(state = initialState, action = {}) {
  switch (action.type) {
    // case 'FOLLOW_USER':
    //     return { ...state, [action.payload.userId]: true };
    // case 'FOLLOW_USER_ROLLBACK':
    //     return omit(state, [action.payload.userId]);
    //
    // ...statae,
    //     receipts: { ...state.receipts, [action.meta.orderId]: action.payload },
    //     submitting: omit(state.submitting, [action.meta.orderId])
    case actionTypes.display.set:
      return { ...state, [action.setName]: action.value }
    case actionTypes.display.clear:
      return Object.assign({}, state, initialState)
    default:
      return state
  }
}

export function set(setName, value) {
  return {
    type: set,
    setName,
    value
  }
}

export function clear() {
  return {
    type: clear
  }
}
