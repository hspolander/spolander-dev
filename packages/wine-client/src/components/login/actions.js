import axios from "axios";

import { dispatch } from "../../configureStore";

import {
  USER_LOGIN_FETCHING,
  USER_LOGIN_FULFILLED,
  USER_LOGIN_REJECTED,
  USER_AUTH_FETCHING,
  USER_AUTH_FULFILLED,
  USER_AUTH_REJECTED,
  KILL_SESSION_FULFILLED,
  KILL_SESSION_REJECTED,
} from "./constants";

const sendLoginRequest = (values) => {
  axios
    .post("/api/login", values)
    .then(() => {
      dispatch({ type: USER_LOGIN_FULFILLED, payload: true });
    })
    .catch((err) => {
      dispatch({ type: USER_LOGIN_REJECTED, payload: err });
    });
};

const sendAuthRequest = () => {
  dispatch({ type: USER_AUTH_FETCHING });
  axios
    .get("/api/keepalive")
    .then(() => {
      dispatch({ type: USER_AUTH_FULFILLED, payload: true });
    })
    .catch((err) => {
      dispatch({ type: USER_AUTH_REJECTED, payload: err });
    });
};

export const loginUser = (values) => {
  dispatch({ type: USER_LOGIN_FETCHING });
  sendLoginRequest(values);
};

export const authUser = () => {
  sendAuthRequest();
};

export const killSession = () => {
  axios
    .get("/api/killSession")
    .then((response) => {
      dispatch({ type: KILL_SESSION_FULFILLED, payload: response.data });
    })
    .catch((err) => {
      dispatch({ type: KILL_SESSION_REJECTED, payload: err });
    });
};
