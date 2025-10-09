import multer from 'multer'

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads"); // Directory where files are saved
  },
  filename: (req, file, callback) => {
    console.log("File received by Multer:", file); // Debugging
    callback(null, file.originalname);
  }
});

const upload = multer({ storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, callback) => {
    if (file.mimetype.startsWith("image/")) {
      callback(null, true);
    } else {
      callback(new Error("Only image files are allowed!"), false);
    }
  }
})
export default upload;