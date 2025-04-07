const express = require('express');
const router = express.Router();
const getDepartmentDistribution  = require('../controllers/analyticsController');
const authMiddleware = require('../middleware/authMiddleware');

// ✅ Get Department Distribution
router.get('/department-distribution', authMiddleware, getDepartmentDistribution);

module.exports = router;
