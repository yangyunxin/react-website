import API from '../utils/api';
import { get } from '../utils/request';

export const GET_SYSTEM_LOG_LIST = 'GET_SYSTEM_LOG_LIST';

export function getSystemLogList(params) {
  return async (dispatch) => {
    const result = await get(API.getSystemLogList, params);
    if (result && result.status === 200) {
      dispatch({
        type: GET_SYSTEM_LOG_LIST,
        data: result.data
      });
    }
  }
}
