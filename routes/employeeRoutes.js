const express = require('express');
const { addEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee } = require("../controllers/employeeController");
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require("../middleware/roleMiddleware");
const router = express.Router();


const allowedRoles = ['admin', 'hr'];

router.post('/add', authMiddleware,roleMiddleware(allowedRoles),addEmployee);
router.get('/list', authMiddleware, getEmployees);
router.get('/:id', authMiddleware, getEmployeeById);
router.put('/:id', authMiddleware, updateEmployee);
router.delete('/:id', authMiddleware, deleteEmployee);

module.exports = router;
