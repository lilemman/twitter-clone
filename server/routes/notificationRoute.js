const express = require("express");
const router = express.Router();
const { protectRoute } = require("../middleware/protectRoute");
const {
  getNotifications,
  deleteNotifications,
} = require("../controllers/notificationController");

router.route("/").get(protectRoute, getNotifications);
router.route("/").delete(protectRoute, deleteNotifications);
module.exports = router;
