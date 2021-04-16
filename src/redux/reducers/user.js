import * as actionTypes from "../actionTypes";

const initialState = {
  email: "",
  name: "",
  socketId: ""
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        email: action.payload.email,
        name: action.payload.name
      };
    default:
      return Object.assign({}, state);
  }
};

export default user;
