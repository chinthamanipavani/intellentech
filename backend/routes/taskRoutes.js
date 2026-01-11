const express = require("express");
const { createTask, getAllPostedTasks } = require("../controllers/taskControllers");

const router = express.Router();

// Create a new task
router.post("/create", createTask);

// Get all tasks posted by managers
router.get("/posted", getAllPostedTasks);

module.exports = router;
