import { requestLogin } from '../utils/request';
import API from '../utils/api';

export const AUTH_USER_LOGIN = 'AUTH_USER_LOGIN';
export const AUTH_USER_EXPIRE = 'AUTH_USER_EXPIRE';
export const AUTH_USER_LOGOUT = 'AUTH_USER_LOGOUT';

// 登录获取auth
export function authUserLogin(params) {
  return async (dispatch) => {
    const result = await requestLogin(API.authLogin, params);
    if (result) {
      dispatch({ type: AUTH_USER_LOGIN });
    } else {
      dispatch(authUserExpire);
    }
    return result;
  }
}

// 获取当前登录状态
export function authCheck() {
  return async (dispatch) => {
    const Authorization = localStorage.getItem('Authorization');
    if (Authorization) {
      dispatch({ type: AUTH_USER_LOGIN });
    } else {
      dispatch(authUserExpire);
    }
  }
}

// auth过期处理
export function authUserExpire() {
  return { type: AUTH_USER_EXPIRE }
}

// 登出清除auth
export function authUserLogout(params) {
  return (dispatch) => {
    localStorage.setItem('Authorization', '');
    dispatch(authUserExpire);
    return true;
  }
}
