import { GET_USER_LIST, GET_USER_BYID, GET_USER_ADDRESS_BYID, GET_USER_ORDER_BYID, GET_USER_LOGIN_LOGS } from '../action/user';

const defaultState = {
  userList: {},
  userDetail: {},
  userAddress: {},
  userLoginLogs: {},
}

export default function user(state = defaultState, action) {
  switch (action.type) {
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
    case GET_USER_ORDER_BYID:
      return {
        ...state,
        userOrderList: action.data
      }
    case GET_USER_LOGIN_LOGS:
      return {
        ...state,
        userLoginLogs: action.data
      }
    default:
    return state
  }
}
