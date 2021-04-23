import socketIOClient from "socket.io-client";
import * as roomMatchActions from "../redux/actions/roomMatchActions";
import * as userActions from "../redux/actions/userActions";
import * as modalActions from "../redux/actions/modalActions";

const SERVER_URL = "http://192.168.0.106:8000";

export const socket = socketIOClient(SERVER_URL);

export const subscribeSocket = (dispatch) => {
  socket.on("connectSuccess", (socketId) => {
    dispatch(userActions.updateUserId(socketId));
  });

  socket.on("completeMatch", (data) => {
    dispatch(roomMatchActions.updateRoomMatch(data));
  });

  socket.on("sendTextMessage", (data) => {
    dispatch(roomMatchActions.updateTextSending(data));
  });

  socket.on("partnerDisconnect", () => {
    socket.emit("partnerDisconnect");
    socket.removeAllListeners("sendTextMessage");
    dispatch(modalActions.updatePartnerDisconnect());
    dispatch(userActions.resetState());
  });

  socket.on("callUser", (data) => {
    dispatch(roomMatchActions.updateSignal(data));
  });
};
