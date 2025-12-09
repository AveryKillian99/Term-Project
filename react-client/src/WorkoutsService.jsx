import axios from "axios";

const API_URL = "http://localhost:5000/api/workouts";

export default {
  getWorkouts: () =>
    axios.get(API_URL, { withCredentials: true }),

  addWorkout: (workout) =>
    axios.post(API_URL, workout, { withCredentials: true }),

  deleteWorkout: (id) =>
    axios.delete(`${API_URL}/${id}`, { withCredentials: true }),

  getWorkoutById: (id) =>
    axios.get(`${API_URL}/${id}`, { withCredentials: true }),

  updateWorkout: (id, workout) =>
    axios.put(`${API_URL}/${id}`, workout, { withCredentials: true }),
};
