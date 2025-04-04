const Performance = require('../models/Performance');

// Create Performance Review (Only HR/Admin)
const createReview = async (req, res) => {
    try {
        const { employeeId, rating, feedback } = req.body;

        if (!employeeId || !rating || !feedback) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newReview = new Performance({
            employeeId,
            rating,
            feedback,
            reviewedBy: req.user.id
        });

        await newReview.save();
        res.status(201).json({ message: "Performance Review Added", newReview });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get Employee's Performance Reviews
const getEmployeeReviews = async (req, res) => {
    try {
        const reviews = await Performance.find({ employeeId: req.user.id });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete Performance Review (Only Admin/HR)
const deleteReview = async (req, res) => {
    try {
        const review = await Performance.findByIdAndDelete(req.params.id);
        if (!review) return res.status(404).json({ message: "Review Not Found" });

        res.status(200).json({ message: "Performance Review Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = {createReview,getEmployeeReviews,deleteReview};