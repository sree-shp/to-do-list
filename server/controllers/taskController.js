const Task = require("../models/taskModel");

async function getAllTasks(req, res, next) {
  try {
    const tasks = await Task.find({});
    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
}

async function createTask(req, res, next) {
  try {
    const newTask = {
      title: req.body.title,
      description: req.body.description || undefined,
    };
    const task = await Task.create(newTask);
    res.status(200).json({
      status: "success",
      task,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
}

async function updateStatus(req, res, next) {
  try {
    const id = req.params.id;

    const update = {
      status: req.body.status,
    };

    if (req.body.status === "Completed") {
      const timezone = "Asia/Kolkata";
      const date = new Date();
      const options = {
        timeZone: timezone,
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      };
      const formattedDate = new Intl.DateTimeFormat("en-GB", options).format(
        date
      );
      update.completedAt = formattedDate;
    }

    console.log(update);

    const updatedTask = await Task.findOneAndUpdate(
      { _id: id },
      { $set: update }
    );

    res.status(200).json({
      status: "success",
      updatedTask,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
}

module.exports = { getAllTasks, createTask, updateStatus };
