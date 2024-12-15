// src/App.tsx
import React from "react";
import TaskManager from "./components/TaskManager.tsx";

const App: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "24px 0" }}>
        Task Management App
      </h1>
      <TaskManager />
    </div>
  );
};

export default App;
