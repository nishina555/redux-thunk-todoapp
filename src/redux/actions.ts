import { ActionTypes } from "./actionTypes";
import { TodoItem, RootState } from "./types";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import TodosApiService, { PostTodoItem } from "../api/todos";

type SetTodosAction = {
  type: ActionTypes.SET_TODOS;
  payload: { todos: TodoItem[] };
};

export const setTodos = (todos: TodoItem[]): SetTodosAction => ({
  type: ActionTypes.SET_TODOS,
  payload: { todos },
});

type AddTodoAction = {
  type: ActionTypes.ADD_TODO;
  payload: {
    id: number;
    content: string;
  };
};

export const addTodo = (content: string, id: number): AddTodoAction => ({
  type: ActionTypes.ADD_TODO,
  payload: {
    id: id + 1,
    content,
  },
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

export const postTodo = (
  input: string
): ThunkAction<void, RootState, unknown, TodoActions> => async (
  dispatch: Dispatch<TodoActions>,
  getState
) => {
  const { todos } = getState();
  const todo: PostTodoItem = {
    content: input,
    completed: false,
  };
  await TodosApiService.post(todo);
  dispatch(addTodo(todo.content, todos.todoItems.length));
};

export type TodoActions = SetTodosAction | AddTodoAction;
