import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      return toast.error("All fields are required");
    }

    try {
      await axios.post(
        "https://schedular-app-eom4.onrender.com/api/auth/register",
        form
      );

      toast.success("🎉 Registration Successful!");

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {
      toast.error(err.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h2 className="register-title">Create your account</h2>
        <p className="register-subtitle">
          Start scheduling meetings effortlessly 🚀
        </p>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
            />
          </div>

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

          <button type="submit" className="register-btn">
            Create Account
          </button>

        </form>

        <p className="register-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>
            Login
          </span>
        </p>

      </div>
    </div>
  );
};

export default Register;