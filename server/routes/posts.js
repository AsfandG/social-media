const {
  getFeedPosts,
  getUserPosts,
  likePost,
} = require("../controllers/posts");
const { verifyToken } = require("../middleware/auth");

const router = require("express").Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.patch("/:id/likePost", verifyToken, likePost);

module.exports = router;
