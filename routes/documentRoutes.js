const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const {
  uploadDocument,
  getMyDocuments,deleteDocument,downloadDocument
} = require('../controllers/documentController');


router.post('/upload', auth, upload.single('file'), uploadDocument);
router.get('/my-docs', auth, getMyDocuments);
router.get('/download/:id', auth, downloadDocument);
router.delete('/delete/:id', auth, deleteDocument);

module.exports = router;
