const multer = require("multer");
const path = require("path");
let storage = multer.diskStorage({
  destination: path.join(__dirname, "../../../temp"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
 const  upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/png"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      cb(new Error("Only jpeg,  jpg , png, and gif Image allow"));
    }
  },
});

module.exports = upload