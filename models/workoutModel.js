"use strict";
const pool = require("./db");

// Get all workouts for the logged-in user
async function getAllWorkouts(userGoogleId) {
  const queryText = "SELECT * FROM workouts WHERE googleid = $1";
  const result = await pool.query(queryText, [userGoogleId]);
  return result.rows;
}

// Get a workout by ID and user
async function getWorkoutById(id, userGoogleId) {
  const queryText = "SELECT * FROM workouts WHERE id = $1 AND googleid = $2";
  const result = await pool.query(queryText, [id, userGoogleId]);
  return result.rows[0];
}

// Delete a workout
async function deleteWorkout(id, userGoogleId) {
  const queryText = "DELETE FROM workouts WHERE id = $1 AND googleid = $2";
  const result = await pool.query(queryText, [id, userGoogleId]);
  return result.rowCount;
}

// Add a workout
async function addWorkout({ exercise, sets, reps, weight, googleid }) {
  const queryText = `
    INSERT INTO workouts (exercise, sets, reps, weight, googleid)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const result = await pool.query(queryText, [exercise, sets, reps, weight, googleid]);
  return result.rows[0];
}

// Update a workout
async function updateWorkout(id, { exercise, sets, reps, weight, googleid }) {
  const queryText = `
    UPDATE workouts
    SET exercise = $1, sets = $2, reps = $3, weight = $4
    WHERE id = $5 AND googleid = $6
    RETURNING *
  `;
  const result = await pool.query(queryText, [exercise, sets, reps, weight, id, googleid]);
  return result.rows[0]; // undefined if not found
}

module.exports = {
  getAllWorkouts,
  getWorkoutById,
  deleteWorkout,
  addWorkout,
  updateWorkout,
};
