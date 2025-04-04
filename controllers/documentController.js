const Document = require('../models/Document');
const path = require('path');
const fs = require('fs');

// Upload File
const uploadDocument = async (req, res) => {
  try {
    const document = new Document({
      employeeId: req.user.id, // from auth middleware
      fileName: req.file.filename,
      filePath: req.file.path
    });

    await document.save();
    res.status(201).json({ message: 'Uploaded!', document });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// View My Documents
const getMyDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ employeeId: req.user.id });
    res.json(docs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const downloadDocument = async (req, res) => {
    try {
      const document = await Document.findById(req.params.id);
  
      if (!document) return res.status(404).json({ message: 'Document not found' });
  
      const filePath = path.resolve(document.filePath);
      res.download(filePath, document.fileName);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // 🗑️ Delete file
  const deleteDocument = async (req, res) => {
    try {
      const document = await Document.findById(req.params.id);
  
      if (!document) return res.status(404).json({ message: 'Document not found' });
  
      if (document.employeeId.toString() !== req.user.id)
        return res.status(403).json({ message: 'Unauthorized' });
  
      // Delete file from disk
      fs.unlinkSync(document.filePath);
  
      // Remove from DB
      await Document.findByIdAndDelete(req.params.id);
  
      res.json({ message: 'Document deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  module.exports = {uploadDocument,getMyDocuments,downloadDocument,deleteDocument}