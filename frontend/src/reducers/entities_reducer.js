import { combineReducers } from "redux";
import searchResultsReducer from "./search_results_reducer";

const entitiesReducer = combineReducers({
  searchResults: searchResultsReducer
});

export default entitiesReducer;
