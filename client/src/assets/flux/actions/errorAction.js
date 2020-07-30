import * as types from "./types";

export const getError = (message, status) => (dispatch) => {
  dispatch({
    type: types.GET_ERROR,
    message,
    status,
  });
};

export const clearError = () => (dispatch) => {
  dispatch({
    type: types.GET_ERROR,
    message: null,
    status: null,
  });
};
