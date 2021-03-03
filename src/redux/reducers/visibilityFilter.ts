import { ActionTypes } from "../actionTypes";
import { VISIBILITY_FILTERS } from "../../constants";
import { VisibilityFilterTypes } from "../types";
import { TodoActions } from "../actions";

const initialState: VisibilityFilterTypes = VISIBILITY_FILTERS.ALL;

const visibilityFilter = (state = initialState, action: TodoActions) => {
  switch (action.type) {
    case ActionTypes.SET_FILTER: {
      return action.payload.filter;
    }
    default: {
      return state;
    }
  }
};

export default visibilityFilter;
