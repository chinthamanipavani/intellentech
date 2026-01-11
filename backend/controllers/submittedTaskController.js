const SubmittedTask = require("../models/SubmittedTask");

// ⭐ get submitted task by taskId
exports.getSubmittedTask = async (req, res) => {
  try {
    const task = await SubmittedTask.findOne({ taskId: req.params.taskId });

    if (!task) return res.status(404).json({ message: "No submission yet" });

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ⭐ submit new task
exports.submitTask = async (req, res) => {
  try {
    const tasks = await SubmittedTask.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// ⭐ update submitted task
exports.updateSubmittedTask = async (req, res) => {
  try {
    const updated = await SubmittedTask.findOneAndUpdate(
      { taskId: req.params.taskId },
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// controllers/submittedTaskController.js

// Get all submitted tasks
exports.getAllSubmittedTasks = async (req, res) => {
  try {
    const tasks = await SubmittedTask.find(); // fetch all submitted tasks
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
