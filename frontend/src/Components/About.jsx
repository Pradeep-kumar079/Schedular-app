import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-container">

      <div className="about-card">

        <h1 className="title">About Scheduler App</h1>

        <p className="description">
          Scheduler App is a web-based scheduling platform similar to Calendly,
          designed to simplify appointment booking without back-and-forth emails.
          Users can create availability slots, share booking links, and allow others
          to schedule meetings seamlessly.
        </p>

        {/* Features */}
        <div className="section">
          <h2>Key Features</h2>
          <ul>
            <li>✔ User Authentication (Login & Register)</li>
            <li>✔ Availability Management</li>
            <li>✔ Public Booking Link</li>
            <li>✔ Conflict-Free Scheduling</li>
            <li>✔ Google Calendar Integration</li>
            <li>✔ Responsive UI Design</li>
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="section">
          <h2>Tech Stack</h2>
          <ul>
            <li><strong>Frontend:</strong> React.js, CSS</li>
            <li><strong>Backend:</strong> Node.js, Express.js</li>
            <li><strong>Database:</strong> MongoDB</li>
            <li><strong>Tools:</strong> Axios, JWT, Git</li>
          </ul>
        </div>

        {/* Your Role */}
        <div className="section">
          <h2>My Contribution</h2>
          <p>
            Designed and developed a full-stack scheduling platform with secure
            authentication, REST APIs, dynamic booking system, and responsive UI.
            Implemented calendar integration and ensured scalability using modular architecture.
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;