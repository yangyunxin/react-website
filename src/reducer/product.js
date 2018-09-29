import { GET_PRODUCT_LIST, GET_PRODUCT_BYID } from '../action/product';

const defaultState = {
  productList: {},
  productDetail: {},
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_PRODUCT_LIST:
      return {
        ...state,
        productList: action.data
      }
    case GET_PRODUCT_BYID:
      return {
        ...state,
        productDetail: action.data
      }
    default:
      return state
  }
}
