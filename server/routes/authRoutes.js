const express = require("express");

const router = express.Router();
const { sigup, login, logout } = require("../controllers/authController");

router.route("/signup").post(sigup);
router.route("/login").post(login);
router.route("/logout").post(logout);

module.exports = router;
