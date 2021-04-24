import * as actionType from "../actionTypes";

const initialState = {
  email: "",
  name: "",
  socketId: ""
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        email: action.payload.email,
        name: action.payload.name
      };
    case actionType.UPDATE_USERID:
      return {
        ...state,
        socketId: action.payload.socketId
      };
    case actionType.LOGOUT_USER:
      return {
        ...state,
        email: "",
        name: "",
        socketId: ""
      };
    default:
      return Object.assign({}, state);
  }
};

export default user;
