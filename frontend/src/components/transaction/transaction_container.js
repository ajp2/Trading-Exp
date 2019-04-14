import { connect } from "react-redux";
import Transaction from "./transaction";
import { updateTotalCash } from "../../actions/session_actions";

const mapStateToProps = state => ({
  total_cash: state.session.user.total_cash,
  user_id: state.session.user.id
});

const mapDispatchToProps = dispatch => ({
  updateTotalCash: total_cash => dispatch(updateTotalCash(total_cash))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transaction);
