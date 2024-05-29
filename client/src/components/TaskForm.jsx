// Import necessary modules and components
import axios from "axios";
import { useState } from "react";
import { useTasks } from "../contexts/TaskContext";
import Loading from "./Loading";
import Error from "./Error";

function TaskForm({ handleCreateTaskForm }) {
  // Local state to manage form values, errors, loading state, and error state
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
  });
  const [titleError, setTitleError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { setCreateTaskToggle } = useTasks();

  // Handle form input changes
  function handleFormChange(e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  // Handle form submission
  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      setIsLoading(true);
      // Validate title is not empty
      if (formValues.title) {
        // Make API call to create a new task
        await axios.post(
          `${import.meta.env.VITE_REACT_APP_API_BASEURL}/api/v1/task`,
          {
            title: formValues.title,
            description: formValues.description,
          }
        );
        // Toggle task creation state and close the form
        setCreateTaskToggle((state) => !state);
        handleCreateTaskForm();
        return;
      }
      // Show title error if title is empty
      setTitleError(true);
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
    <section className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen flex justify-center items-center z-[10000]">
      {/* Overlay background */}
      <div className="relative z-[10000] w-full h-full bg-black/25"></div>
      {/* Task creation form */}
      <form
        className="w-[25%] absolute z-[100000] flex flex-col gap-5 bg-white p-5 rounded-lg"
        onSubmit={handleFormSubmit}
      >
        <h1 className="text-xl font-medium">Add Task</h1>
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="bg-gray-100 px-2 py-2 rounded-lg mt-1 outline-none"
            name="title"
            value={formValues.title}
            placeholder="Enter Title"
            onChange={handleFormChange}
          />
          {/* Show error if title is empty */}
          {titleError && <span className="text-red-400">Enter a title</span>}
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">
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
        <div>
          <h1>
            Status <span className="text-indigo-600">Pending</span>
          </h1>
        </div>
        <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-lg">
          Create Task
        </button>
      </form>
      {/* Show loading spinner if loading */}
      {isLoading && <Loading />}
      {/* Show error message if there is an error */}
      {error && <Error />}
    </section>
  );
}

// Export the TaskForm component
export default TaskForm;
