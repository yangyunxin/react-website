import { GET_PRODUCT_TYPE_LIST } from '../action/productType';

const defaultState = {
  productTypeList: {},
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case GET_PRODUCT_TYPE_LIST:
      return {
        ...state,
        productTypeList: action.data
      }
    default:
      return state
  }
}
