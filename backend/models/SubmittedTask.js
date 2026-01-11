const mongoose = require("mongoose");

const submittedTaskSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Task",
    required: true,
  },
  taskName: String,
  taskLink: String,
  fileUrl: String,
  notes: String,
  status: {
    type: String,
    default: "Completed",
  },
  submittedBy: String, // employee email (optional)
});

module.exports = mongoose.model("SubmittedTask", submittedTaskSchema);
