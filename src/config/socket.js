import socketIOClient from 'socket.io-client';
import * as roomMatchActions from "../redux/actions/roomMatchActions";

const SERVER_URL = process.env.REACT_APP_PORT;

export const socket = socketIOClient(SERVER_URL);

export const subscribeSocket = (dispatch) => {
  socket.on("connectSuccess", (socketId) => {
    dispatch(roomMatchActions.updateUserId(socketId));
  });

  socket.on("completeMatch", (data) => {
    dispatch(roomMatchActions.updateRoomMatch(data));
  });
};
