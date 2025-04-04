const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    date: { type: Date, required: true, default: Date.now },
    checkIn: { type: Date, required: false },
    checkOut: { type: Date, required: false },
    workHours: { type: Number, default: 0 },
    status: { type: String, enum: ["Absent", "Present", "Half-Day"], default: "Absent" } // New field
}, { timestamps: true });

module.exports = mongoose.model('Attendance', AttendanceSchema);
