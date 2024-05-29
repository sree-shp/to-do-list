// Import Mongoose for schema creation
const mongoose = require("mongoose");

// Define the schema for a task
const TaskSchema = new mongoose.Schema({
  // Title of the task
  title: {
    type: String,
    required: [true, "Task name is mandatory"], // Title is mandatory
  },
  // Description of the task (optional)
  description: {
    type: String,
  },
  // Status of the task (Pending, In-Progress, Completed)
  status: {
    type: String,
    enum: ["Pending", "In-Progress", "Completed"], // Only allowed values
    default: "Pending", // Default status is Pending
  },
  // Timestamp when the task is completed (optional)
  completedAt: {
    type: String,
  },
});

// Create a Mongoose model based on the schema
const Task = mongoose.model("Task", TaskSchema);

// Export the Task model to be used in other files
module.exports = Task;
