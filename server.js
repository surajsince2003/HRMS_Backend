const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const adminRoutes = require('./routes/adminRoutes');

dotenv.config();
connectDB();


app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

app.use('/api/admin', adminRoutes);
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/employees', require('./routes/employeeRoutes'));
app.use('/api/leaves', require('./routes/leaveRoutes'));
app.use('/api/attendance',require("./routes/attendanceRoutes"));
app.use('/api/performance',require('./routes/performanceRoutes'));
app.use('/api/announcements',require('./routes/announcementRoutes'));
app.use('/api/documents', require('./routes/documentRoutes'));



app.listen(process.env.PORT,()=>console.log("Server is listing"));