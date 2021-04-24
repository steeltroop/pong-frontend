import * as actionType from "../actionTypes";

const initialState = {
  isMatched: false,
  partner: {
    socketId: "",
    name: ""
  },
  chats: [],
  webcam: {
    isCalling: false,
    isCallAccepted: false,
    callerSignal: null
  },
  gameBoard: {
    isModerator: false,
  }
};

const roomMatch = (state = initialState, action) => {
  switch (action.type) {
    case actionType.UPDATE_PARTNERID:
      return {
        ...state,
        partner: {
          ...state.partner,
          socketId: action.payload.socketId
        }
      };
    case actionType.UPDATE_ROOMMATCH:
      return {
        ...state,
        ...action.payload.data
      };
    case actionType.UPDATE_TEXTSENDING:
      const newChats = state.chats.slice();
      newChats.push(action.payload.data);

      return {
        ...state,
        chats: newChats
      };
    case actionType.UPDATE_SIGNAL:
      return {
        ...state,
        webcam: {
          ...state.webcam,
          callerSignal: action.payload.data,
          isCalling: false,
          isCallAccepted: true
        }
      };
    case actionType.RESET_STATE:
      return Object.assign({}, initialState);
    default:
      return Object.assign({}, state);
  }
};

export default roomMatch;
