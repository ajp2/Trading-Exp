import * as APIutil from "../util/session_api_util";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const LOGOUT_USER = "LOGOUT_USER";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveUserSignIn = () => ({
  type: RECEIVE_USER_SIGN_IN
});

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
});

export const logoutUser = () => ({
  type: LOGOUT_USER
});

export const signup = user => dispatch =>
  APIutil.signup(user)
    .then(() => dispatch(receiveUserSignIn()))
    .catch(err => console.log(err.response.data));
