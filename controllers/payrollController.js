const Salary = require("../models/Salary");
const Employee = require("../models/Employee");

const addSalary = async (req, res) => {
    try {
        const { employeeId, baseSalary, bonus, deductions, month, year } = req.body;

        const employee = await Employee.findById(employeeId);
        if (!employee) return res.status(404).json({ message: "Employee not found" });

        const totalSalary = baseSalary + bonus - deductions;
        const salary = new Salary({ employee: employeeId, baseSalary, bonus, deductions, totalSalary, month, year });
        await salary.save();

        res.status(201).json({ message: "Salary record added", salary });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSalaryByEmployee = async (req, res) => {
    try {
        const salaries = await Salary.find({ employee: req.params.employeeId }).populate('employee', 'name email');
        if (!salaries.length) return res.status(404).json({ message: "No salary records found" });

        res.status(200).json({ salaries });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllSalaries = async (req, res) => {
    try {
        const salaries = await Salary.find().populate('employee', 'name email');
        res.status(200).json({ salaries });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addSalary, getSalaryByEmployee, getAllSalaries }