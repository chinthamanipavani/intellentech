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

  // 👉 Step-1 fetch submitted task if already exists
  useEffect(() => {
    const fetchSubmittedTask = async () => {
      try {
        const res = await axios.get(
          ` https://intellentech-3lxa.onrender.com/api/tasks/submitted/${taskId}`
        );
        setSubmittedTask(res.data);
      } catch (err) {
        // no task submitted yet — that's OK
      }
    };

    fetchSubmittedTask();
  }, [taskId]);

  // 👉 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // 👉 Submit NEW task
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        ` https://intellentech-3lxa.onrender.com/api/tasks/submit/${taskId}`,
        form
      );

      alert("Task submitted successfully");
      navigate("/viewer");
    } catch (err) {
      console.error(err);
      alert("Submission failed");
    }
  };

  // 👉 Update EXISTING task
  const handleUpdate = async () => {
    try {
      await axios.put(
        ` https://intellentech-3lxa.onrender.com/api/tasks/submitted/${taskId}`,
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

  // 👉 When user clicks Update button
  const enableEditMode = () => {
    setIsEditing(true);

    // pre-fill fields with existing data
    setForm({
      taskName: submittedTask.taskName,
      taskLink: submittedTask.taskLink,
      notes: submittedTask.notes,
      fileUrl: submittedTask.fileUrl,
      status: submittedTask.status,
    });
  };

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h2>Submit Task</h2>

      {/* ---------- FORM ---------- */}
      <form
        onSubmit={isEditing ? handleUpdate : handleSubmit}
        style={{ display: "grid", gap: "12px" }}
      >
        <input
          type="text"
          name="taskName"
          placeholder="Task Name"
          value={form.taskName}
          onChange={handleChange}
          required
        />

        <input
          type="url"
          name="taskLink"
          placeholder="Task Link"
          value={form.taskLink}
          onChange={handleChange}
          required
        />

        <input
          type="url"
          name="fileUrl"
          placeholder="Attachment Link"
          value={form.fileUrl}
          onChange={handleChange}
        />

        <textarea
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
          rows={4}
        />

        <select name="status" value={form.status} onChange={handleChange}>
          <option value="Completed">Completed</option>
          <option value="In Review">In Review</option>
          <option value="Pending">Pending</option>
        </select>

        <button type="submit">
          {isEditing ? "Update Task" : "Submit Task"}
        </button>
      </form>

      <hr />

      {/* ---------- SHOW SUBMITTED TASK ---------- */}
      <h3>Submitted Task Details</h3>

      {!submittedTask ? (
        <p>No task submitted yet.</p>
      ) : (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <p>
            <b>Name:</b> {submittedTask.taskName}
          </p>
          <p>
            <b>Link:</b> {submittedTask.taskLink}
          </p>
          <p>
            <b>File:</b> {submittedTask.fileUrl}
          </p>
          <p>
            <b>Status:</b> {submittedTask.status}
          </p>
          <p>
            <b>Notes:</b> {submittedTask.notes}
          </p>

          <button onClick={enableEditMode}>Edit / Update Task</button>
        </div>
      )}
    </div>
  );
};

export default SubmitTask;
