const userModel = require('../models/userModel');

// Get the current logged-in user (from session)
async function getCurrentUser(req, res) {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const user = await userModel.getUserById(req.user.googleid);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// Optionally: get all users (for admin view)
async function getAllUsers(req, res) {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = {
  getCurrentUser,
  getAllUsers,
};
