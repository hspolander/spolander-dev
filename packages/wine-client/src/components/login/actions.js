import axios from 'axios';
import Cookies from 'js-cookie';

import { dispatch } from '../../store';

import {
  USER_LOGIN_FETCHING,
  USER_LOGIN_FULFILLED,
  USER_LOGIN_REJECTED,
  USER_AUTH_FETCHING,
  USER_AUTH_FULFILLED,
  USER_AUTH_REJECTED,
  SET_USER_UNAUTHORIZED,
  KILL_SESSION_FULFILLED,
  KILL_SESSION_REJECTED,
} from './constants';

const sendLoginRequest = values => {
  axios
    .post('/api/login', values)
    .then(response => {
      Cookies.set('username', response.data.data.login.username);
      Cookies.set('WINE_UUID', response.data.data.UUID);
      dispatch({ type: USER_LOGIN_FULFILLED, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: USER_LOGIN_REJECTED, payload: err });
    });
};

const sendAuthRequest = () => {
  dispatch({ type: USER_AUTH_FETCHING });
  axios
    .get('/api/keepalive')
    .then(response => {
      dispatch({ type: USER_AUTH_FULFILLED, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: USER_AUTH_REJECTED, payload: err });
    });
};

export const loginUser = values => {
  dispatch({ type: USER_LOGIN_FETCHING });
  sendLoginRequest(values);
};

export const authUser = () => {
  sendAuthRequest();
};

export const killSession = () => {
  axios
    .get('/api/killSession')
    .then(response => {
      dispatch({ type: KILL_SESSION_FULFILLED, payload: response.data });
    })
    .catch(err => {
      dispatch({ type: KILL_SESSION_REJECTED, payload: err });
    });
};

export const setUserUnauthorized = () => {
  dispatch({ type: SET_USER_UNAUTHORIZED });
};
