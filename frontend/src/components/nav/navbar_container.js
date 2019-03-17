import { connect } from "react-redux";
import NavBar from "./navbar";

const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated
});

export default connect(mapStateToProps)(NavBar);
