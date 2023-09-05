import { LOGIN, LOGOUT, SIGNUP } from "./actions";

// reducer function
export const reducer = (state, {type, payload}) => {
  switch(type){
    case LOGIN: 
      if(payload.token.length >= 0){
        return {
          ...state,
          loggedIn: true,
          user: {...payload.user},
          token: payload.token
        };
      }
      return state;
    case SIGNUP: 
        return {
          ...state,
          loggedIn: true,
          user: {...payload.user},
          token: payload.token
        };
    case LOGOUT: 
      return {
        ...state,
        loggedIn: false,
        user: {},
        token: ''
      };
    default:
      return state;
  }
};