import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Register from "./component/Register";
import Login from "./component/Login";
import Employee from "./pages/Employee";
import Admin from "./pages/Admin";
import Manager from "./pages/Manager";
import Viewer from "./pages/Viewer";
import AllTasks from "./pages/AllTasks";
import SubmitTask from "./pages/SubmitTask";
import EmployeeTask from "./pages/EmployeeTask";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/superadmin" element={<Admin />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/viewer" element={<Viewer />} />
        <Route path="/tasks" element={<AllTasks />} />
        <Route path="/submitTask/:taskId" element={<SubmitTask />} />
        <Route path="/employeeTask" element={<EmployeeTask />} />
      </Routes>
    </>
  );
}

export default App;
