"use strict";

const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const workoutRoutes = require("./routes/workoutRoutes");
app.use("/api/workouts", workoutRoutes);

// Serve React frontend
app.use(express.static(path.join(__dirname, "react-client/dist")));

// Catch-all route for React (Express 5 syntax)
app.get("/:path(*)", (req, res) => {
  res.sendFile(path.join(__dirname, "react-client/dist", "index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});
