import React, { useEffect } from "react";
import Todo from "./Todo";
import { fetchTodos } from "../redux/actions";
import { RootState, VisibilityFilterTypes } from "../redux/types";
import { connect } from "react-redux";
import { TodoItem, TodoState } from "../redux/types";
import { getTodosByVisibilityFilter } from "../redux/selectors";

type TodoListProps = {
  todos: TodoState;
  visibilityFilter: VisibilityFilterTypes;
  fetchTodos: () => void;
};

const TodoList: React.FC<TodoListProps> = ({
  todos,
  fetchTodos,
  visibilityFilter,
}) => {
  useEffect(() => {
    fetchTodos();
  }, []);

  const visibleTodos: TodoItem[] = getTodosByVisibilityFilter(
    todos,
    visibilityFilter
  );

  return (
    <ul className="todo-list">
      {visibleTodos && visibleTodos.length
        ? visibleTodos.map((todo: TodoItem, index: number) => {
            return <Todo key={`todo-${todo.id}`} todo={todo} />;
          })
        : "No todos, yay!"}
    </ul>
  );
};

const mapStateToProps = (state: RootState) => {
  const todos = state.todos;
  const visibilityFilter = state.visibilityFilter;
  return { todos, visibilityFilter };
};
export default connect(mapStateToProps, { fetchTodos })(TodoList);
