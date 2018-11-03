import { GET_SKYLIGHT_LIST, GET_SKYLIGHT_BYID } from '../action/skylight';

const defaultState = {
  skylightList: {},
  skylightDetail: {},
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_SKYLIGHT_LIST:
      return {
        ...state,
        skylightList: action.data
      }
    case GET_SKYLIGHT_BYID:
      return {
        ...state,
        skylightDetail: action.data
      }
    default:
      return state
  }
}
