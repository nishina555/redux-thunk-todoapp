import { ActionTypes } from "./actionTypes";
import { TodoItem, RootState, VisibilityFilterTypes } from "./types";
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

type ToggleTodoAction = {
  type: ActionTypes.TOGGLE_TODO;
  payload: {
    id: number;
  };
};

export const toggleTodo = (id: number): ToggleTodoAction => ({
  type: ActionTypes.TOGGLE_TODO,
  payload: { id },
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

type SetFilterAction = {
  type: ActionTypes.SET_FILTER;
  payload: {
    filter: VisibilityFilterTypes;
  };
};

export const setFilter = (filter: VisibilityFilterTypes): SetFilterAction => ({
  type: ActionTypes.SET_FILTER,
  payload: { filter },
});

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

export const patchTodo = (todo: TodoItem) => async (
  dispatch: Dispatch<TodoActions>
) => {
  await TodosApiService.toggle(todo);
  dispatch(toggleTodo(todo.id));
};

export type TodoActions =
  | SetTodosAction
  | AddTodoAction
  | ToggleTodoAction
  | SetFilterAction;
