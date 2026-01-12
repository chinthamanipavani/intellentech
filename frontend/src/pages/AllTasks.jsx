import axios from "axios";
import React, { useState, useEffect } from "react";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("https://intellentech-3lxa.onrender.com/api/tasks/posted");
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, []);

  return (
    <>
      {/* Inline CSS for this page */}
      <style>{`
        .tasks-container {
          max-width: 1100px;
          margin: 20px auto;
          padding: 10px;
          font-family: Arial, sans-serif;
        }

        .page-title {
          text-align: center;
          margin-bottom: 20px;
          color: #333;
        }

        .tasks-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
        }

        .task-card {
          border-radius: 10px;
          padding: 16px;
          background: #ffffff;
          border: 1px solid #e5e5e5;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }

        .task-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.15);
        }

        .task-title {
          margin: 0 0 8px 0;
          color: #1e293b;
        }

        .task-text {
          margin: 4px 0;
          color: #555;
          line-height: 1.4;
        }

        .badge {
          display: inline-block;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
        }

        .priority-high { background:#fee2e2; color:#991b1b; }
        .priority-medium { background:#fef9c3; color:#92400e; }
        .priority-low { background:#dcfce7; color:#166534; }

        .status-pending { background:#fef3c7; color:#92400e; }
        .status-completed { background:#dcfce7; color:#166534; }
        .status-inprogress { background:#e0f2fe; color:#075985; }
      `}</style>

      <div className="tasks-container">
        <h2 className="page-title">All Posted Tasks</h2>

        <div className="tasks-grid">
          {tasks.map((task) => (
            <div key={task._id} className="task-card">
              <h3 className="task-title">{task.title}</h3>

              <p className="task-text">{task.description}</p>

              <p className="task-text"><strong>Assigned To:</strong> {task.assignedTo}</p>
              <p className="task-text"><strong>Department:</strong> {task.department}</p>

              <p className="task-text">
                <strong>Priority:</strong>{" "}
                <span className={`badge ${
                  task.priority === "High"
                    ? "priority-high"
                    : task.priority === "Medium"
                    ? "priority-medium"
                    : "priority-low"
                }`}>
                  {task.priority}
                </span>
              </p>

              <p className="task-text">
                <strong>Status:</strong>{" "}
                <span className={`badge ${
                  task.status === "Pending"
                    ? "status-pending"
                    : task.status === "Completed"
                    ? "status-completed"
                    : "status-inprogress"
                }`}>
                  {task.status}
                </span>
              </p>

              <p className="task-text"><strong>Manager:</strong> {task.createdBy}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllTasks;
