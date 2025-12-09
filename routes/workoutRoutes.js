const express = require("express");
const router = express.Router();
const cors = require("cors");
const workoutController = require("../controllers/workoutController");

// CORS options
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true
};
router.use(cors(corsOptions));

// Ensure user is logged in
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated() && req.user) return next();
  res.status(401).json({ error: "Unauthorized" });
}
router.use(ensureAuthenticated);

router.get("/", workoutController.fetchAllWorkouts);
router.get("/:id", workoutController.fetchWorkoutById);
router.post("/", workoutController.createWorkout);
router.put("/:id", workoutController.updateWorkout);
router.delete("/:id", workoutController.removeWorkout);

module.exports = router;
