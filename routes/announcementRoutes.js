const express = require('express');
const router = express.Router();
const { createAnnouncement, getAllAnnouncements, updateAnnouncement, deleteAnnouncement } = require('../controllers/announcementController');
const authMiddleware = require('../middleware/authMiddleware');

// ✅ Create Announcement (Only HR/Admin)
router.post('/add', authMiddleware, createAnnouncement);

// ✅ Get All Announcements
router.get('/', authMiddleware, getAllAnnouncements);

// ✅ Update Announcement (Only HR/Admin)
router.put('/update/:id', authMiddleware, updateAnnouncement);

// ✅ Delete Announcement (Only HR/Admin)
router.delete('/delete/:id', authMiddleware, deleteAnnouncement);

module.exports = router;
