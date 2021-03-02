import { ActionTypes } from "./actionTypes";
import { TodoItem, RootState } from "./types";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import TodosApiService from "../api/todos";

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
  const todos = await TodosApiService.getAll();
  dispatch(setTodos(todos));
};

export type TodoActions = SetTodosAction;
