const Leave = require("../models/Leave");
const Employee = require("../models/Employee");


const applyLeave = async (req, res) => {
    try {
        const { employeeId, leaveType, startDate, endDate, reason } = req.body;
        const employee = await Employee.findById(employeeId);
        if (!employee) return res.status(404).json({ message: "Employee not found" });

        const leave = new Leave({ employee: employeeId, leaveType, startDate, endDate, reason });
        await leave.save();

        res.status(201).json({ message: "Leave applied successfully", leave });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


const getAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate('employee','name email');
        res.status(200).json({ leaves });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getLeaveByEmployee = async (req, res) => {
    try {
        const leaves = await Leave.find({ employee: req.params.employeeId }).populate('employee', 'name email');
        if (!leaves.length) return res.status(404).json({ message: "No leave requests found for this employee" });

        res.status(200).json({ leaves });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateLeaveStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Approved', 'Rejected'].includes(status)) return res.status(400).json({ message: "Invalid status" });

        const leave = await Leave.findByIdAndUpdate(req.params.id, { status }, { new: true }).populate('employee', 'name email');
        if (!leave) return res.status(404).json({ message: "Leave request not found" });

        res.status(200).json({ message: `Leave ${status.toLowerCase()} successfully`, leave });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { applyLeave, getAllLeaves, getLeaveByEmployee, updateLeaveStatus }