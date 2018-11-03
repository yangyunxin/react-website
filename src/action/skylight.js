import API from '../utils/api';
import { get, post, put } from '../utils/request';

export const GET_SKYLIGHT_LIST = 'GET_SKYLIGHT_LIST';
export const GET_SKYLIGHT_BYID = 'GET_SKYLIGHT_BYID';

export function getSkylightList(params) {
  return async (dispatch) => {
    const result = await get(API.getSkylightList, params);
    if (result && result.status === 200) {
      dispatch({
        type: GET_SKYLIGHT_LIST,
        data: result.data
      });
    }
  }
}

export function getSkylightById(id) {
  return async (dispatch) => {
    const result = await get(`${API.getSkylightById}/${id}`);
    if (result && result.status === 200) {
      dispatch({
        type: GET_SKYLIGHT_BYID,
        data: result.data.data
      })
    }
  }
}

export async function addSkylight(params) {
  const result = await post(API.addSkylight, params);
  if (result && result.status === 200) {
    return result.data
  }
}

export async function updateSkylight(params) {
  const result = await put(API.updateSkylight, params);
  if (result && result.status === 200) {
    return result.data
  }
}
