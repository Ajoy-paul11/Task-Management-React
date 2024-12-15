import React from "react";
import { Form, Input, Select, DatePicker, Switch, Button } from "antd";
import { Task, TaskFormData } from "../types/task";
import dayjs from "dayjs";

interface TaskFormProps {
  initialValues?: Task | null;
  onSubmit: (values: TaskFormData) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ initialValues, onSubmit }) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={
        initialValues
          ? {
              ...initialValues,
              dueDate: dayjs(initialValues.dueDate),
            }
          : undefined
      }
      onFinish={onSubmit}
    >
      <Form.Item
        name="title"
        label="Task Title"
        rules={[{ required: true, message: "Please input the task title!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="priority"
        label="Priority"
        rules={[{ required: true, message: "Please select the priority!" }]}
      >
        <Select>
          <Select.Option value="High">High</Select.Option>
          <Select.Option value="Medium">Medium</Select.Option>
          <Select.Option value="Low">Low</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="dueDate"
        label="Due Date"
        rules={[{ required: true, message: "Please select the due date!" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="status" label="Status" valuePropName="checked">
        <Switch checkedChildren="Completed" unCheckedChildren="Not Completed" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {initialValues ? "Update Task" : "Create Task"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
