import { ActionTypes } from "./actionTypes";
import { TodoItem, RootState } from "./types";
import { Dispatch } from "redux";
import axios from "axios";
import { ThunkAction } from "redux-thunk";

type SetTodosAction = {
  type: ActionTypes.SET_TODOS;
  payload: { todos: TodoItem[] };
};

export const setTodos = (todos: TodoItem[]): SetTodosAction => ({
  type: ActionTypes.SET_TODOS,
  payload: { todos },
});

export const fetchTodos = (): ThunkAction<
  void,
  RootState,
  unknown,
  TodoActions
> => async (dispatch: Dispatch<TodoActions>) => {
  const response = await axios
    .get(`http://localhost:4000/todos`)
    .catch((error) => {
      throw new Error(error.message);
    });
  dispatch(setTodos(response.data));
};

export type TodoActions = SetTodosAction;
