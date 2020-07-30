import { combineReducers } from "redux";
import musicReducer from "./musicReducer";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  music: musicReducer,
  user: userReducer,
  error: errorReducer,
});
