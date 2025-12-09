"use strict";
const model = require("../models/workoutModel");

// Fetch all workouts for logged-in user
async function fetchAllWorkouts(req, res) {
  try {
    const workouts = await model.getAllWorkouts(req.user.googleid);
    res.json(workouts);
  } catch (err) {
    console.error("Error fetching workouts:", err);
    res.status(500).send("Server error");
  }
}

async function fetchWorkoutById(req, res) {
  const id = req.params.id;
  try {
    const workout = await model.getWorkoutById(id, req.user.googleid);
    if (!workout) return res.status(404).send("Workout not found");
    res.json(workout);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

async function removeWorkout(req, res) {
  const id = req.params.id;
  try {
    const deletedCount = await model.deleteWorkout(id, req.user.googleid);
    if (deletedCount === 0) return res.status(404).send("Workout not found");
    res.send(`Workout with id ${id} deleted successfully.`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

async function createWorkout(req, res) {
  const { exercise, sets, reps, weight } = req.body;
  if (!exercise || !sets || !reps) return res.status(400).send("Missing fields");

  try {
    const newWorkout = await model.addWorkout({
      exercise,
      sets,
      reps,
      weight,
      googleid: req.user.googleid
    });
    res.status(201).json(newWorkout);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

async function updateWorkout(req, res) {
  const id = req.params.id;
  const { exercise, sets, reps, weight } = req.body;

  try {
    const updatedWorkout = await model.updateWorkout(id, {
      exercise,
      sets,
      reps,
      weight,
      googleid: req.user.googleid
    });
    if (!updatedWorkout) return res.status(404).send("Workout not found");
    res.json(updatedWorkout);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}

module.exports = {
  fetchAllWorkouts,
  fetchWorkoutById,
  removeWorkout,
  createWorkout,
  updateWorkout,
};
