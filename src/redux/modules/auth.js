export const LOGIN = 'potluckyum/auth/LOGIN';
export const LOGIN_SUCCESS = 'potluckyum/auth/LOGIN_SUCCESS';
export const LOGIN_FAIL = 'potluckyum/auth/LOGIN_FAIL';
export const LOGOUT = 'potluckyum/auth/LOGOUT';
export const LOGOUT_SUCCESS = 'potluckyum/auth/LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'potluckyum/auth/LOGOUT_FAIL';
export const REGISTER = 'potluckyum/auth/USER_REGISTER';
export const REGISTER_SUCCESS = 'potluckyum/auth/USER_REGISTER_SUCCESS';
export const REGISTER_FAIL = 'potluckyum/auth/USER_REGISTER_FAIL';

const initialState = {
  isLoggingIn: false,
  failureMessage: '',
  token: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggingIn: true, failureMessage: null };
    case LOGIN_SUCCESS:
        return { ...state, token: action.data.token };
    case LOGIN_FAIL:
        return { ...state, exception: action.error, userCreating: false};
    case LOGOUT:
      return { ...state, usersLoading : true};
    case REGISTER:
      return { ...state, isLoggingIn: true, failureMessage: null };
    case REGISTER_SUCCESS:
      return { ...state, token: action.data.token };
    case REGISTER_FAIL:
      return { ...state, exception: action.error, userCreating: false};
    default:
      return state
  }
};

export const login = (userName, password) => {
  return {type: LOGIN, userName, password};
};

export const logout = () => {
  return {type: LOGOUT};
};

export const register = (userAccount) => {
  return {type: USER_ACCOUNT_CREATE, userAccount};
};

