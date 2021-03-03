import { ActionTypes } from "../actionTypes";
import { TodoState } from "../types";
import { TodoActions } from "../actions";

const initialState: TodoState = {
  todoItems: [],
};

const todos = (state = initialState, action: TodoActions): TodoState => {
  switch (action.type) {
    case ActionTypes.SET_TODOS: {
      const { todos } = action.payload;
      return {
        todoItems: todos,
      };
    }
    case ActionTypes.ADD_TODO: {
      const { id, content } = action.payload;
      return {
        todoItems: [
          ...state.todoItems,
          {
            id,
            content,
            completed: false,
          },
        ],
      };
    }
    default:
      return state;
  }
};

export default todos;
