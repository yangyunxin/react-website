import { GET_AGENT_LIST, GET_AGENT_BYID } from '../action/agent';

const defaultState = {
  agentList: {},
  agentDetail: {},
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_AGENT_LIST:
      return {
        ...state,
        agentList: action.data
      }
    case GET_AGENT_BYID:
      return {
        ...state,
        agentDetail: action.data
      }
    default:
      return state
  }
}
