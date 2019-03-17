import { connect } from "react-redux";
import LoginForm from "./login_form";

const mapDispatchToProps = dispatch => ({
  // login: user => dispatch(login(user))
});

export default connect(
  null,
  mapDispatchToProps
)(LoginForm);
