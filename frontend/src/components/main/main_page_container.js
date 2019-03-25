import { connect } from "react-redux";
import { login } from "../../actions/session_actions";
import MainPage from "./main_page";

const mapDispatchToProps = dispatch => ({
  login: user => dispatch(login(user))
});

export default connect(
  null,
  mapDispatchToProps
)(MainPage);
