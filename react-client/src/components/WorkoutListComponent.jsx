import React, { useState, useEffect } from "react";
import WorkoutsService from "../WorkoutsService";
import AddWorkoutComponent from "./AddWorkoutComponent";
import "../index.css";

export default function WorkoutListComponent() {
  const [workouts, setWorkouts] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);

  // Fetch workouts for the logged-in user
  const fetchWorkouts = async () => {
    try {
      const res = await WorkoutsService.getWorkouts(); // backend filters by logged-in user
      setWorkouts(res.data || []);
    } catch (err) {
      console.error("Error fetching workouts:", err);
      setWorkouts([]);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingWorkout({ ...editingWorkout, [name]: value });
  };

  const handleSave = async () => {
    if (!editingWorkout.exercise || !editingWorkout.sets || !editingWorkout.reps) {
      alert("Please fill out Exercise, Sets, and Reps.");
      return;
    }

    try {
      await WorkoutsService.updateWorkout(editingWorkout.id, editingWorkout);
      setEditingWorkout(null);
      fetchWorkouts();
    } catch (err) {
      console.error("Error updating workout:", err);
      alert("Failed to update workout. Try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await WorkoutsService.deleteWorkout(id);
      if (editingWorkout?.id === id) setEditingWorkout(null);
      fetchWorkouts();
    } catch (err) {
      console.error("Error deleting workout:", err);
      alert("Failed to delete workout. Try again.");
    }
  };

  return (
    <div className="workout-container">
      <button className="btn btn-primary" onClick={() => setShowAdd(true)}>
        Add Workout
      </button>

      {showAdd && (
        <AddWorkoutComponent
          onAdd={() => {
            fetchWorkouts();
            setShowAdd(false);
          }}
          onCancel={() => setShowAdd(false)}
        />
      )}

      <ul className="workout-list">
        {workouts.map((w) => (
          <li
            key={w.id}
            className="workout-item"
            onClick={() => setEditingWorkout(w)}
          >
            <span className="workout-info">
              {w.exercise} — {w.sets} sets × {w.reps} reps{" "}
              {w.weight ? `(${w.weight} kg)` : ""}
            </span>
            <button
              className="btn btn-edit"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(w.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {editingWorkout && (
        <div className="workout-detail">
          <h3>Edit Workout</h3>
          <input
            name="exercise"
            value={editingWorkout.exercise}
            onChange={handleChange}
            placeholder="Exercise"
          />
          <input
            name="sets"
            type="number"
            value={editingWorkout.sets}
            onChange={handleChange}
            placeholder="Sets"
          />
          <input
            name="reps"
            type="number"
            value={editingWorkout.reps}
            onChange={handleChange}
            placeholder="Reps"
          />
          <input
            name="weight"
            type="number"
            value={editingWorkout.weight || ""}
            onChange={handleChange}
            placeholder="Weight (optional)"
          />
          <div className="form-buttons">
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
            <button
              className="btn btn-edit"
              onClick={() => setEditingWorkout(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
