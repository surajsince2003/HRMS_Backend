const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req ,file,cb)=>{
        cb(null, Date.now() + '-' + file.originalname);
    }

});

// File filter (only allow certain files)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
    const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase()) &&
                    allowedTypes.test(file.mimetype);
    if (isValid) cb(null, true);
    else cb(new Error('Only image, PDF, and DOC files are allowed'));
  };
  
  // Multer middleware
  const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max size
    fileFilter: fileFilter
  });
  
  module.exports = upload;