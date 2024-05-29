const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Task name is mandatory"],
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "In-Progress", "Completed"],
    default: "Pending",
  },
  completedAt: {
    type: String,
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
