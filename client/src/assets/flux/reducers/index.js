import { combineReducers } from "redux";
import userReducer from "./userReducer";
import chatReducer from "./chatReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  user: userReducer,
  error: errorReducer,
  chat: chatReducer,
});
