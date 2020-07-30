import * as types from "./types";
import axios from "axios";
import { getError } from "./errorAction";

const userURL = "/api/v1/user";

export const login = (user) => (dispatch) => {
  dispatch({ type: types.AUTH_START });
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  const body = JSON.stringify(user);
  axios
    .post(`${userURL}/login`, body, config)
    .then((res) => {
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: res.data.user,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.AUTH_FAIL,
      });
      console.log(err.response.data.message);

      dispatch(getError(err.response.data.message, err.response.status));
    });
};

export const register = (user) => (dispatch) => {
  dispatch({ type: types.AUTH_START });

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  const body = JSON.stringify(user);
  axios
    .post(`${userURL}/register`, body, config)
    .then((res) => {
      dispatch({
        type: types.LOGIN_SUCCESS,
        payload: res.data.user,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.AUTH_FAIL,
      });
      dispatch(getError(err.response.data.message, err.response.status));
    });
};

export const authInfo = () => (dispatch) => {
  dispatch({ type: types.AUTH_START });
  axios
    .get(`${userURL}`)
    .then((res) => {
      dispatch({
        type: types.AUTH_INFO,
        payload: res.data.user,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.AUTH_FAIL,
      });
      dispatch(getError(err.response.data.message, err.response.status));
    });
};

export const logout = () => (dispatch) => {
  axios
    .get(`${userURL}/logout`)
    .then((res) =>
      dispatch({
        type: types.LOGOUT_SUCCESS,
      })
    )
    .catch((err) =>
      dispatch(getError(err.response.data.message, err.response.status))
    );
};
