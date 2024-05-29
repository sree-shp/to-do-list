import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const TaskContext = createContext();

function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [statustoggle, setStatusToggle] = useState(false);
  const [createTaskToggle, setCreateTaskToggle] = useState(false);

  const [draggedTask, setDraggedTask] = useState({});

  useEffect(() => {
    async function fetchTasks() {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/task`);
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
