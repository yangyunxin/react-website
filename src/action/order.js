import API from '../utils/api';
import { get, put, deleted } from '../utils/request';

export const GET_ORDER_LIST = 'GET_ORDER_LIST';
export const GET_ORDER_BYID = 'GET_ORDER_BYID';

export function getOrderList(params) {
  return async (dispatch) => {
    const result = await get(API.orderList, params);
    if (result && result.status === 200) {
      dispatch({
        type: GET_ORDER_LIST,
        data: result.data
      })
    }
  }
}


export function getOrderById(id) {
  return async (dispatch) => {
    const result = await get(`${API.getOrderById}/${id}`);
    if (result && result.status === 200) {
      dispatch({
        type: GET_ORDER_BYID,
        data: result.data.data
      })
    }
  }
}

export async function updateOrder(params) {
  const result = await put(API.updateOrder, params);
  if (result && result.status === 200) {
    return result.data;
  }
}

export async function deleteOrderById(id) {
  const result = await deleted(`${API.deleteOrderById}/${id}`);
  if (result && result.status === 200) {
    return result.data;
  }
}
