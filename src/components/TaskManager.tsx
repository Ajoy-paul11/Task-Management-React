import React, { useState, useEffect } from "react";
import { Table, Button, Modal, notification } from "antd";
import { Task } from "../types/task";
import { taskService } from "../services/taskService";
import TaskForm from "./TaskForm.tsx";

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await taskService.getTasks();
      setTasks(data);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to fetch tasks",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      notification.success({ message: "Task deleted successfully" });
      fetchTasks();
    } catch (error) {
      notification.error({ message: "Failed to delete task" });
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) => (status ? "Completed" : "Not Completed"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Task) => (
        <>
          <Button
            onClick={() => {
              setEditingTask(record);
              setIsModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Button
            danger
            onClick={() => handleDelete(record.id)}
            style={{ marginLeft: 8 }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        Add New Task
      </Button>

      <Table
        columns={columns}
        dataSource={tasks}
        loading={loading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingTask ? "Edit Task" : "Add New Task"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingTask(null);
        }}
        footer={null}
      >
        <TaskForm
          initialValues={editingTask}
          onSubmit={async (values) => {
            try {
              if (editingTask) {
                await taskService.updateTask(editingTask.id, values);
                notification.success({ message: "Task updated successfully" });
              } else {
                await taskService.createTask(values);
                notification.success({ message: "Task created successfully" });
              }
              setIsModalVisible(false);
              setEditingTask(null);
              fetchTasks();
            } catch (error) {
              notification.error({
                message: "Error",
                description: "Failed to save task",
              });
            }
          }}
        />
      </Modal>
    </div>
  );
};

export default TaskManager;
