export interface Task {
  id: string;
  title: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  status: boolean;
}

export interface TaskFormData {
  title: string;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  status: boolean;
}
