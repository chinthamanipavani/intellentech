import React from "react";
import AllTasks from "./AllTasks";
import EmployeeTask from "./EmployeeTask";
import Manager from "./Manager";

const Admin = () => {
  return (
    <div>
      <Manager/>
      <EmployeeTask/>
    </div>
  );
};

export default Admin;
