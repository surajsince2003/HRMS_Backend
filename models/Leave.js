const mongoose = require("mongoose");

const LeaveSchema = mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    leaveType: { type: String, required: true, enum: ['Sick Leave', 'Casual Leave', 'Paid Leave'] },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },

}, { timestamps: true });

module.exports = mongoose.model('Leave', LeaveSchema);