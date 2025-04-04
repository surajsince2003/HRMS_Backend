const express = require('express');
const router = express.Router();
const { createReview, getEmployeeReviews, deleteReview } = require('../controllers/performanceController');
const authMiddleware = require('../middleware/authMiddleware');

// ✅ Create Performance Review (Only HR/Admin)
router.post('/add', authMiddleware, createReview);

// ✅ Get Employee's Performance Reviews
router.get('/my-reviews', authMiddleware, getEmployeeReviews);

// ✅ Delete Review (Only HR/Admin)
router.delete('/:id', authMiddleware, deleteReview);

module.exports = router;
