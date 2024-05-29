import axios from "axios";
import { useState } from "react";
import { useTasks } from "../contexts/TaskContext";

function TaskForm({ handleCreateTaskForm }) {
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
  });
  const [titleError, setTitleError] = useState(false);
  const { setCreateTaskToggle } = useTasks();

  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      if (formValues.title) {
        const res = await axios.post(`http://localhost:4000/api/v1/task`, {
          title: formValues.title,
          description: formValues.description,
        });
        setCreateTaskToggle((state) => !state);
        handleCreateTaskForm();
        return;
      }
      setTitleError((state) => !state);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <section className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen flex justify-center items-center">
      <div className="relative z-[1000] w-full h-full bg-black/25"></div>
      <form
        className="w-[25%] absolute z-[100000] flex flex-col gap-5 bg-white p-5 rounded-lg"
        onSubmit={handleFormSubmit}
      >
        <h1 className="text-xl font-medium">Add Task</h1>
        <div className="flex flex-col">
          <label htmlFor="">Title</label>
          <input
            type="text"
            className="bg-gray-100 px-2 py-2 rounded-lg mt-1 outline-none"
            name="title"
            value={formValues.title}
            placeholder="Enter Title"
            onChange={handleFormChange}
          />
          {titleError && <span className="text-red-400">Enter a title</span>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="">
            Description <span className="text-gray-400">(Optional)</span>
          </label>
          <input
            type="text"
            className="bg-gray-100 px-2 py-2 rounded-lg mt-1 outline-none"
            name="description"
            value={formValues.description}
            placeholder="Enter Description"
            onChange={handleFormChange}
          />
        </div>
        <div className="">
          <h1>
            Status <span className="text-indigo-600">Pending</span>
          </h1>
        </div>
        <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg">
          Create Task
        </button>
      </form>
    </section>
  );
}

export default TaskForm;
