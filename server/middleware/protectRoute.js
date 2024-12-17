const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

exports.protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt; // Safely access cookies

    // Check if token exists
    if (!token) {
      return res.status(401).json({ error: "Unauthorized: No Token Provided" });
    }

    // Decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized: Invalid Token" });
    }

    // Fetch the user from DB
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user; // Attach user to req object
    next();
  } catch (error) {
    console.error("Error during protectRoute middleware:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
