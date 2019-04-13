import { connect } from "react-redux";
import Transaction from "./transaction";

const mapStateToProps = state => ({
  total_cash: state.session.user.total_cash,
  user_id: state.session.user.id
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Transaction);
