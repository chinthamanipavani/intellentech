import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const SubmitTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    taskName: "",
    taskLink: "",
    notes: "",
    fileUrl: "",
    status: "Completed",
  });

  const [submittedTask, setSubmittedTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch submitted task (if exists)
  useEffect(() => {
    const fetchSubmittedTask = async () => {
      try {
        const res = await axios.get(
          `https://intellentech-3lxa.onrender.com/api/tasks/submitted/${taskId}`
        );
        setSubmittedTask(res.data);
      } catch (err) {
        // It's okay if no submission exists yet
      } finally {
        setLoading(false);
      }
    };

    fetchSubmittedTask();
  }, [taskId]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Submit NEW task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://intellentech-3lxa.onrender.com/api/tasks/submit/${taskId}`,
        form
      );
      alert("Task submitted successfully");
      navigate("/viewer");
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    }
  };

  // Update EXISTING task
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://intellentech-3lxa.onrender.com/api/tasks/submitted/${taskId}`,
        form
      );
      alert("Task updated successfully");
      setIsEditing(false);
      navigate("/viewer");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  // Enable edit mode
  const enableEditMode = () => {
    setIsEditing(true);
    setForm({
      taskName: submittedTask.taskName || "",
      taskLink: submittedTask.taskLink || "",
      notes: submittedTask.notes || "",
      fileUrl: submittedTask.fileUrl || "",
      status: submittedTask.status || "Completed",
    });
  };

  return (
    <div
      style={{
        maxWidth: "850px",
        margin: "40px auto",
        padding: "25px",
        background: "#f7f9fc",
        borderRadius: "12px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Submit Task
      </h2>

      {/* Form */}
      <form
        onSubmit={isEditing ? handleUpdate : handleSubmit}
        style={{
          display: "grid",
          gap: "14px",
          padding: "20px",
          background: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <input
          type="text"
          name="taskName"
          placeholder="Task Name"
          value={form.taskName}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="url"
          name="taskLink"
          placeholder="Task Link"
          value={form.taskLink}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="url"
          name="fileUrl"
          placeholder="Attachment Link"
          value={form.fileUrl}
          onChange={handleChange}
          style={inputStyle}
        />

        <textarea
          name="notes"
          placeholder="Notes / Comments"
          value={form.notes}
          onChange={handleChange}
          rows={4}
          style={inputStyle}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="Completed">Completed</option>
          <option value="In Review">In Review</option>
          <option value="Pending">Pending</option>
        </select>

        <button style={buttonPrimary} type="submit">
          {isEditing ? "Update Task" : "Submit Task"}
        </button>
      </form>

      <hr style={{ margin: "25px 0" }} />

      <h3>Submitted Task Details</h3>

      {loading ? (
        <p>Loading...</p>
      ) : !submittedTask ? (
        <p>No task submitted yet.</p>
      ) : (
        <div style={cardStyle}>
          <p><b>Name:</b> {submittedTask.taskName}</p>
          <p><b>Link:</b> {submittedTask.taskLink}</p>
          <p><b>File:</b> {submittedTask.fileUrl}</p>
          <p><b>Status:</b> {submittedTask.status}</p>
          <p><b>Notes:</b> {submittedTask.notes}</p>

          <button onClick={enableEditMode} style={buttonSecondary}>
            Edit / Update Task
          </button>
        </div>
      )}
    </div>
  );
};

// ⭐ reusable inline styles
const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  outline: "none",
  fontSize: "14px",
};

const buttonPrimary = {
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  fontWeight: "600",
  cursor: "pointer",
  background: "#2563eb",
  color: "white",
};

const buttonSecondary = {
  padding: "8px 14px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  background: "#10b981",
  color: "white",
};

const cardStyle = {
  border: "1px solid #ddd",
  padding: "15px",
  borderRadius: "10px",
  background: "white",
  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
};

export default SubmitTask;
