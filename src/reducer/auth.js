import { AUTH_USER_LOGIN, AUTH_USER_EXPIRE } from '../action/auth';

const defaultState = {
  authStatus: false,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case AUTH_USER_LOGIN:
      return {
        ...state,
        authStatus: true,
      }
    case AUTH_USER_EXPIRE:
      return {
        ...state,
        authStatus: false,
      }
    default:
      return state
  }
}
