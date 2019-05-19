import { GET_AGENT_LIST, GET_AGENT_BYID, GET_AGENT_PRODUCT_LIST } from '../action/agent';

const defaultState = {
  agentList: {},
  agentDetail: {},
  agentProductList: {}
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
    case GET_AGENT_PRODUCT_LIST:
      return {
        ...state,
        agentProductList: action.data
      }
    default:
      return state
  }
}
