import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { exportToCsv } from "./utils/csvUtils";

function App() {
  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now(), history: [] }]);
  };

  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id === updatedTask.id
          ? { ...updatedTask, history: [...task.history, ...updatedTask.history] }
          : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleExport = () => {
    exportToCsv(tasks, "tasks.csv");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
       <h1 className="text-4xl font-extrabold mb-8 text-center text-green-600">
       Task Management System
          </h1>
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1">
          <h1 className="text-2xl font-bold mb-4">Task List</h1>
          <TaskList tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />
          <button
            onClick={handleExport}
            className="w-full bg-green-500 text-white p-2 rounded-md mt-4"
          >
            Export to CSV
          </button>
        </div>
        <div className="col-span-1">
          <h1 className="text-2xl font-bold mb-4">Add Task</h1>
          <TaskForm addTask={addTask} />
        </div>
      </div>
    </div>
  );
}

export default App;