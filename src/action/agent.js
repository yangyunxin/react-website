import API from '../utils/api';
import { get, post, put } from '../utils/request';
import { authUserExpire } from './auth';

export const GET_AGENT_LIST = 'GET_AGENT_LIST';
export const GET_AGENT_BYID = 'GET_AGENT_BYID';

export function getAgentList(params) {
  return async (dispatch) => {
    const result = await get(API.agentList, params);
    if (result && result.status === 200) {
      dispatch({
        type: GET_AGENT_LIST,
        data: result.data
      })
    } else if (result && result.status === 401) {
      dispatch(authUserExpire);
    }
  }
}


export function getAgentById(id) {
  return async (dispatch) => {
    const result = await get(`${API.getAgentById}/${id}`);
    if (result && result.status === 200) {
      dispatch({
        type: GET_AGENT_BYID,
        data: result.data.data
      })
    } else if (result && result.status === 401) {
      dispatch(authUserExpire);
    }
  }
}

export async function addAgent(params) {
  const result = await post(API.addAgent, params);
  if (result && result.status === 200) {
    return result.data;
  }
}

export async function putAgent(params) {
  const result = await put(API.putAgent, params);
  if (result && result.status === 200) {
    return result.data;
  }
}
