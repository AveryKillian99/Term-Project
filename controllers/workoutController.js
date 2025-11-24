"use strict";

const model = require("../models/workoutModel"); // make sure path is correct

// Fetch all workouts
async function fetchAllWorkouts(req, res) {
  try {
    const workouts = await model.getAllWorkouts();
    res.json(workouts);
  } catch (err) {
    console.error("Error fetching workouts:", err);
    res.status(500).send("Server error");
  }
}

// Fetch a single workout by ID
async function fetchWorkoutById(req, res) {
  const id = req.params.id;
  if (!id) return res.status(400).send("Missing required id param!");

  try {
    const workout = await model.getWorkoutById(id);
    if (!workout) return res.status(404).send("Workout not found");
    res.json(workout);
  } catch (err) {
    console.error("Error fetching workout by ID:", err);
    res.status(500).send("Server error");
  }
}

// Delete a workout
async function removeWorkout(req, res) {
  const id = req.params.id;
  if (!id) return res.status(400).send("Missing required id param!");

  try {
    const deletedCount = await model.deleteWorkout(id);
    if (deletedCount === 0) return res.status(404).send("Workout not found");
    res.send(`Workout with id ${id} deleted successfully.`);
  } catch (err) {
    console.error("Error deleting workout:", err);
    res.status(500).send("Server error");
  }
}

// Create a new workout
async function createWorkout(req, res) {
  const { exercise, sets, reps, weight } = req.body;

  if (!exercise || !sets || !reps) {
    return res.status(400).send("Missing required workout fields!");
  }

  try {
    const newWorkout = await model.addWorkout(exercise, sets, reps, weight);
    res.status(201).json(newWorkout);
  } catch (err) {
    console.error("Error creating workout:", err);
    res.status(500).send("Server error");
  }
}

module.exports = {
  fetchAllWorkouts,
  fetchWorkoutById,
  removeWorkout,
  createWorkout,
};
