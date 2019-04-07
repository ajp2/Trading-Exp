import { combineReducers } from "redux";
import searchResultsReducer from "./search_results_reducer";
import searchedCompanyReducer from "./searched_company_reducer";

const entitiesReducer = combineReducers({
  searchResults: searchResultsReducer,
  searchedCompany: searchedCompanyReducer
});

export default entitiesReducer;
