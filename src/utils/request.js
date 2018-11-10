import axios from 'axios';
import { message } from 'antd';
import qs from 'qs';
import { store } from '../index';
import { authUserExpire } from '../action/auth';

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export async function get(url, params = {}) {
  try {
    const result = await axios({
      method: 'GET',
      headers: { 'Authorization': localStorage.getItem('Authorization') || 'Basic cGlnOnBpZw==' },
      params,
      url
    });
    return result;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        message.error('登录有效期失效，请重新登录');
        store.dispatch(authUserExpire());
      } else {
        message.error(error.response.statusText);
      }
    } else {
      message.error('Error', error);
    }
  }
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export async function post(url, data = {}) {
  try {
    const result = await axios({
      method: 'POST',
      headers: { 'Authorization': localStorage.getItem('Authorization'), 'Content-Type': 'application/json;charset=UTF-8' },
      data: data,
      url
    });
    return result;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        message.error('登录有效期失效，请重新登录');
        store.dispatch(authUserExpire());
      }
    } else {
      message.error('Error', error);
    }
  }
}

export async function requestLogin(url, data = {}) {
  try {
    const result = await axios({
      method: 'POST',
      headers: { 'Authorization': 'Basic cGlnOnBpZw==' },
      data: qs.stringify(data),
      url
    });
    if (result.data) {
      localStorage.setItem('Authorization', `${result.data.token_type} ${result.data.access_token}`);
    }
    return result;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        message.error('登录有效期失效，请重新登录');
        store.dispatch(authUserExpire());
      } else {
        message.error(error.response.data.error_description);
      }
    } else {
      message.error('Error', error);
    }
  }
}

/**
 * 封装deltet请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export async function deleted(url, data = {}) {
  try {
    const result = await axios({
      method: 'DELETE',
      headers: { 'Authorization': localStorage.getItem('Authorization'), 'Content-Type': 'application/json;charset=UTF-8' },
      data: data,
      url
    });
    return result;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        message.error('登录有效期失效，请重新登录');
        store.dispatch(authUserExpire());
      }
    } else {
      message.error('Error', error);
    }
  }
}


/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export async function put(url, data = {}) {
  try {
    const result = await axios({
      method: 'PUT',
      headers: { 'Authorization': localStorage.getItem('Authorization'), 'Content-Type': 'application/json;charset=UTF-8' },
      data: data,
      url
    });
    return result;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        message.error('登录有效期失效，请重新登录');
        store.dispatch(authUserExpire());
      }
    } else {
      message.error('Error', error);
    }
  }
}
