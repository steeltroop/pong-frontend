import * as actionTypes from "../actionTypes";

const initialState = {
  email: "",
  name: "",
  socketId: ""
};

const User = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        email: action.payload.email,
        name: action.payload.name
      };
    default:
      return state;
  }
};

export default User;
