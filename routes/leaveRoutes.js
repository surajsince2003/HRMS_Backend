const express = require('express');
const { applyLeave, getAllLeaves, getLeaveByEmployee, updateLeaveStatus } = require('../controllers/leaveController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/apply', authMiddleware, applyLeave);
router.get('/list', authMiddleware, getAllLeaves);
router.get('/employee/:employeeId', authMiddleware, getLeaveByEmployee);
router.put('/status/:id', authMiddleware, updateLeaveStatus);

module.exports = router;
