import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-content">

        {/* Left */}
        <div className="footer-left">
          <h3>SchedulerApp</h3>
          <p>Simple and smart scheduling solution</p>
        </div>

        {/* Center */}
        <div className="footer-links">
          <span>Home</span>
          <span>About</span>
          <span>Contact</span>
        </div>

        {/* Right */}
        <div className="footer-right">
          <p>© 2026 Scheduler App</p>
        </div>

      </div>

    </footer>
  );
};

export default Footer;