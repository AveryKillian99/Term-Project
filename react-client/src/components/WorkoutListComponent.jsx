import { useState, useEffect } from "react";
import WorkoutsService from "../WorkoutsService";
import AddWorkoutComponent from "./AddWorkoutComponent";

const WorkoutListComponent = () => {
  const [workouts, setWorkouts] = useState([]);
  const [showAdd, setShowAdd] = useState(false);

  const fetchWorkouts = async () => {
    try {
      const res = await WorkoutsService.getWorkouts();
      setWorkouts(res.data || []);
    } catch (err) {
      console.error("Error fetching workouts:", err);
      setWorkouts([]); // fallback to empty array
    }
  };

  useEffect(() => { fetchWorkouts(); }, []);

  return (
    <div>
      <h2>Workouts</h2>
      <button onClick={() => setShowAdd(true)}>Add Workout</button>

      {showAdd && (
        <AddWorkoutComponent
          onAdd={() => { fetchWorkouts(); setShowAdd(false); }}
        />
      )}

      <ul>
        {(workouts || []).map((w) => (
          <li key={w.id}>
            {w.exercise} — {w.sets} sets × {w.reps} reps {w.weight ? `(${w.weight} kg)` : ""}
            <button onClick={() => alert(JSON.stringify(w, null, 2))}>View</button>
            <button onClick={() => WorkoutsService.deleteWorkout(w.id).then(fetchWorkouts)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutListComponent;
