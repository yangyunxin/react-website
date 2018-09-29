import { USER_LOGIN, GET_USER_LIST, GET_USER_BYID, GET_USER_ADDRESS_BYID } from '../action/user';

const defaultState = {
  userList: {}
}

export default function user(state = defaultState, action) {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        ...action.data
      }
    case GET_USER_LIST:
      return {
        ...state,
        userList: action.data
      }
    case GET_USER_BYID:
      return {
        ...state,
        userDetail: action.data
      }
    case GET_USER_ADDRESS_BYID:
      return {
        ...state,
        userAddress: action.data
      }
    default:
    return state
  }
}
