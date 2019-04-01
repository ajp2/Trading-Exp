import { searchShares } from "../util/shares_api_util";

export const RECEIVE_SEARCH_RESULTS = "RECEIVE_SEARCH_RESULTS";
export const CLEAR_SEARCH_RESULTS = "CLEAR_SEARCH_RESULTS";

export const receiveSearchResults = results => ({
  type: RECEIVE_SEARCH_RESULTS,
  results
});

export const clearSearchResults = () => ({
  type: CLEAR_SEARCH_RESULTS
});

export const search = query => dispatch => {
  searchShares(query).then(res =>
    dispatch(receiveSearchResults(res.data.bestMatches))
  );
};
