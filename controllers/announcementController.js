const Announcement = require("../models/Announcement");

const createAnnouncement = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and Content are required" });
        }

        const newAnnouncement = new Announcement({
            title,
            content,
            createdBy: req.user.id
        });

        await newAnnouncement.save();
        res.status(201).json({ message: "Announcement Created", newAnnouncement });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ createdAt: -1 });
        res.status(200).json(announcements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateAnnouncement = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedAnnouncement = await Announcement.findByIdAndUpdate(req.params.id,
            { title, content },
            { new: true }
        );

        if (!updatedAnnouncement) return res.status(404).json({ message: "Announcement not found" });

        res.status(200).json({ message: "Announcement Updated", updatedAnnouncement });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const deleteAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.findByIdAndDelete(req.params.id);
        if (!announcement) return res.status(404).json({ message: "Announcement not found" });

        res.status(200).json({ message: "Announcement Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { createAnnouncement, getAllAnnouncements, updateAnnouncement, deleteAnnouncement }