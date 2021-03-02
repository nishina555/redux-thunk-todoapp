import React, { useEffect } from "react";
import Todo from "./Todo";
import { setTodos, TodoActions } from "../redux/actions";
import { RootState } from "../redux/types";
import { connect } from "react-redux";
import { TodoItem } from "../redux/types";
import axios from "axios";

type TodoListProps = {
  todos: Array<TodoItem>;
  setTodos: (todos: Array<TodoItem>) => TodoActions;
};

const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => {
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios
        .get(`http://localhost:4000/todos`)
        .catch((error) => {
          throw new Error(error.message);
        });
      setTodos(response.data);
    };
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
export default connect(mapStateToProps, { setTodos })(TodoList);
