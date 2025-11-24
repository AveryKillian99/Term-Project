import axios from "axios";

const API_URL = "http://localhost:5000/api/workouts";

export default {
  getWorkouts: () => axios.get(API_URL),
  addWorkout: (workout) => axios.post(API_URL, workout),
  deleteWorkout: (id) => axios.delete(`${API_URL}/${id}`),
  getWorkoutById: (id) => axios.get(`${API_URL}/${id}`)
};
