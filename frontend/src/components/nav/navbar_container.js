import { connect } from "react-redux";
import NavBar from "./navbar";
import { logout } from "../../actions/session_actions";
import { search } from "../../actions/search_actions";

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  search: query => dispatch(search(query))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);
