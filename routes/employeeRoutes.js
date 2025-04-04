const express = require('express');
const { addEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee } = require("../controllers/employeeController");
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/add', authMiddleware, addEmployee);
router.get('/list', authMiddleware, getEmployees);
router.get('/:id', authMiddleware, getEmployeeById);
router.put('/:id', authMiddleware, updateEmployee);
router.delete('/:id', authMiddleware, deleteEmployee);

module.exports = router;
