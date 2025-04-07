const Employee = require("../models/Employee");

const getDepartmentDistribution = async(req ,res)=>{

try {
    const distribution = await Employee.aggregate([{$group:{_id:'$department',count:{$sum:1}}}]);

res.status(200).json(distribution);

} catch (error) {
    res.status(500).json({ message: error.message });
}
}

module.exports = getDepartmentDistribution;