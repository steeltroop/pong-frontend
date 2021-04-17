import * as actionType from "../actionTypes";

export const updateRoomMatch = (data) => ({
  type: actionType.UPDATE_ROOMMATCH,
  payload: {
    data
  }
});

export const updateTextSending = (data) => ({
  type: actionType.UPDATE_TEXTSENDING,
  payload: {
    data
  }
});
