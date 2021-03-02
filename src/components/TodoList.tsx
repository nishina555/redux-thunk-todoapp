import React, { useEffect } from "react";
import Todo from "./Todo";
import { fetchTodos } from "../redux/actions";
import { RootState } from "../redux/types";
import { connect } from "react-redux";
import { TodoItem } from "../redux/types";

type TodoListProps = {
  todos: Array<TodoItem>;
  fetchTodos: () => void;
};

const TodoList: React.FC<TodoListProps> = ({ todos, fetchTodos }) => {
  useEffect(() => {
    fetchTodos();
  }, []);
  return (
    <ul className="todo-list">
      {todos && todos.length
        ? todos.map((todo: TodoItem, index: number) => {
            return <Todo key={`todo-${todo.id}`} todo={todo} />;
          })
        : "No todos, yay!"}
    </ul>
  );
};

const mapStateToProps = (state: RootState) => {
  const todos = state.todos.todoItems;
  return { todos };
};
export default connect(mapStateToProps, { fetchTodos })(TodoList);
