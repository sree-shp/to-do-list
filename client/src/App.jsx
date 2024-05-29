// Import necessary components and styles
import TaskPane from "./components/TaskPane";
import "./App.css";
import { TaskProvider } from "./contexts/TaskContext";
import TaskForm from "./components/TaskForm";
import { useState } from "react";

function App() {
  // State to handle the visibility of the task creation form
  const [taskForm, setTaskForm] = useState(false);

  // Function to toggle the task creation form visibility
  function handleCreateTaskForm() {
    setTaskForm((state) => !state);
  }

  return (
    // Wrap the application in the TaskProvider context to manage tasks globally
    <TaskProvider>
      <main className="px-[6rem] py-[3rem]">
        <div className="flex justify-between">
          <h1 className="text-3xl font-medium">To Do List</h1>
          {/* Button to toggle the task creation form */}
          <button
            className="bg-indigo-600 text-white px-4 py-1 rounded-lg"
            onClick={handleCreateTaskForm}
          >
            + Add Task
          </button>
        </div>

        {/* Conditionally render the TaskForm component based on taskForm state */}
        {taskForm && <TaskForm handleCreateTaskForm={handleCreateTaskForm} />}

        {/* Render TaskPane components for each task status */}
        <div className="flex justify-between gap-5 py-[2rem]">
          <TaskPane taskStatus={"Pending"} />
          <TaskPane taskStatus={"In-Progress"} />
          <TaskPane taskStatus={"Completed"} />
        </div>
      </main>
    </TaskProvider>
  );
}

// Export the App component as the default export
export default App;
