import * as actionType from "../actionTypes";

export const updateUserId = (socketId) => ({
  type: actionType.UPDATE_USERID,
  payload: {
    socketId
  }
});

export const updateRoomMatch = (data) => ({
  type: actionType.UPDATE_ROOMMATCH,
  payload: {
    data
  }
});
