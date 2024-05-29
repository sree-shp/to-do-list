import axios from "axios";
import { useTasks } from "../contexts/TaskContext";
import Task from "./Task";
import Loading from "./Loading";
import { useState } from "react";
import Error from "./Error";

function TaskPane({ taskStatus }) {
  const { tasks, draggedTask, setStatusToggle } = useTasks();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

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

  function handleDragOver(e) {
    e.preventDefault();
  }

  async function handleDrop(e, status) {
    try {
      setIsLoading(true);
      await axios.put(
        `${import.meta.env.VITE_REACT_APP_API_BASEURL}/api/v1/task/${
          draggedTask.taskId
        }`,
        {
          status: status,
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

  return (
    <div
      className="w-full bg-white p-4 rounded-xl"
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, taskStatus)}
    >
      <div className="flex gap-2">
        <img src={`/${taskStatus}.png`} alt="" className="w-[30px]" />
        <h1 className="text-xl font-medium">{taskStatus}</h1>
      </div>

      <div className="pt-5 flex flex-col gap-4">
        {tasks.filter((el) => el.status === taskStatus).map(createTask)}
      </div>
      {isLoading && <Loading />}
      {error && <Error />}
    </div>
  );
}

export default TaskPane;
