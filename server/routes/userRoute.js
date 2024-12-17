const express = require("express");
const { protectRoute } = require("../middleware/protectRoute");
const {
  getUserProfile,
  followUnfollowUser,
} = require("../controllers/userController");

const router = express.Router();
router.route("/profile/:username").get(protectRoute, getUserProfile);
router.route("/suggested").get(protectRoute, getUserProfile);
router.route("/follow/:id").post(protectRoute, followUnfollowUser);
//router.route("/update").post(protectRoute, updateUserProfile);
module.exports = router;
