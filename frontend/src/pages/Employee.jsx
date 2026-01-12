import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Employee = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const email = localStorage.getItem("currentUserEmail");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          "https://intellentech-3lxa.onrender.com/api/tasks/posted"
        );

        // show only tasks assigned to current user
        const filteredTasks = res.data.filter(
          (task) => task.assignedTo === email
        );

        setTasks(filteredTasks);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [email]);

  const handlePostTask = (id) => {
    navigate(`/submitTask/${id}`);
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
        background: "#f8fafc",
        borderRadius: "12px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "25px",
        }}
      >
        Viewer – My Assigned Tasks
      </h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p style={{ textAlign: "center", fontWeight: "500" }}>
          🚫 No tasks assigned to you yet
        </p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "18px",
              marginBottom: "15px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
              transition: "transform .15s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.01)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={{ marginBottom: "8px" }}>{task.title}</h3>

            <p>
              <b>Description:</b> {task.description}
            </p>
            <p>
              <b>Department:</b> {task.department}
            </p>
            <p>
              <b>Assigned To:</b> {task.assignedTo}
            </p>
            <p>
              <b>Start Date:</b> {task.startDate}
            </p>
            <p>
              <b>Due Date:</b> {task.dueDate}
            </p>
            <p>
              <b>Priority:</b> {task.priority}
            </p>
            <p>
              <b>Status:</b> {task.status}
            </p>
            <p>
              <b>Comments:</b> {task.comments}
            </p>

            <button
              onClick={() => handlePostTask(task._id)}
              style={{
                marginTop: "10px",
                padding: "10px 14px",
                borderRadius: "8px",
                border: "none",
                background: "#2563eb",
                color: "white",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Submit / Update Task
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Employee;
