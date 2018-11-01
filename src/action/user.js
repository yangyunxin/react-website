import API from '../utils/api';
import { get, put } from '../utils/request';

export const USER_LOGIN = 'USER_LOGIN';
export const GET_USER_LIST = 'GET_USER_LIST';
export const GET_USER_BYID = 'GET_USER_BYID';
export const GET_USER_ADDRESS_BYID = 'GET_USER_ADDRESS_BYID';
export const GET_USER_ORDER_BYID = 'GET_USER_ORDER_BYID';

export function getUsertList(params) {
  return async (dispatch) => {
    const result = await get(API.userList, params);
    if (result && result.status === 200) {
      dispatch({
        type: GET_USER_LIST,
        data: result.data
      })
    }
  }
}

export function getUserById(id) {
  return async (dispatch) => {
    const result = await get(`${API.getUserById}/${id}`);
    if (result && result.status === 200) {
      dispatch({
        type: GET_USER_BYID,
        data: result.data.data
      })
    }
  }
}


export function getUserAddressById(id) {
  return async (dispatch) => {
    const result = await get(`${API.getUserAddressById}/${id}`);
    if (result && result.status === 200) {
      dispatch({
        type: GET_USER_ADDRESS_BYID,
        data: result.data.data
      })
    }
  }
}

export function getUserOrderById(params) {
  return async (dispath) => {
    const result = await get(API.getUserOrderById, params);
    if (result && result.status === 200) {
      dispath({
        type: GET_USER_ORDER_BYID,
        data: result.data
      })
    }
  }
}

export async function updateUser(params) {
  const result = await put(API.updateUser, params);
  if (result && result.status === 200) {
    return result.data;
  }
}
