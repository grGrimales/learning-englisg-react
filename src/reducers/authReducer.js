import { types } from "../type/types";

const initialState = {
  checking: true,
  logged: false,
  // uid: null,
  // name: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.authLogin:
      return {
        ...state,
        ...action.payload,
        checking: false,
        logged: true,
      };

    case types.authChekingFinish:
      return {
        ...state,
        checking: false,
        logged: false,
      };

    case types.authLogout:
      return {
        checking: false,
        logged: false,
      };

    default:
      return state;
  }
};
