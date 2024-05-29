// Import necessary modules and components
import axios from "axios";
import { useTasks } from "../contexts/TaskContext";
import Task from "./Task";
import Loading from "./Loading";
import { useState } from "react";
import Error from "./Error";

function TaskPane({ taskStatus }) {
  // Destructure tasks and draggedTask from the task context and setStatusToggle function
  const { tasks, draggedTask, setStatusToggle } = useTasks();

  // Local state for loading and error handling
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // Function to create Task component for each task
  function createTask(task) {
    return (
      <Task
        key={task._id}
        taskId={task._id}
        title={task.title}
        description={task.description}
        status={task.status}
        completedAt={task.completedAt || ""}
      />
    );
  }

  // Handle drag over event to allow drop
  function handleDragOver(e) {
    e.preventDefault();
  }

  // Handle drop event to update task status
  async function handleDrop(e, status) {
    try {
      setIsLoading(true);
      // Update task status via API call
      await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_BASEURL}/api/v1/task/${
          draggedTask.taskId
        }`,
        {
          status: status,
        }
      );
      // Toggle status to re-fetch tasks
      setStatusToggle((state) => !state);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err.message);
      setError(true);
      // Hide error message after 2 seconds
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  }

  return (
    <div
      className="w-full bg-white p-4 rounded-xl"
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, taskStatus)}
    >
      <div className="flex gap-2">
        <img
          src={`/${taskStatus}.png`}
          alt={`${taskStatus} icon`}
          className="w-[30px]"
        />
        <h1 className="text-xl font-medium">{taskStatus}</h1>
      </div>

      <div className="pt-5 flex flex-col gap-4">
        {/* Filter tasks by status and create Task components */}
        {tasks.filter((el) => el.status === taskStatus).map(createTask)}
      </div>
      {isLoading && <Loading />}
      {error && <Error />}
    </div>
  );
}

// Export the TaskPane component
export default TaskPane;
