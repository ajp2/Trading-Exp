import {
  RECEIVE_CURRENT_USER,
  RECEIVE_USER_SIGN_IN,
  LOGOUT_USER,
  UPDATE_TOTAL_CASH
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
    case UPDATE_TOTAL_CASH:
      let updatedUser = { ...state.user };
      updatedUser.total_cash = action.total_cash;
      return { ...state, user: updatedUser };
    case LOGOUT_USER:
      return initialState;
    default:
      return state;
  }
};

export default sessionReducer;
