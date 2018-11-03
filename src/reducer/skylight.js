import { GET_SKYLIGHT_LIST } from '../action/skylight';

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
    default:
      return state
  }
}
