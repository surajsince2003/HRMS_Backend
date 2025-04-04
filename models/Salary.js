const mongoose = require("mongoose");

const SalarySchema = new mongoose.Schema({
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    baseSalary: { type: Number, required: true },
    bonus: { type: Number, default: 0 },
    deductions: { type: Number, default: 0 },
    totalSalary: { type: Number, required: true },
    month: { type: String, required: true },
    year: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Salary', SalarySchema);