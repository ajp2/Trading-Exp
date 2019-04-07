import { searchShares } from "../util/shares_api_util";

export const RECEIVE_SEARCH_RESULTS = "RECEIVE_SEARCH_RESULTS";
export const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS";
export const RECEIVE_SEARCHED_COMPANY = "RECEIVE_SEARCHED_COMPANY";
export const CLEAR_SEARCHED_COMPANY = "CLEAR_SEARCHED_COMPANY";

export const receiveSearchResults = results => ({
  type: RECEIVE_SEARCH_RESULTS,
  results
});

export const clearSearchResults = () => ({
  type: CLEAR_SEARCH_RESULTS
});

export const receiveSearchedCompany = company => ({
  type: RECEIVE_SEARCHED_COMPANY,
  company
});

export const clearSearchedCompany = () => ({
  type: CLEAR_SEARCHED_COMPANY
});

export const search = query => dispatch => {
  searchShares(query).then(res =>
    dispatch(receiveSearchResults(res.data.bestMatches))
  );
};
