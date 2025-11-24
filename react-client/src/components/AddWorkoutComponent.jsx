import { useState } from "react";
import WorkoutsService from "../WorkoutsService";

const AddWorkoutComponent = ({ onAdd }) => {
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await WorkoutsService.addWorkout({ exercise, sets: Number(sets), reps: Number(reps), weight: weight ? Number(weight) : null });
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Exercise" value={exercise} onChange={(e) => setExercise(e.target.value)} required />
      <input placeholder="Sets" type="number" value={sets} onChange={(e) => setSets(e.target.value)} required />
      <input placeholder="Reps" type="number" value={reps} onChange={(e) => setReps(e.target.value)} required />
      <input placeholder="Weight (kg)" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddWorkoutComponent;
