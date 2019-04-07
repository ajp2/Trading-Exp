import { connect } from "react-redux";
import Search from "./search";
import {
  search,
  clearSearchResults,
  receiveSearchedCompany
} from "../../actions/search_actions";

const mapStateToProps = state => ({
  searchResults: state.entities.searchResults
});

const mapDispatchToProps = dispatch => ({
  clearSearchResults: () => dispatch(clearSearchResults()),
  search: query => dispatch(search(query)),
  addCompany: company => dispatch(receiveSearchedCompany(company))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
