import axios from 'axios';
import qs from 'qs';

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
      headers: { 'Authorization': sessionStorage.getItem('Authorization') || 'Basic cGlnOnBpZw==' },
      params,
      url
    });
    return result;
  } catch (error) {
    return;
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
      headers: { 'Authorization': sessionStorage.getItem('Authorization') },
      data: qs.stringify(data),
      url
    });
    if (result.data) {
      sessionStorage.setItem('Authorization', `${result.data.token_type} ${result.data.access_token}`);
    } else if (result.code === 401) {
      sessionStorage.setItem('Authorization', '');
    }
    return result;
  } catch (error) {
    return undefined;
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
      sessionStorage.setItem('Authorization', `${result.data.token_type} ${result.data.access_token}`);
    }
    return result;
  } catch (error) {
    return undefined;
  }
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      },
    );
  });
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(
      response => {
        resolve(response.data);
      },
      err => {
        reject(err);
      },
    );
  });
}
