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

export const deleteUser = () => ({
  type: actionType.DELETE_USER
});
