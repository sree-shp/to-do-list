// Import necessary modules and hooks
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

// Create a context for task management
const TaskContext = createContext();

function TaskProvider({ children }) {
  // State to manage the list of tasks
  const [tasks, setTasks] = useState([]);

  // State toggles to trigger re-fetching of tasks
  const [statustoggle, setStatusToggle] = useState(false);
  const [createTaskToggle, setCreateTaskToggle] = useState(false);

  // State to manage the currently dragged task for drag-and-drop functionality
  const [draggedTask, setDraggedTask] = useState({});

  // State for loading status and error handling
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // useEffect hook to fetch tasks from the API whenever statustoggle or createTaskToggle changes
  useEffect(() => {
    async function fetchTasks() {
      try {
        // Make an API call to fetch tasks
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_BASEURL}/api/v1/task`
        );
        // Update the tasks state with the fetched data
        setTasks(res.data.data.tasks);
      } catch (err) {
        // Log the error message in case of a failure
        console.log(err.message);
      }
    }
    fetchTasks();
  }, [statustoggle, createTaskToggle]); // Dependencies for useEffect

  return (
    // Provide the task context to child components
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        setStatusToggle,
        setCreateTaskToggle,
        draggedTask,
        setDraggedTask,
        isLoading,
        setIsLoading,
        error,
        setError,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

// Custom hook to use the TaskContext
function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined)
    throw new Error("Tasks Context was used outside of its scope");

  return context;
}

// Export TaskProvider and useTasks for use in other components
export { TaskProvider, useTasks };
