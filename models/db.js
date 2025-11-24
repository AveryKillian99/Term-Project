// db.js
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Needed for Neon/Postgres
  },
});

// Create workouts table on startup if it doesn't exist
const createWorkoutsTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS workouts (
      id SERIAL PRIMARY KEY,
      exercise TEXT NOT NULL,
      sets INT NOT NULL,
      reps INT NOT NULL,
      weight NUMERIC,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log('Workouts table created or already exists');
  } catch (err) {
    console.error('Error creating workouts table:', err);
  }
};

// Run table creation when module loads
createWorkoutsTable();

module.exports = pool;
