import React from "react";
import cx from "classnames";
import { TodoItem } from "../redux/types";
import { connect } from "react-redux";
import { patchTodo } from "../redux/actions";

type TodoProps = {
  todo: TodoItem;
  patchTodo: (todo: TodoItem) => void;
};

const Todo: React.FC<TodoProps> = ({ todo, patchTodo }) => {
  const handleToggleTodo = (todo: TodoItem) => {
    patchTodo(todo);
  };
  return (
    <li className="todo-item" onClick={() => handleToggleTodo(todo)}>
      {todo && todo.completed ? "👌" : "👋"}{" "}
      <span
        className={cx(
          "todo-item__text",
          todo && todo.completed && "todo-item__text--completed"
        )}
      >
        {todo.content}
      </span>
    </li>
  );
};

export default connect(null, { patchTodo })(Todo);
