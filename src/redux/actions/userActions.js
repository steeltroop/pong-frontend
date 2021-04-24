import * as actionType from "../actionTypes";

export const setUser = ({ email, name }) => ({
  type: actionType.SET_USER,
  payload: {
    email,
    name
  }
});

export const updateUserId = (socketId) => ({
  type: actionType.UPDATE_USERID,
  payload: {
    socketId
  }
});

export const resetState = () => ({
  type: actionType.RESET_STATE
});

export const logoutUser = () => ({
  type: actionType.LOGOUT_USER
});
