import axiosInstance from "./index";
import { TodoItem } from "../redux/types";

export type PostTodoItem = {
  content: string;
  completed: boolean;
};

class Todos {
  static async getAll() {
    const response = await axiosInstance.get(`todos`).catch((error) => {
      throw new Error(error.message);
    });
    return response.data;
  }
  static async post(todo: PostTodoItem) {
    await axiosInstance.post(`todos`, todo).catch((error) => {
      throw new Error(error.message);
    });
  }
  static async patch(todo: TodoItem) {
    try {
      await axiosInstance.patch(`todos/${todo.id}`, todo);
    } catch (error) {
      throw error;
    }
  }
  static async toggle(todo: TodoItem) {
    let toggledTodo = Object.assign({}, todo, { completed: !todo.completed });
    await this.patch(toggledTodo).catch((error) => {
      throw new Error(error.message);
    });
  }
}

export default Todos;
