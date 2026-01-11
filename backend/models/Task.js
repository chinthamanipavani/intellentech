const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    assignedTo: String,
    department: String,
    startDate: String,
    dueDate: String,
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Urgent"],
      default: "Medium",
    },
    status: {
      type: String,
      enum: ["Assigned", "In-Progress", "Completed", "On-Hold"],
      default: "Assigned",
    },
    comments: String,
    createdBy: String, // manager id/email
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
