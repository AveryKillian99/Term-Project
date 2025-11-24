import { useState, useEffect } from 'react';
import WorkoutsService from '../WorkoutsService';

const WorkoutDetailComponent = ({ id, onClose }) => {
  const [workout, setWorkout] = useState(null);

  useEffect(() => {
    WorkoutsService.getWorkoutById(id).then(setWorkout);
  }, [id]);

  if (!workout) return <div>Loading...</div>;

  return (
    <div>
      <h3>{workout.name}</h3>
      <p>Type: {workout.type}</p>
      <p>Duration: {workout.duration} min</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default WorkoutDetailComponent;
