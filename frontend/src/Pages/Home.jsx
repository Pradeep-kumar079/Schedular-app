import React, { useEffect, useState } from "react";
import axios from "axios";
import AvailabilityForm from "../Components/AvailabilityForm";
import Navbar from "../Components/Navbar";
import "./Home.css";
import Footer from "../Components/Footer";

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [slots, setSlots] = useState([]);

  const fetchSlots = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/availability/${user._id}`
    );
    setSlots(res.data);
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const link = `http://localhost:3000/book/${user._id}`;

  return (
    <div className="home-container">
      <Navbar />

      <div className="home-content">

        {/* Welcome */}
        <div className="card">
          <h2>Welcome, {user?.name} 👋</h2>
          <p className="subtitle">Manage your availability and bookings</p>
        </div>

        {/* Booking Link */}
        <div className="card">
          <h3>Your Booking Link</h3>
          <div className="link-box">
            <input value={link} readOnly />
            <button onClick={() => navigator.clipboard.writeText(link)}>
              Copy
            </button>
          </div>
        </div>

        {/* Availability */}
        <div className="card">
          <AvailabilityForm userId={user._id} refresh={fetchSlots} />
        </div>

        {/* Slots */}
        <div className="card">
          <h3>Your Availability Slots</h3>

          <div className="slots">
            {slots.length === 0 ? (
              <p>No slots added yet</p>
            ) : (
              slots.map((s, i) => (
                <div key={i} className="slot-item">
                  <span>{s.day}</span>
                  <span>{s.startTime} - {s.endTime}</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default Home;