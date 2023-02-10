const router = require("express").Router();
const { login } = require("../controllers/auth.js");
const {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getUsers,
} = require("../controllers/User.js");
const { verifyToken } = require("../middleware/auth");

router.post("/login", login);
router.get("/", getUsers);
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

router.patch("/:id/:friendId", verifyToken, addRemoveFriend);
module.exports = router;
