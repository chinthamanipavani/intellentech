import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(" https://intellentech-3lxa.onrender.com/api/tasks/submitted");
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <p>Loading submitted employee tasks…</p>;

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h2>Submitted Employee Tasks</h2>

      {tasks.length === 0 ? (
        <p>No submitted tasks found.</p>
      ) : (
        <div style={{ display: "grid", gap: "12px" }}>
          {tasks.map((task) => (
            <div
              key={task._id}
              style={{
                padding: "12px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <h3>{task.taskName}</h3>
              <p><strong>Employee:</strong> {task.submittedBy}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <p>
                <strong>Task Link:</strong>{" "}
                <a href={task.taskLink} target="_blank" rel="noreferrer">
                  {task.taskLink}
                </a>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployeeTask;
