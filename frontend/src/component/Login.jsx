import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        "https://intellentech-3lxa.onrender.com/api/users/login",
        form
      );
      alert(res.data.message);
      // ✅ Save email to localStorage
      localStorage.setItem("currentUserEmail", res.data.user.email);

      // ✅ Save token if you want for auth
      localStorage.setItem("token", res.data.token);
      const role = res.data.user.role;
      if (role == "Super Admin") {
        navigate("/superAdmin");
      } else if (role == "Manager") {
        navigate("/manager");
      } else if (role == "Employee") {
        navigate("/employee");
      } else if (role == "Viewer") {
        navigate("/viewer");
      }
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
        .login-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f3f4f6;
          font-family: Arial, sans-serif;
        }
        .login-card {
          background-color: #fff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 400px;
        }
        .login-title {
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .login-form {
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

      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Login</h2>

          <form onSubmit={handleSubmit} className="login-form">
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
            <button
              onClick={() => {
                navigate("/forgotPassword");
              }}
            >
              fomgot password
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
            <p style={{ textAlign: "center", marginTop: "10px" }}>
              Not registered yet?{" "}
              <span
                style={{ color: "#3b82f6", cursor: "pointer" }}
                onClick={() => navigate("/")}
              >
                Register here
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
