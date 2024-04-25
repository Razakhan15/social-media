const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  allPosts,
  uploadPost,
  likes,
  comments,
} = require("../controllers/postController");
const router = express.Router();

router.route("/").post(protect, uploadPost).get(protect, allPosts);
router.route("/like/:postId").post(likes);
router.route("/comment/:postId").post(protect, comments);

module.exports = router;
