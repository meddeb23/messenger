import * as types from "../actions/types";

const initialState = {
  user: null,
  loading: false,
  login: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.AUTH_START:
      return {
        ...state,
        loading: true,
      };
    case types.AUTH_FAIL:
      return {
        ...state,
        loading: false,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        login: true,
      };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        login: true,
      };
    case types.AUTH_INFO:
      return {
        ...state,
        loading: false,
        user: action.payload,
        login: true,
      };
    default:
      return state;
  }
}
