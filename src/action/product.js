import API from '../utils/api';
import { get, post, put } from '../utils/request';
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
    } else if (!result) {
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
    } else if (!result) {
      dispatch(authUserExpire);
    }
  }
}

export async function addProduct(params) {
  const result = await post(API.addProduct, params);
  if (result && result.status === 200) {
    return result.data
  }
}

export async function updateProduct(params) {
  const result = await put(API.updateProduct, params);
  if (result && result.status === 200) {
    return result.data
  }
}

export async function batchUpProduct(params) {
  const result = await post(API.batchUpProduct, params);
  if (result && result.status === 200) {
    return result.data
  }
}
