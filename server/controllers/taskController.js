// Import the Task model
const Task = require("../models/taskModel");

// Function to retrieve all tasks
async function getAllTasks(req, res, next) {
  try {
    // Find all tasks from the database
    const tasks = await Task.find({});
    // Send a success response with the tasks data
    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (err) {
    // Send a failure response with the error message if an error occurs
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
}

// Function to create a new task
async function createTask(req, res, next) {
  try {
    // Create a new task object with title and description from the request body
    const newTask = {
      title: req.body.title,
      description: req.body.description || undefined,
    };
    // Save the new task to the database
    const task = await Task.create(newTask);
    // Send a success response with the created task data
    res.status(200).json({
      status: "success",
      task,
    });
  } catch (err) {
    // Send a failure response with the error message if an error occurs
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
}

// Function to update the status of a task
async function updateStatus(req, res, next) {
  try {
    // Extract task ID from request parameters
    const id = req.params.id;

    // Prepare update object with the new status
    const update = {
      status: req.body.status,
    };

    // If the new status is "Completed", add completedAt timestamp
    if (req.body.status === "Completed") {
      const timezone = "Asia/Kolkata"; // Specify timezone
      const date = new Date(); // Get current date and time
      const options = {
        timeZone: timezone,
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      // Format the date as per requirements
      const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
        date
      );
      // Add completedAt field to the update object
      update.completedAt = formattedDate;
    }

    // Update the task in the database
    const updatedTask = await Task.findOneAndUpdate(
      { _id: id },
      { $set: update },
      { new: true } // Return the updated task after update
    );

    // Send a success response with the updated task data
    res.status(200).json({
      status: "success",
      updatedTask,
    });
  } catch (err) {
    // Send a failure response with the error message if an error occurs
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
}

// Export the controller functions to be used in the routes
module.exports = { getAllTasks, createTask, updateStatus };
