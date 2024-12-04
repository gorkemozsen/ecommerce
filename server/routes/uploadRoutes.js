const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multerConfig");
const { uploadImage } = require("../controllers/uploadController");
const authMiddleware = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");

router.post("/", authMiddleware, isAdmin, upload.single("image"), uploadImage);

module.exports = router;
