import { connect } from "react-redux";
import Portfolio from "./portfolio";

const mapStateToProps = state => ({
  user_id: state.session.user.id,
  total_cash: state.session.user.total_cash
});

export default connect(mapStateToProps)(Portfolio);
