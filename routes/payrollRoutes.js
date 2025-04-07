const express = require('express');
const { addSalary, getSalaryByEmployee, getAllSalaries } = require('../controllers/payrollController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', authMiddleware, addSalary);
router.get('/employee/:employeeId', authMiddleware, getSalaryByEmployee);
router.get('/all', authMiddleware, getAllSalaries);

module.exports = router;
