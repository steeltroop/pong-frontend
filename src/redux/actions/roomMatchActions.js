import * as actionType from "../actionTypes";

export const updateUserId = (socketId) => ({
  type: actionType.UPDATE_USERID,
  payload: {
    socketId
  }
});
