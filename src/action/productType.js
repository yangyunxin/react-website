import API from '../utils/api';
import { get, post, put } from '../utils/request';

export const GET_PRODUCT_TYPE_LIST = 'GET_PRODUCT_TYPE_LIST';

export function getProductTypeList(params) {
  return async (dispatch) => {
    const result = await get(API.getProductTypeList, params);
    if (result && result.status === 200) {
      dispatch({
        type: GET_PRODUCT_TYPE_LIST,
        data: result.data
      });
    } else {
      dispatch({
        type: GET_PRODUCT_TYPE_LIST,
        data: {}
      });
    }
  }
}

export async function postProductType(params) {
  const result = await post(API.postProductType, params);
  if (result && result.status === 200) {
    return result.data;
  }
}

export async function putProductType(params) {
  const result = await put(API.putProductType, params);
  if (result && result.status === 200) {
    return result.data;
  }
}

export async function getProductTypeById(id) {
  const result = await get(`${API.getProductTypeById.replace(/{id}/, id)}`);
  if (result && result.status === 200) {
    return result.data.data
  }
}

export async function getSystemDictByLabel(label) {
  const result = await get(`${API.getSystemDictByLabel.replace(/{label}/, label)}`);
  if (result && result.status === 200) {
    return result.data
  }
}

export async function getProductTypes(params) {
  const result = await get(API.getProductTypes, params);
  if (result && result.status === 200) {
    return result.data
  }
}
