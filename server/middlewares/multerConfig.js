const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const sanitizedFilename = file.originalname.replace(/\s+/g, "-");
    cb(null, `${timestamp}-${sanitizedFilename}`);
  },
});

// Dosya türünü kontrol eden filtre
const fileFilter = (req, file, cb) => {
  // `file` parametresine doğru bir şekilde erişmek
  if (file.mimetype.startsWith("image/")) {
    cb(null, true); // Kabul edilen dosya türü
  } else {
    cb(new Error("Only image files are allowed!"), false); // Reddedilen dosya türü
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Maksimum dosya boyutu: 5 MB
});

module.exports = upload;
