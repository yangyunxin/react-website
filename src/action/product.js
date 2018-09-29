import API from '../utils/api';
import { get, post } from '../utils/request';
import { authUserExpire } from './auth';

export const GET_PRODUCT_LIST = 'GET_PRODUCT_LIST';
export const GET_PRODUCT_BYID = 'GET_PRODUCT_BYID';

export function getProductList(params) {
  return async (dispatch) => {
    const result = await get(API.productList, params);
    if (result && result.status === 200) {
      dispatch({
        type: GET_PRODUCT_LIST,
        data: result.data
      })
    } else if (result.status === 401) {
      dispatch(authUserExpire);
    }
  }
}


export function getProductById(id) {
  return async (dispatch) => {
    const result = await get(`${API.getProductById}${id}`);
    if (result && result.status === 200) {
      dispatch({
        type: GET_PRODUCT_BYID,
        data: result.data.data
      })
    }
  }
}

export async function addProduct(params) {
  const result = await post(API.addProduct, params);
  if (result && result.status === 200) {
    console.log(result.data)
    return result.data
  }
}
