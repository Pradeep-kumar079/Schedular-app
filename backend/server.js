const express = require("express");
require("dotenv").config();
const cors = require("cors");

const { ConnectDb } = require("./Config/Db");
const authRoutes = require("./routes/authRoutes");
const availabilityRoutes = require("./routes/availabilityRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

const app = express();

app.use(express.json());

app.use(cors({
  origin: "https://schedular-app-1.onrender.com",
  credentials: true
}));

ConnectDb();

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/availability", availabilityRoutes);
app.use("/api/booking", bookingRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});