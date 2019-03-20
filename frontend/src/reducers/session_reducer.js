import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_SIGN_IN,
  LOGOUT_USER
} from "../actions/session_actions";

const initialState = {
  isAuthenticated: false,
  authoriseSignIn: false,
  user: {}
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !!action.currentUser,
        authoriseSignIn: false,
        user: action.currentUser
      };
    case RECEIVE_USER_SIGN_IN:
      return {
        ...state,
        authoriseSignIn: true
      };
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default sessionReducer;
