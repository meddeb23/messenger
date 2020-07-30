import * as types from "../actions/types";

const initialState = {
  status: null,
  message: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.GET_ERROR:
      return {
        ...state,
        message: action.message,
        status: action.status,
      };

    default:
      return state;
  }
}
