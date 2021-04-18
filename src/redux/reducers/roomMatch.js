import * as actionTypes from "../actionTypes";

const initialState = {
  partner: {
    socketId: "",
    name: ""
  },
  isMatched: false,
  chats: [],
  webcam: {
    isCalling: false,
    isCallAccepted: false,
    callerSignal: null
  }
};

const roomMatch = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_PARTNERID:
      return {
        ...state,
        partner: {
          ...state.partner,
          socketId: action.payload.socketId
        }
      };
    case actionTypes.UPDATE_ROOMMATCH:
      return {
        ...state,
        ...action.payload.data
      };
    case actionTypes.UPDATE_TEXTSENDING:
      const newChats = state.chats.slice();
      newChats.push(action.payload.data);

      return {
        ...state,
        chats: newChats
      };
    case actionTypes.UPDATE_SIGNAL:
      return {
        ...state,
        webcam: {
          ...state.webcam,
          callerSignal: action.payload.data,
          isCalling: false,
          isCallAccepted: true
        }
      };
    case actionTypes.RESET_STATE:
      return Object.assign({}, initialState);
    default:
      return Object.assign({}, state);
  }
};

export default roomMatch;
