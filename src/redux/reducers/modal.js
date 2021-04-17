import * as actionTypes from "../actionTypes";

const initialState = {
  isPartnerDisconnected: false
};

const modal = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PARTNER_DISCONNECTED:
      return {
        isPartnerDisconnected: !state.isPartnerDisconnected
      };
    default:
      return Object.assign({}, state);
  }
};

export default modal;
