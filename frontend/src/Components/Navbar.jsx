import React, { useState } from "react";
import "./Navbar.css";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="navbar-logo" onClick={() => navigate("/home")}>
        Scheduler<span>App</span>
      </div>

      {/* Menu */}
      <ul className={`navbar-links ${open ? "active" : ""}`}>

        <li
          className={location.pathname === "/home" ? "active" : ""}
          onClick={() => navigate("/home")}
        >
          Home
        </li>

        <li onClick={() => navigate("/about")}>About</li>

        <li onClick={() => navigate("/bookings")}>Bookings</li>

        <li onClick={() => navigate("/history")}>History</li>

        <li
          className={location.pathname === "/account" ? "active" : ""}
          onClick={() => navigate("/account")}
        >
          Account
        </li>

        <li className="logout" onClick={handleLogout}>
          Logout
        </li>
      </ul>

      {/* Hamburger */}
      <div className="hamburger" onClick={() => setOpen(!open)}>
        ☰
      </div>

    </nav>
  );
};

export default Navbar;