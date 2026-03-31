import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Book from "./Pages/Book";
import Account from "./Components/Account";
import About from "./Components/About";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" /> {/* 🔥 Toast here */}

      <Routes>
        <Route path="*" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />

        <Route path="/book/:userId" element={<Book />} />
        <Route path="/account" element={<Account />} />
        <Route path="/bookings" element={<Book />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;