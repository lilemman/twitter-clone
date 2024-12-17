const express = require("express");

const router = express.Router();
const {
  signup,
  login,
  logout,
  getMe,
} = require("../controllers/authController");
const { protectRoute } = require("../middleware/protectRoute");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/me").get(protectRoute, getMe); // Protected Route: Middleware applied here

module.exports = router;
