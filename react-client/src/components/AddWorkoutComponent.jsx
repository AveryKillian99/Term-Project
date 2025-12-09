import React, { useState } from "react";
import WorkoutsService from "../WorkoutsService";
import "../index.css";

const AddWorkoutComponent = ({ onAdd, onCancel }) => {
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!exercise || !sets || !reps) {
      alert("Please fill out Exercise, Sets, and Reps.");
      return;
    }

    try {
      // Send workout data to backend (server attaches googleid automatically)
      await WorkoutsService.addWorkout({
        exercise,
        sets: Number(sets),
        reps: Number(reps),
        weight: weight ? Number(weight) : null
      });

      // Reset form and call onAdd callback to refresh list
      setExercise("");
      setSets("");
      setReps("");
      setWeight("");
      onAdd();
    } catch (err) {
      console.error("Error adding workout:", err);
      alert("Failed to add workout. Try again.");
    }
  };

  return (
    <div className="add-workout-form">
      <input
        placeholder="Exercise"
        value={exercise}
        onChange={(e) => setExercise(e.target.value)}
      />
      <input
        placeholder="Sets"
        type="number"
        value={sets}
        onChange={(e) => setSets(e.target.value)}
      />
      <input
        placeholder="Reps"
        type="number"
        value={reps}
        onChange={(e) => setReps(e.target.value)}
      />
      <input
        placeholder="Weight (kg)"
        type="number"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      <div className="form-buttons">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Add
        </button>
        <button className="btn btn-edit" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddWorkoutComponent;
