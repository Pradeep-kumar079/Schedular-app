import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "./Book.css";

const Book = () => {
  const { userId } = useParams();

  const [slots, setSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);

  const [email, setEmail] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [manualDate, setManualDate] = useState("");
  const [manualTime, setManualTime] = useState("");

  const [confirmed, setConfirmed] = useState(false);

  // ✅ NEW: store final booking details
  const [finalDetails, setFinalDetails] = useState(null);

  // ✅ FETCH DATA
  useEffect(() => {
    if (!userId) return;

    axios
      .get(`https://schedular-app-eom4.onrender.com/api/availability/${userId}`)
      .then((res) => {
        if (Array.isArray(res.data)) {
          setSlots(res.data);
        } else if (Array.isArray(res.data.slots)) {
          setSlots(res.data.slots);
        } else {
          setSlots([]);
        }
      })
      .catch(() => setSlots([]));

    axios
      .get(`https://schedular-app-eom4.onrender.com/api/booking/${userId}`)
      .then((res) => {
        setBookedSlots(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => setBookedSlots([]));
  }, [userId]);

  // ✅ BOOK FUNCTION
  const book = async () => {
    let finalDate, finalTime, finalDay;

    if (selectedSlot) {
      finalDate = selectedSlot.date;
      finalTime = selectedSlot.time;
      finalDay = selectedSlot.day;
    } else if (manualDate && manualTime) {
      finalDate = manualDate;
      finalTime = manualTime;
      finalDay = new Date(manualDate).toLocaleDateString("en-US", {
        weekday: "long",
      });
    } else {
      return toast.error("Select slot or choose manually");
    }

    if (!email) {
      return toast.error("Enter your email");
    }

    try {
      const res = await axios.post("https://schedular-app-eom4.onrender.com/api/booking", {
        userId,
        date: finalDate,
        time: finalTime,
        bookedBy: email,
      });

      // ✅ store final booking details
      setFinalDetails({
        email,
        day: finalDay,
        date: finalDate,
        time: finalTime,
      });

      toast.success(res.data.message);

      // ✅ clear inputs
      setEmail("");
      setSelectedSlot(null);
      setManualDate("");
      setManualTime("");

      setConfirmed(true);

    } catch (err) {
      toast.error(err.response?.data || "Booking failed");
    }
  };

  // ✅ CONFIRMATION UI
  if (confirmed) {
    return (
      <div className="book-container">
        <div className="book-card">
          <h2>🎉 Booking Confirmed</h2>
          <p><strong>Email:</strong> {finalDetails?.email}</p>
          <p><strong>Day:</strong> {finalDetails?.day}</p>
          <p><strong>Date:</strong> {finalDetails?.date}</p>
          <p><strong>Time:</strong> {finalDetails?.time}</p>
        </div>
      </div>
    );
  }

  // ✅ UNIQUE DAYS
  const uniqueDays = [
    ...new Set((Array.isArray(slots) ? slots : []).map((s) => s.day)),
  ];

  const todayDate = new Date().toISOString().split("T")[0];

  return (
    <div className="book-container">
      <div className="book-card">

        <h2>Schedule Meeting</h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* AVAILABLE SLOTS */}
        <h3>Available Slots</h3>

        {uniqueDays.length === 0 && <p>No availability</p>}

        {uniqueDays.map((day, i) => (
          <div key={i} className="day-block">

            <h4>{day}</h4>

            <div className="slots">
              {(Array.isArray(slots) ? slots : [])
                .filter((s) => s.day === day)
                .map((s, j) => {

                  // ✅ FIX: check date + time
                  const isBooked = bookedSlots.some(
                    (b) =>
                      b.time === s.startTime &&
                      b.date === todayDate
                  );

                  const isSelected =
                    selectedSlot?.time === s.startTime &&
                    selectedSlot?.day === day;

                  return (
                    <button
                      key={j}
                      disabled={isBooked}
                      className={`slot-btn ${
                        isSelected ? "selected" : ""
                      } ${isBooked ? "booked" : ""}`}
                      onClick={() => {
                        if (isSelected) {
                          setSelectedSlot(null);
                        } else {
                          setSelectedSlot({
                            day,
                            date: todayDate,
                            time: s.startTime,
                          });

                          setManualDate("");
                          setManualTime("");
                        }
                      }}
                    >
                      {s.startTime}
                      {isBooked && " (Booked)"}
                    </button>
                  );
                })}
            </div>

          </div>
        ))}

        {/* MANUAL */}
        <h3>Or Choose Custom Time</h3>

        <input
          type="date"
          value={manualDate}
          onChange={(e) => {
            setManualDate(e.target.value);
            setSelectedSlot(null);
          }}
        />

        <input
          type="time"
          value={manualTime}
          onChange={(e) => {
            setManualTime(e.target.value);
            setSelectedSlot(null);
          }}
        />

        {/* PREVIEW */}
        {(selectedSlot || manualDate) && (
          <div className="selected-slot">
            {selectedSlot
              ? `📆 ${selectedSlot.day} | 🕒 ${selectedSlot.time}`
              : `📆 ${manualDate} | 🕒 ${manualTime}`}
          </div>
        )}

        {/* CONFIRM */}
        <button className="confirm-btn" onClick={book}>
          Confirm Booking
        </button>

      </div>
    </div>
  );
};

export default Book;