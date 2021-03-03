import { VISIBILITY_FILTERS } from "../constants";

export type TodoItem = {
  id: number;
  content: string;
  completed: boolean;
};

export type TodoState = {
  todoItems: Array<TodoItem>;
};

export type RootState = {
  todos: TodoState;
  visibilityFilter: VisibilityFilterTypes;
};

export type VisibilityFilterTypes = typeof VISIBILITY_FILTERS[keyof typeof VISIBILITY_FILTERS];
