const mongoose = require("mongoose");


const EmployeeSchema = mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: {type:Number,require:true,unique:true},
    employeeID: {type:Number,require:true,unique:true},
    position: { type: String, required: true },
    department: { type: String, required: true },
    doj: { type: Date, required: true },
    gender:{type:String,require:true},
    salary: { type: Number, required: true },

}, { timestamps: true });

module.exports = mongoose.model('Employee', EmployeeSchema);