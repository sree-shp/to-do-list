// Import necessary modules and components
import axios from "axios";
import { useTasks } from "../contexts/TaskContext";
import Loading from "./Loading";
import { useState } from "react";
import Error from "./Error";

function Task({ taskId, title, description, status, completedAt }) {
  // Access task context to update task status and handle drag-and-drop
  const { setStatusToggle, setDraggedTask } = useTasks();

  // Local state for loading and error handling
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // Function to handle status change of the task
  async function handleChangeStatus(e) {
    try {
      setIsLoading(true);
      // Make an API call to update task status based on button text
      await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_BASEURL}/api/v1/task/${taskId}`,
        {
          status:
            e.target.textContent === "Start" ? "In-Progress" : "Completed",
        }
      );
      // Toggle status to re-fetch tasks after update
      setStatusToggle((state) => !state);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err.message);
      setError(true);
      // Show error message and hide after 2 seconds
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  }

  // Function to handle drag start event
  function handleDragStart() {
    // Set the dragged task in the task context
    setDraggedTask({
      taskId,
      title,
      description,
      status,
      completedAt,
    });
  }

  return (
    // Task component with draggable feature
    <div
      className={`bg-[#f0f4fc] p-4 rounded-lg`}
      draggable
      onDragStart={handleDragStart}
    >
      {/* Display task title */}
      <h1 className="font-medium">{title}</h1>

      {/* Display task description */}
      <p className="mt-2 mb-4">{description}</p>

      {/* Render button based on task status for status change */}
      {status !== "Completed" && (
        <button
          className={`bg-indigo-600 text-white px-4 py-1 rounded-lg relative `}
          onClick={handleChangeStatus}
        >
          {status === "Pending" && "Start"}
          {status === "In-Progress" && "Complete"}
        </button>
      )}

      {/* Display completed at time if status is completed */}
      {status === "Completed" && (
        <div className="text-[#606265] text-sm">
          Completed at: {completedAt}
        </div>
      )}

      {/* Show loading spinner if loading */}
      {isLoading && <Loading />}

      {/* Show error message if there is an error */}
      {error && <Error />}
    </div>
  );
}

// Export the Task component
export default Task;
