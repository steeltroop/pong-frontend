import * as actionType from "../actionTypes";

export const setUser = ({ email, name }) => ({
  type: actionType.SET_USER,
  payload: {
    email,
    name
  }
});
