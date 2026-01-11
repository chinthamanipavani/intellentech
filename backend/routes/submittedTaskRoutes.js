// routes/submittedTaskRoutes.js
const express = require("express");
const router = express.Router();
const {
  getSubmittedTask,
  submitTask,
  updateSubmittedTask,
  getAllSubmittedTasks, // new controller
} = require("../controllers/submittedTaskController");

router.get("/submitted/:taskId", getSubmittedTask); // get one by taskId
router.get("/submitted", getAllSubmittedTasks); // get all submitted tasks
router.post("/submit/:taskId", submitTask);
router.put("/submitted/:taskId", updateSubmittedTask);

module.exports = router;
