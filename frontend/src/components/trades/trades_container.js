import { connect } from "react-redux";
import Trades from "./trades";

const mapStateToProps = state => ({
  user_id: state.session.user.id
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Trades);
