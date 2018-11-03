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
