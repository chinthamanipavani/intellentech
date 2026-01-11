const Task = require("../models/Task");

// 👉 Create Task (Manager)
exports.createTask = async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      createdBy: req.body.createdBy, // manager email sent from frontend
    });

    await task.save();

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 👉 Get all tasks posted by managers
exports.getAllPostedTasks = async (req, res) => {
  try {
    // Assuming all tasks that have 'createdBy' field are manager-posted
    const tasks = await Task.find({ createdBy: { $exists: true, $ne: "" } }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
