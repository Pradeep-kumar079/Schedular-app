import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return toast.error("All fields are required");
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("🎉 Login Successful!");

      setTimeout(() => {
        navigate("/home");
      }, 1200);

    } catch (err) {
      toast.error(err.response?.data || "Login failed");
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <h2 className="login-title">Welcome Back 👋</h2>
        <p className="login-subtitle">
          Login to manage your schedule
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="login-btn">
            Sign In
          </button>

        </form>

        <p className="login-footer">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/")}>
            Register
          </span>
        </p>

      </div>

    </div>
  );
};

export default Login;