import { connect } from "react-redux";
import NavBar from "./navbar";
import { logout } from "../../actions/session_actions";

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  state: state
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
