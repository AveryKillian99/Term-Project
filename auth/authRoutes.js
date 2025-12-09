const express = require('express');
const passport = require('passport');
const router = express.Router();
require('./passport'); // Import the passport setup

const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL || 'http://localhost:5173';

// Middleware to store return path
const saveReturnTo = (req, res, next) => {
  req.session.returnTo = req.query.returnTo || '/';
  next();
};

// 1️⃣ Start Google OAuth login
router.get(
  '/google',
  saveReturnTo,
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    keepSessionInfo: true,
  })
);

// 2️⃣ Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${CLIENT_BASE_URL}/login?error=true`,
    keepSessionInfo: true,
  }),
  (req, res) => {
    const returnTo = req.session.returnTo || '/profile';
    delete req.session.returnTo;
    res.redirect(`${CLIENT_BASE_URL}${returnTo}`);
  }
);

// 3️⃣ Get current user info
router.get('/me', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user); // full user object from deserializeUser
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

// 4️⃣ Logout
router.post('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ message: 'Error logging out' });
    req.session.destroy(sessionErr => {
      if (sessionErr) return res.status(500).json({ message: 'Error destroying session' });
      res.status(200).json({ message: 'Logged out successfully' });
    });
  });
});

module.exports = router;
