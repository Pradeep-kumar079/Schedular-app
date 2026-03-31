import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "./AvailabilityForm.css";

const AvailabilityForm = ({ userId, refresh }) => {
  const [form, setForm] = useState({
    day: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addAvailability = async () => {
    if (!form.day || !form.startTime || !form.endTime) {
      return toast.error("Please fill all fields");
    }

    try {
      await axios.post("https://schedular-app-eom4.onrender.com/api/availability", {
        ...form,
        userId,
      });

      toast.success("Slot added!");
      refresh();

      // reset
      setForm({
        day: "",
        startTime: "",
        endTime: "",
      });

    } catch {
      toast.error("Error");
    }
  };

  return (
    <div className="availability-container">

      <h3 className="availability-title">Add Availability</h3>

      <div className="availability-form">

        <input
          name="day"
          placeholder="Day (e.g. Monday)"
          value={form.day}
          onChange={handleChange}
        />

        <input
          type="time"
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
        />

        <input
          type="time"
          name="endTime"
          value={form.endTime}
          onChange={handleChange}
        />

        <button onClick={addAvailability}>
          Add Slot
        </button>

      </div>

    </div>
  );
};

export default AvailabilityForm;