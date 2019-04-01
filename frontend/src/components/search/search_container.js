import { connect } from "react-redux";
import Search from "./search";
import { clearSearchResults } from "../../actions/search_actions";

const mapStateToProps = state => ({
  searchResults: state.entities.searchResults
});

const mapDispatchToProps = dispatch => ({
  clearSearchResults: () => dispatch(clearSearchResults())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
