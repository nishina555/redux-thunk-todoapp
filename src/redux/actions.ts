import { ActionTypes } from "./actionTypes";
import { TodoItem, RootState } from "./types";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import axiosInstance from "../api/index";

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
  const response = await axiosInstance.get(`todos`).catch((error) => {
    throw new Error(error.message);
  });
  dispatch(setTodos(response.data));
};

export type TodoActions = SetTodosAction;
