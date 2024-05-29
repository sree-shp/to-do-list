import axios from "axios";
import { useTasks } from "../contexts/TaskContext";

function Task({ taskId, title, description, status, completedAt }) {
  const { setStatusToggle, setDraggedTask } = useTasks();

  async function handleChangeStatus(e) {
    await axios.put(`http://localhost:4000/api/v1/task/${taskId}`, {
      status: e.target.textContent === "Start" ? "In-Progress" : "Completed",
    });
    setStatusToggle((state) => !state);
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
    </div>
  );
}

export default Task;
