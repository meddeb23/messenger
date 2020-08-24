import * as types from "../actions/types";

const initialState = {
  loading: false,
  chatHistory: null,
  currentChat: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.GET_CURRENT_CHAT:
      return {
        ...state,
        loading: false,
        currentChat: action.payload,
      };
    case types.GET_CHAT_HISTORY:
      return {
        ...state,
        loading: false,
        chatHistory: action.payload,
      };
    case types.ACTION_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
