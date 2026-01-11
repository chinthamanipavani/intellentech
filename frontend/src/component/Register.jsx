import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Employee",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        form
      );
      alert(res.data.message);
      setForm({
        name: "",
        email: "",
        password: "",
        role: "Employee",
      });
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Internal CSS */}
      <style>
        {`
        .register-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f3f4f6;
          font-family: Arial, sans-serif;
        }
        .register-card {
          background-color: #fff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 400px;
        }
        .register-title {
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .register-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .input-field {
          padding: 10px 12px;
          border: 1px solid #ccc;
          border-radius: 6px;
          font-size: 16px;
          outline: none;
          transition: 0.2s;
        }
        .input-field:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 5px rgba(59,130,246,0.5);
        }
        .submit-btn {
          background-color: #3b82f6;
          color: white;
          font-weight: bold;
          padding: 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: 0.2s;
        }
        .submit-btn:hover {
          background-color: #2563eb;
        }
        .submit-btn:disabled {
          background-color: #93c5fd;
          cursor: not-allowed;
        }
        `}
      </style>

      <div className="register-container">
        <div className="register-card">
          <h2 className="register-title">Register User</h2>

          <form onSubmit={handleSubmit} className="register-form">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="input-field"
              required
            />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="input-field"
            >
              <option value="Super Admin">Super Admin</option>
              <option value="Manager">Manager</option>
              <option value="Employee">Employee</option>
              <option value="Viewer">Viewer</option>
            </select>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
            <p>
              User already registered?{" "}
              <span
                style={{ color: "#3b82f6", cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                Login here
              </span>
            </p>{" "}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
