import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [statustoggle, setStatusToggle] = useState(false);
  const [createTaskToggle, setCreateTaskToggle] = useState(false);

  const [draggedTask, setDraggedTask] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_BASEURL}/api/v1/task`
        );
        setTasks(res.data.data.tasks);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchTasks();
  }, [statustoggle, createTaskToggle]);
  return (
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

function useTasks() {
  const context = useContext(TaskContext);
  if (context === undefined)
    throw new Error("Tasks Context was used outside of its scope");

  return context;
}

export { TaskProvider, useTasks };
