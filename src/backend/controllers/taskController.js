const Task = require("../models/TaskModel");

// Get all tasks for a user
exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

// Create a new task
exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({ user: req.user._id, title, description });
  res.status(201).json(task);
};

// Update a task
exports.updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  res.json(task);
};

// Delete a task
exports.deleteTask = async (req, res) => {
  await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  res.json({ message: "Task deleted" });
};
