const express = require("express");
const router = express.Router();
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
};
router.use(cors(corsOptions));

const workoutController = require("../controllers/workoutController");

router.get("/", workoutController.fetchAllWorkouts);
router.get("/:id", workoutController.fetchWorkoutById);
router.delete("/:id", workoutController.removeWorkout);
router.post("/", workoutController.createWorkout);

module.exports = router;
