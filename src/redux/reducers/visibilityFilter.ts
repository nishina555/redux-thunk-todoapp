import { ActionTypes } from "../actionTypes";
import { VISIBILITY_FILTERS } from "../../constants";
import { VisibilityFilterTypes } from "../types";
import { TodoActions } from "../actions";

const initialState: VisibilityFilterTypes = VISIBILITY_FILTERS.ALL;

const visibilityFilter = (state = initialState, action: TodoActions) => {
  return state;
};

export default visibilityFilter;
