import TaskPane from "./components/TaskPane";
import "./App.css";

import { TaskProvider } from "./contexts/TaskContext";
import TaskForm from "./components/TaskForm";
import { useState } from "react";

function App() {
  const [taskForm, setTaskForm] = useState(false);

  function handleCreateTaskForm() {
    setTaskForm((state) => !state);
  }
  return (
    <TaskProvider>
      <main className=" px-[6rem] py-[3rem]">
        <div className="flex justify-between">
          <h1 className="text-3xl font-medium">To Do List</h1>
          <button
            className="bg-indigo-600 text-white px-4 py-1 rounded-lg"
            onClick={handleCreateTaskForm}
          >
            + Add Task
          </button>
        </div>
        {taskForm && <TaskForm handleCreateTaskForm={handleCreateTaskForm} />}
        <div className="flex justify-between gap-5 py-[2rem]">
          <TaskPane taskStatus={"Pending"} />
          <TaskPane taskStatus={"In-Progress"} />
          <TaskPane taskStatus={"Completed"} />
        </div>
      </main>
    </TaskProvider>
  );
}

export default App;
