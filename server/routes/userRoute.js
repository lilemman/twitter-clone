const express = require("express");
const { protectRoute } = require("../middleware/protectRoute");
const {
  getUserProfile,
  followUnfollowUser,
  getSuggestedUsers,
  updateUser,
} = require("../controllers/userController");

const router = express.Router();
router.route("/profile/:username").get(protectRoute, getUserProfile);
router.route("/suggested").get(protectRoute, getSuggestedUsers);
router.route("/follow/:id").post(protectRoute, followUnfollowUser);
router.route("/update").post(protectRoute, updateUser);
module.exports = router;
