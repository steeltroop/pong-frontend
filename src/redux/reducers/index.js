import { combineReducers } from "redux";
import user from "./user";
import roomMatch from "./roomMatch";
import modal from "./modal";

export default combineReducers({
  roomMatch,
  user,
  modal
});
