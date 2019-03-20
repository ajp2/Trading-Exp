import {
  RECEIVE_SESSION_ERRORS,
  RECEIVE_CURRENT_USER,
  CLEAR_SESSION_ERRROS
} from "../actions/session_actions";

const sessionErrorsReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_CURRENT_USER:
    case CLEAR_SESSION_ERRROS:
      return [];
    default:
      return state;
  }
};

export default sessionErrorsReducer;
