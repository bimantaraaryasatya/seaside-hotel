const multer = require('multer');
const path = require('path');

// Path folder tempat menyimpan gambar, misal 'public/room_images'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'public', 'room_images'));
  },
  filename: (req, file, cb) => {
    // Buat nama unik: timestamp + original filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `${uniqueSuffix}${ext}`);
  }
});

const uploadFile = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024  // Max 2MB
  },
  fileFilter: (req, file, cb) => {
    // Validasi hanya file gambar
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    
    if(mimetype && extname){
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  }
});

module.exports = uploadFile;
