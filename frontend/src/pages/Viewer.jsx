import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Viewer = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const email = localStorage.getItem("currentUserEmail"); // get email from localStorage

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tasks/posted");
        // filter tasks that match the current user email
        const filteredTasks = res.data.filter(
          (task) => task.assignedTo === email
        );
        setTasks(filteredTasks);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, [email]);

  const handlePostTask = (id) => {
    navigate(`/submitTask/${id}`);
  }; 

  return (
    <div style={{ maxWidth: "800px", margin: "auto" }}>
      <h2>Viewer – My Assigned Tasks</h2>

      {tasks.length === 0 ? (
        <p>No tasks assigned to you.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task._id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "15px",
              marginBottom: "10px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{task.title}</h3>
            <p>
              <strong>Description:</strong> {task.description}
            </p>
            <p>
              <strong>Department:</strong> {task.department}
            </p>
            <p>
              <strong>Assigned To:</strong> {task.assignedTo}
            </p>
            <p>
              <strong>Start Date:</strong> {task.startDate}
            </p>
            <p>
              <strong>Due Date:</strong> {task.dueDate}
            </p>
            <p>
              <strong>Priority:</strong> {task.priority}
            </p>
            <p>
              <strong>Status:</strong> {task.status}
            </p>
            <p>
              <strong>Comments:</strong> {task.comments}
            </p>
            <button onClick={() => handlePostTask(task._id)}>Post Task</button>
          </div>
        ))
      )}
    </div>
  );
};

export default Viewer;
