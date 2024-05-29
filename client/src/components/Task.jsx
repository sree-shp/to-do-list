import axios from "axios";
import { useTasks } from "../contexts/TaskContext";
import Loading from "./Loading";
import { useState } from "react";
import Error from "./Error";

function Task({ taskId, title, description, status, completedAt }) {
  const { setStatusToggle, setDraggedTask } = useTasks();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleChangeStatus(e) {
    try {
      setIsLoading(true);
      await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_BASEURL}/api/v1/task/${taskId}`,
        {
          status:
            e.target.textContent === "Start" ? "In-Progress" : "Completed",
        }
      );
      setStatusToggle((state) => !state);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log(err.message);
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
    }
  }

  function handleDragStart() {
    setDraggedTask({
      taskId,
      title,
      description,
      status,
      completedAt,
    });
  }

  return (
    <div
      className={`bg-[#f0f4fc] p-4 rounded-lg`}
      draggable
      onDragStart={handleDragStart}
    >
      <h1 className="font-medium">{title}</h1>

      <p className="mt-2 mb-4">{description}</p>

      {status !== "Completed" && (
        <button
          className={`bg-indigo-600 text-white px-4 py-1 rounded-lg relative `}
          onClick={handleChangeStatus}
        >
          {status === "Pending" && "Start"}
          {status === "In-Progress" && "Complete"}
        </button>
      )}

      {status === "Completed" && (
        <div className="text-[#606265] text-sm">
          Completed at: {completedAt}
        </div>
      )}
      {isLoading && <Loading />}
      {error && <Error />}
    </div>
  );
}

export default Task;
