import * as APIutil from "../util/session_api_util";
import jwt_decode from "jwt-decode";

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const CLEAR_SESSION_ERRROS = "CLEAR_SESSION_ERRORS";
export const UPDATE_TOTAL_CASH = "UPDATE_TOTAL_CASH";

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

export const clearErrors = () => ({
  type: CLEAR_SESSION_ERRROS
});

export const logoutUser = () => ({
  type: LOGOUT_USER
});

export const updateTotalCash = total_cash => ({
  type: UPDATE_TOTAL_CASH,
  total_cash
});

export const signup = user => dispatch =>
  APIutil.signup(user)
    .then(() => dispatch(receiveUserSignIn()))
    .catch(err => dispatch(receiveErrors(err.response.data)));

export const login = user => dispatch =>
  APIutil.login(user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      APIutil.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(receiveCurrentUser(decoded));
    })
    .catch(err => dispatch(receiveErrors(err.response.data)));

export const logout = () => dispatch => {
  localStorage.removeItem("jwtToken");
  APIutil.setAuthToken(false);
  dispatch(logoutUser());
};
