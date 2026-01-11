import axios from "axios";
import React, { useState, useEffect } from "react";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tasks/posted");
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <h2>All Posted Tasks</h2>
      <div>
        {tasks.map((task) => (
          <div key={task._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p><strong>Assigned To:</strong> {task.assignedTo}</p>
            <p><strong>Department:</strong> {task.department}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Manager:</strong> {task.createdBy}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTasks;
