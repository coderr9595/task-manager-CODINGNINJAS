import React, { useState } from "react";

function TaskItem({ task, updateTask, deleteTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    updateTask({
      ...task,
      status: newStatus,
      history: [...task.history, `Status changed to ${newStatus} on ${new Date().toLocaleString()}`],
    });
  };

  const handleEdit = () => {
    updateTask({
      ...editedTask,
      history: [...task.history, `Task edited on ${new Date().toLocaleString()}`],
    });
    setIsEditing(false);
  };

  return (
    <div className="mb-4 p-4 border border-gray-300 rounded-md">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            className="w-full mb-2 p-2 border border-gray-300 rounded-md"
          />
          <textarea
            value={editedTask.description}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            className="w-full mb-2 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="date"
            value={editedTask.dueDate}
            onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
            className="w-full mb-2 p-2 border border-gray-300 rounded-md"
          />
          <select
            value={editedTask.priority}
            onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
            className="w-full mb-2 p-2 border border-gray-300 rounded-md"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button onClick={handleEdit} className="w-full bg-green-500 text-white p-2 rounded-md mb-2">
            Save
          </button>
        </>
      ) : (
        <>
          <h3 className="text-xl font-bold">{task.title}</h3>
          <p className="text-gray-700">{task.description}</p>
          <p className="text-gray-500">Due: {task.dueDate}</p>
          <p className="text-gray-500">Priority: {task.priority}</p>
          <p className="text-gray-500">Status: {task.status}</p>
          <select
            value={task.status}
            onChange={handleStatusChange}
            className="mt-2 w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="to-do">To-do</option>
            <option value="in-progress">In-progress</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={() => setIsEditing(true)}
            className="w-full bg-yellow-500 text-white p-2 rounded-md mt-2"
          >
            Edit
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="w-full bg-red-500 text-white p-2 rounded-md mt-2"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}

export default TaskItem;
