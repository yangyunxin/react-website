import { GET_SYSTEM_LOG_LIST, GET_SYSTEM_DICT_LIST } from '../action/system';

const defaultState = {
  systemLogList: {},
  systemDictList: {},
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_SYSTEM_LOG_LIST:
      return {
        ...state,
        systemLogList: action.data
      }
    case GET_SYSTEM_DICT_LIST:
      return {
        ...state,
        systemDictList: action.data
      }
    default:
      return state
  }
}
