const Employee = require("../models/Employee");


const addEmployee = async (req, res) => {

    try {
        const { name, email, position, department, salary } = req.body;
        let employee = await Employee.findOne({ email });
        if (employee) return res.status(400).json({ message: "Employee already exists" });
        employee = new Employee({ name, email, position, department, salary });

        await employee.save();

        res.status(201).json({ message: "Employee added successfully", employee });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json({ employees });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getEmployeeById = async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) return res.status(404).json({ message: "Employee not found" });

        res.status(200).json({ employee });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateEmployee = async (req, res) => {
    try {
        const { name, email, position, department, salary } = req.body;
        const employee = await Employee.findByIdAndUpdate(req.params.id, { name, email, position, department, salary }, { new: true });

        if (!employee) return res.status(404).json({ message: "Employee not found" });

        res.status(200).json({ message: "Employee updated successfully", employee });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ message: "Employee not found" });

        res.status(200).json({ message: "Employee deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { addEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee };