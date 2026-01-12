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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("https://intellentech-3lxa.onrender.com/api/tasks/create", {
        ...task,
        createdBy: localStorage.getItem("email"),
      });

      alert("Task Assigned Successfully ✔");

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
    } catch (err) {
      console.error(err);
      alert("Failed to assign task ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Inline styling */}
      <style>{`
        .manager-container {
          max-width: 1100px;
          margin: 20px auto;
          font-family: Arial, sans-serif;
          padding: 10px;
        }

        .section-title {
          text-align: center;
          margin-bottom: 10px;
          color: #0f172a;
        }

        .task-form-card {
          background: #ffffff;
          border-radius: 14px;
          padding: 20px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 6px 20px rgba(0,0,0,0.08);
          margin-bottom: 20px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .form-grid textarea {
          grid-column: span 2;
        }

        .form-grid input,
        .form-grid select,
        .form-grid textarea {
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #d1d5db;
          font-size: 14px;
        }

        .form-grid label {
          font-weight: 600;
          color: #334155;
        }

        .submit-btn {
          margin-top: 10px;
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          background: #2563eb;
          color: white;
          border: none;
          font-size: 15px;
          cursor: pointer;
          transition: .2s ease;
        }

        .submit-btn:hover {
          background: #1d4ed8;
        }

        .submit-btn:disabled {
          background: gray;
          cursor: not-allowed;
        }
      `}</style>

      <div className="manager-container">
        <h2 className="section-title">Manager – Assign Task</h2>

        <div className="task-form-card">
          <form onSubmit={handleSubmit} className="form-grid">
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={task.title}
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

            <select
              name="priority"
              value={task.priority}
              onChange={handleChange}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Urgent</option>
            </select>

            <div>
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={task.startDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
              />
            </div>

            <textarea
              rows={3}
              name="description"
              placeholder="Task Description"
              value={task.description}
              onChange={handleChange}
              required
            />

            <textarea
              rows={2}
              name="comments"
              placeholder="Manager Comments"
              value={task.comments}
              onChange={handleChange}
            />

            <button className="submit-btn" type="submit" disabled={loading}>
              {loading ? "Assigning..." : "Create & Assign Task"}
            </button>
          </form>
        </div>

        <AllTasks />
      </div>
    </>
  );
};

export default Manager;
