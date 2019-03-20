import { connect } from "react-redux";
import SignupForm from "./signup_form";
import { signup, login, clearErrors } from "../../actions/session_actions";

const mapStateToProps = state => ({
  authoriseSignIn: state.session.authoriseSignIn,
  errors: state.errors.session
});

const mapDispatchToProps = dispatch => ({
  signup: user => dispatch(signup(user)),
  login: user => dispatch(login(user)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupForm);
