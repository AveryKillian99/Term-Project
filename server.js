"use strict";

const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

// --------------------
// CORS configuration
// --------------------
app.use(cors({
  origin: process.env.CLIENT_BASE_URL || 'http://localhost:5173', // frontend URL
  credentials: true, // allow cookies to be sent
}));

// --------------------
// Middleware
// --------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --------------------
// Session middleware
// --------------------
app.use(session({
  secret: process.env.SESSION_SECRET || "supersecretkey",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,   // true if using HTTPS
    sameSite: "lax"  // 'lax' works with OAuth redirects
  }
}));

// --------------------
// Passport setup
// --------------------
require('./auth/passport'); // ensure this file exists
app.use(passport.initialize());
app.use(passport.session());

// --------------------
// Routes
// --------------------
const workoutRoutes = require("./routes/workoutRoutes");
app.use("/api/workouts", workoutRoutes);

const quoteRoutes = require("./routes/quote");
app.use("/api/quote", quoteRoutes);

const authRoutes = require("./auth/authRoutes");
app.use("/auth", authRoutes);

// --------------------
// Serve React frontend
// --------------------
app.use(express.static(path.join(__dirname, "react-client/dist")));
app.get("/:path(*)", (req, res) => {
  res.sendFile(path.join(__dirname, "react-client/dist", "index.html"));
});

// --------------------
// Start server
// --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});
