import { useState, useEffect } from 'react';
import WorkoutListComponent from './WorkoutListComponent';
import AddWorkoutComponent from './AddWorkoutComponent';
import QuoteComponent from './QuoteComponent';

export default function DashboardComponent() {
  const [workouts, setWorkouts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchWorkouts = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/workouts`);
    const data = await res.json();
    setWorkouts(data);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div className="container">
      <h1>Workout Dashboard</h1>
      <QuoteComponent />
      <button onClick={() => setShowModal(true)}>Add Workout</button>

      {showModal && (
        <AddWorkoutComponent
          closeModal={() => setShowModal(false)}
          refreshWorkouts={fetchWorkouts}
        />
      )}

      <WorkoutListComponent workouts={workouts} />
    </div>
  );
}
