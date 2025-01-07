const express = require("express");
const { protectRoute } = require("../middleware/protectRoute");
const {
  createPost,
  likeUnlikePost,
  commentPost,
  deletePost,
  getAllPosts,
  getLikedPosts,
  getFollowingPosts,
  getUserPost,
} = require("../controllers/postController");
const { get } = require("mongoose");
const router = express.Router();

router.route("/all").get(protectRoute, getAllPosts);
router.route("/likes/:id").get(protectRoute, getLikedPosts);
router.route("/following").get(protectRoute, getFollowingPosts);
router.route("/user/:username").get(protectRoute, getUserPost);
router.route("/create").post(protectRoute, createPost);
router.route("/like/:id").post(protectRoute, likeUnlikePost);
router.route("/comment/:id").post(protectRoute, commentPost);
router.route("/").delete(protectRoute, deletePost);

module.exports = router;
