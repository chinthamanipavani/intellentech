import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("https://intellentech-3lxa.onrender.com/api/tasks/submitted");
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading)
    return (
      <p style={{ textAlign: "center", fontSize: "18px", marginTop: "20px" }}>
        Loading submitted employee tasks…
      </p>
    );

  return (
    <>
      {/* Inline page styling */}
      <style>{`
        .page-container {
          max-width: 1100px;
          margin: 20px auto;
          padding: 10px;
          font-family: Arial, sans-serif;
        }

        .page-title {
          text-align: center;
          margin-bottom: 20px;
          color: #1e293b;
        }

        .task-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }

        .task-card {
          padding: 16px;
          border-radius: 12px;
          background: #ffffff;
          border: 1px solid #e5e7eb;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          transition: transform .15s ease, box-shadow .15s ease;
        }

        .task-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 18px rgba(0,0,0,0.15);
        }

        .task-title {
          margin: 0 0 8px 0;
          color: #0f172a;
        }

        .task-text {
          margin: 4px 0;
          color: #374151;
        }

        .badge {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .status-completed { background:#dcfce7; color:#166534; }
        .status-pending { background:#fef3c7; color:#92400e; }
        .status-inprogress { background:#e0f2fe; color:#075985; }

        .task-link {
          word-break: break-all;
          text-decoration: none;
          font-weight: 600;
        }

        .task-link:hover {
          text-decoration: underline;
        }
      `}</style>

      <div className="page-container">
        <h2 className="page-title">Submitted Employee Tasks</h2>

        {tasks.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "10px" }}>
            No submitted tasks found.
          </p>
        ) : (
          <div className="task-grid">
            {tasks.map((task) => (
              <div key={task._id} className="task-card">
                <h3 className="task-title">{task.taskName}</h3>

                <p className="task-text">
                  <strong>Employee:</strong> {task.submittedBy}
                </p>

                <p className="task-text">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`badge ${
                      task.status === "Completed"
                        ? "status-completed"
                        : task.status === "Pending"
                        ? "status-pending"
                        : "status-inprogress"
                    }`}
                  >
                    {task.status}
                  </span>
                </p>

                <p className="task-text">
                  <strong>Task Link:</strong>{" "}
                  <a
                    className="task-link"
                    href={task.taskLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {task.taskLink}
                  </a>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default EmployeeTask;
