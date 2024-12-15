import axios from "axios";
import { Task, TaskFormData } from "../types/task";

const API_BASE_URL = "https://jsonplaceholder.typicode.com/todos";

export const taskService = {
  getTasks: async (): Promise<Task[]> => {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  },

  createTask: async (task: TaskFormData): Promise<Task> => {
    const response = await axios.post(`${API_BASE_URL}`, task);
    return response.data;
  },

  updateTask: async (id: string, task: TaskFormData): Promise<Task> => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, task);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/${id}`);
  },
};
