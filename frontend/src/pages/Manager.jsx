import React, { useState, useEffect } from "react";
import axios from "axios";
import AllTasks from "./AllTasks";

const Manager = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    department: "",
    startDate: "",
    dueDate: "",
    priority: "Medium",
    status: "Assigned",
    comments: "",
  });

  const [loading, setLoading] = useState(false);

 

  // 👉 handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 👉 submit / create task
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(" https://intellentech-3lxa.onrender.com/api/tasks/create", {
        ...task,

        createdBy: localStorage.getItem("email"), // ⭐ important
      });

      alert("Task Assigned Successfully ✔");

      // clear form
      setTask({
        title: "",
        description: "",
        assignedTo: "",
        department: "",
        startDate: "",
        dueDate: "",
        priority: "Medium",
        status: "Assigned",
        comments: "",
      });

      // refresh list
    } catch (err) {
      console.error(err);
      alert("Failed to assign task ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "900px", margin: "auto" }}>
      <h2>Manager – Assign Task</h2>

      {/* ---------------- FORM ---------------- */}
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px" }}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={task.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Task Description"
          value={task.description}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="assignedTo"
          placeholder="Assign To (Employee Email)"
          value={task.assignedTo}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={task.department}
          onChange={handleChange}
        />

        <label>Start Date</label>
        <input
          type="date"
          name="startDate"
          value={task.startDate}
          onChange={handleChange}
        />

        <label>Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={task.dueDate}
          onChange={handleChange}
        />

        <label>Priority</label>
        <select name="priority" value={task.priority} onChange={handleChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Urgent</option>
        </select>

        <textarea
          name="comments"
          placeholder="Manager Comments"
          value={task.comments}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Assigning..." : "Create & Assign Task"}
        </button>
      </form>

      <hr />

      {/* ---------------- TASK CARDS ---------------- */}
      <AllTasks/>
    </div>
  );
};

export default Manager;
