const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// 🛑 First, define the Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'hr', 'employee'], default: 'employee' },
}, { timestamps: true });

// ✅ Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// ✅ Export the model
module.exports = mongoose.model('User', userSchema);
