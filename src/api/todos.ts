import axiosInstance from "./index";

class Todos {
  static async getAll() {
    const response = await axiosInstance.get(`todos`).catch((error) => {
      throw new Error(error.message);
    });
    return response.data;
  }
}

export default Todos;
