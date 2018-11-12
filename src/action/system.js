import API from '../utils/api';
import { get, post, put } from '../utils/request';

export const GET_SYSTEM_LOG_LIST = 'GET_SYSTEM_LOG_LIST';
export const GET_SYSTEM_DICT_LIST = 'GET_SYSTEM_DICT_LIST';

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

export function getSystemDictList(params) {
  return async (dispatch) => {
    const result = await get(API.getSystemDictList, params);
    if (result && result.status === 200) {
      dispatch({
        type: GET_SYSTEM_DICT_LIST,
        data: result.data
      });
    } else {
      dispatch({
        type: GET_SYSTEM_DICT_LIST,
        data: {}
      });
    }
  }
}

export async function postSystemDict(params) {
  const result = await post(API.postSystemDict, params);
  if (result && result.status === 200) {
    return result.data;
  }
}

export async function putSystemDict(params) {
  const result = await put(API.putSystemDict, params);
  if (result && result.status === 200) {
    return result.data;
  }
}

export async function getSystemDictById(id) {
  const result = await get(`${API.getSystemDictById.replace(/{id}/, id)}`);
  if (result && result.status === 200) {
    return result.data
  }
}

export async function getSystemDictByLabel(label) {
  const result = await get(`${API.getSystemDictByLabel.replace(/{label}/, label)}`);
  if (result && result.status === 200) {
    return result.data
  }
}

export async function getSystemDicts(params) {
  const result = await get(API.getSystemDicts, params);
  if (result && result.status === 200) {
    return result.data
  }
}
