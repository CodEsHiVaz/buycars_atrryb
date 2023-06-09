const { Router } = require("express");
const signup = require("../controllers/auth/signupController");
const login = require("../controllers/auth/loginController");
const isAuth = require("../middlewares/auth/isAuth");
const imageUploadHandler = require("../middlewares/imageupload/imageUpload");
const {
  geetOemCount,
  getOemSpecs,
  postOemSpec,
  getSingleOemSpecs,
} = require("../controllers/OEM/oemSpecsController");

const {
  getInventry,
  postInventry,
  getSingleInventry,
  deleteInventory,
  updateInventory,
} = require("../controllers/inventry/inventryComtroller");
const upload = require("../middlewares/imageupload/multer");

const router = Router();
router.post("/auth/login", login);
router.post("/auth/signup", signup);

router.post("/oem/create", isAuth, postOemSpec);
router.get("/oem/", isAuth, getOemSpecs);
router.get("/oem/getoemCount", isAuth, geetOemCount);
router.get("/oem/:id", isAuth, getSingleOemSpecs);

router.post(
  "/inventry/create",
  isAuth,
  upload.single("image"),
  imageUploadHandler,
  postInventry
);
router.get("/inventry", isAuth, getInventry);
router.get("/inventry/:id", isAuth, getSingleInventry);
router.patch("/inventry/update/:id", isAuth, updateInventory);
router.post("/inventry/delete", isAuth, deleteInventory);

module.exports = router;
