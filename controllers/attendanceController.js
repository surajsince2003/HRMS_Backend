const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

const checkIn = async (req, res) => {
    try {
        const { employeeId } = req.body;

        const employee = await Employee.findById(employeeId);
        if (!employee) return res.status(404).json({ message: "Employee not found" });

        const today = new Date().toISOString().split('T')[0]; // Get current date
        const existingAttendance = await Attendance.findOne({ employee: employeeId, date: today });

        if (existingAttendance) return res.status(400).json({ message: "Already checked in today" });

        const checkInTime = new Date();
        const attendance = new Attendance({ 
            employee: employeeId, 
            checkIn: checkInTime, 
            date: today 
        });

        await attendance.save();
        res.status(201).json({ message: "Checked in successfully", attendance });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const checkOut = async (req, res) => {
    try {
        const { employeeId } = req.body;
        const today = new Date().toISOString().split('T')[0];

        const attendance = await Attendance.findOne({ employee: employeeId, date: today });

        if (!attendance || attendance.checkOut) return res.status(400).json({ message: "No active check-in found" });

        const checkOutTime = new Date();
        const workHours = (checkOutTime - attendance.checkIn) / (1000 * 60 * 60);

        attendance.checkOut = checkOutTime;
        attendance.workHours = workHours;

        if (workHours >= 8) {
            attendance.status = "Present";
        } else if (workHours >= 4) {
            attendance.status = "Half-Day";
        } else {
            attendance.status = "Absent";
        }

        await attendance.save();

        res.status(200).json({ message: "Checked out successfully", attendance });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const getAttendanceByEmployee =async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find({ employee: req.params.employeeId })
            .populate('employee', 'name email');

        if (!attendanceRecords.length) return res.status(404).json({ message: "No attendance records found" });

        res.status(200).json({ attendanceRecords });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getMonthlyAttendanceReport = async (req, res) => {
    try {
        const { employeeId, month, year } = req.params;

        const startDate = new Date(`${year}-${month}-01`);
        const endDate = new Date(year, month, 0);

        const attendanceRecords = await Attendance.find({
            employee: employeeId,
            date: { $gte: startDate, $lte: endDate }
        });

        const totalDays = attendanceRecords.length;
        const presentDays = attendanceRecords.filter(a => a.status === "Present").length;
        const halfDays = attendanceRecords.filter(a => a.status === "Half-Day").length;
        const absentDays = attendanceRecords.filter(a => a.status === "Absent").length;

        res.status(200).json({
            employeeId,
            month,
            year,
            totalDays,
            presentDays,
            halfDays,
            absentDays
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {checkIn,checkOut,getAttendanceByEmployee,getMonthlyAttendanceReport}