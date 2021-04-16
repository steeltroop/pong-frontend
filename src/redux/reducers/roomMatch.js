import * as actionTypes from "../actionTypes";

const initialState = {
  partner: {
    socketId: "",
    name: ""
  },
  isMatched: false,
  chats: []
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
        ...action.payload
      };
    default: {
      return Object.assign({}, state);
    }
  }
};

export default roomMatch;
