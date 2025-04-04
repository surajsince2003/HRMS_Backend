// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Example: Only Admins can access this route
router.get('/admin-dashboard', authMiddleware, roleMiddleware('Admin'), (req, res) => {
  res.send('Welcome to the Admin Dashboard');
});

module.exports = router;
