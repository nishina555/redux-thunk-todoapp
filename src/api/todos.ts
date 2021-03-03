import axiosInstance from "./index";

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
}

export default Todos;
