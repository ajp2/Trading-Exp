import {
  RECEIVE_SEARCHED_COMPANY,
  CLEAR_SEARCHED_COMPANY
} from "../actions/search_actions";

const searchedCompanyReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_SEARCHED_COMPANY:
      return action.company;
    case CLEAR_SEARCHED_COMPANY:
      return {};
    default:
      return state;
  }
};

export default searchedCompanyReducer;
