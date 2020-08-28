import * as types from "../actions/types";

const initialState = {
  loading: false,
  chatHistory: null,
  currentChatDetail: null,
  currentChatMsg: null,
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
        currentChatDetail: action.payload.chat,
        currentChatMsg: action.payload.messages,
      };
    case types.GET_CHAT_HISTORY:
      return {
        ...state,
        loading: false,
        chatHistory: action.payload,
      };
    case types.RECEIVE_MSG:
      return {
        ...state,
        currentChatMsg: [action.payload, ...state.currentChatMsg],
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
