import { AUTH_USER_LOGIN, AUTH_USER_EXPIRE, GET_USER_INFO } from '../action/auth';

const defaultState = {
  authStatus: false,
  userInfo: {},
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
    case GET_USER_INFO:
      return {
        ...state,
        userInfo: action.data,
      }
    default:
      return state
  }
}
