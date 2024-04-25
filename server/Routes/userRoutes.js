const express = require("express");
const {
  registerUser,
  authUser,
  allUsers,
  forgotPassword,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(registerUser)
router.post("/login", authUser);
router.put("/forgot", forgotPassword);

module.exports = router;
