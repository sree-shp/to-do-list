// Import the Express framework
const express = require("express");

// Create a router instance
const router = express.Router();

// Import the task controller module
const taskController = require("../controllers/taskController");

// Define routes and their corresponding controller functions
router
  // Route for handling GET and POST requests to "/api/v1/task/"
  .route("/")
  // GET request: Retrieve all tasks
  .get(taskController.getAllTasks)
  // POST request: Create a new task
  .post(taskController.createTask);

// Route for handling PUT request to "/api/v1/task/:id"
router
  .route("/:id")
  // PUT request: Update task status
  .put(taskController.updateStatus);

// Export the router to be used in the main application
module.exports = router;
