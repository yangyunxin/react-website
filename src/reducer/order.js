import { GET_ORDER_LIST, GET_ORDER_BYID } from '../action/order';

const defaultState = {
  orderList: {},
  orderDetail: {},
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_ORDER_LIST:
      return {
        ...state,
        orderList: action.data
      }
    case GET_ORDER_BYID:
      return {
        ...state,
        orderDetail: action.data
      }
    default:
      return state
  }
}
