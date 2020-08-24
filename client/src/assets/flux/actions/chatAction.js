import * as types from "./types";
import axios from "axios";

import { getError } from "./errorAction";

const chatURL = "/api/v1/chat";

export const getChatHistory = (offset, limit) => (dispatch) => {
  dispatch({ type: types.LOADING });

  axios
    .get(`${chatURL}/find_all?offset=${offset}&limit=${limit}`)
    .then((res) => {
      if (res.data.chat.length === 0) res.data.chat = null;
      dispatch({
        type: types.GET_CHAT_HISTORY,
        payload: res.data.chat,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ACTION_FAIL,
      });
      dispatch(getError(err.response.data.message, err.response.status));
    });
};

export const getCurrentChat = (id) => (dispatch) => {
  dispatch({ type: types.LOADING });
  axios
    .get(`${chatURL}/${id}`)
    .then((res) => {
      dispatch({
        type: types.GET_CURRENT_CHAT,
        payload: res.data.chat,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ACTION_FAIL,
      });
      dispatch(getError(err.response.data.message, err.response.status));
    });
};

export const createChat = (receiver) => (dispatch) => {
  dispatch({ type: types.LOADING });
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request body
  const body = JSON.stringify({ receiver });
  axios
    .post(`${chatURL}/create_chat`, body, config)
    .then((res) => {
      dispatch({
        type: types.GET_CURRENT_CHAT,
        payload: res.data.chat,
      });
    })
    .catch((err) => {
      dispatch({
        type: types.ACTION_FAIL,
      });
      dispatch(getError(err.response.data.message, err.response.status));
    });
};
