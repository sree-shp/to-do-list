import axios from "axios";
import { useTasks } from "../contexts/TaskContext";
import Task from "./Task";

function TaskPane({ taskStatus }) {
  const { tasks, draggedTask, setStatusToggle } = useTasks();

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
      const res = await axios.put(
        `http://localhost:4000/api/v1/task/${draggedTask.taskId}`,
        {
          status: status,
        }
      );
      setStatusToggle((state) => !state);
    } catch (err) {
      console.log(err.message);
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
    </div>
  );
}

export default TaskPane;
