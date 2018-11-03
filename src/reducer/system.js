import { GET_SYSTEM_LOG_LIST } from '../action/system';

const defaultState = {
  systemLogList: {},
  systemLogDetail: {},
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_SYSTEM_LOG_LIST:
      return {
        ...state,
        systemLogList: action.data
      }
    default:
      return state
  }
}
