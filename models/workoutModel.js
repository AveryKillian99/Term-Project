"use strict";
const pool = require("./db");

// Get all workouts
async function getAllWorkouts() {
  const queryText = "SELECT * FROM workouts";
  const result = await pool.query(queryText);
  return result.rows;
}

// Get a workout by ID
async function getWorkoutById(id) {
  const queryText = "SELECT * FROM workouts WHERE id = $1";
  const result = await pool.query(queryText, [id]);
  return result.rows[0];
}

// Delete a workout
async function deleteWorkout(id) {
  const queryText = "DELETE FROM workouts WHERE id = $1";
  const result = await pool.query(queryText, [id]);
  return result.rowCount;
}

// Add a workout
async function addWorkout(exercise, sets, reps, weight) {
  const queryText = `
    INSERT INTO workouts (exercise, sets, reps, weight)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  const result = await pool.query(queryText, [exercise, sets, reps, weight]);
  return result.rows[0];
}

// **Named exports**
module.exports = {
  getAllWorkouts,
  getWorkoutById,
  deleteWorkout,
  addWorkout,
};
