const express = require('express');
const { checkIn, checkOut, getAttendanceByEmployee,getMonthlyAttendanceReport } = require("../controllers/attendanceController");
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/checkin', authMiddleware, checkIn);
router.post('/checkout', authMiddleware, checkOut);
router.get('/employee/:employeeId', authMiddleware, getAttendanceByEmployee);
router.get('/report/:employeeId/:month/:year', authMiddleware, getMonthlyAttendanceReport);

module.exports = router;