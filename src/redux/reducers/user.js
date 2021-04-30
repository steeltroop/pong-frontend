import { createAction, createReducer } from "@reduxjs/toolkit";

const SET_USER = "SET_USER";
const UPDATE_USERID = "UPDATE_USERID";
const LOGOUT_USER = "LOGOUT_USER";

export const setUser = createAction(SET_USER);
export const updateUserId = createAction(UPDATE_USERID);
export const logoutUser = createAction(LOGOUT_USER);

const initialState = {
  email: "",
  name: "",
  socketId: "",
};

export default createReducer(initialState, {
  [SET_USER]: (state, { payload }) => {
    return {
      ...state,
      email: payload.email,
      name: payload.name,
    };
  },
  [UPDATE_USERID]: (state, { payload }) => {
    return {
      ...state,
      socketId: payload,
    };
  },
  [LOGOUT_USER]: () => {
    return Object.assign({}, initialState);
  },
});
