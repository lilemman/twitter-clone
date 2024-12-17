const Notification = require("../models/notificationModel");
const User = require("../models/userModel");
exports.getUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }).select("-password");
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in getUserProfile: ", error.message);
  }
};

exports.followUnfollowUser = async (req, res) => {
  const { username } = req.params;

  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);
    if (id === req.user._id.toString()) {
      return res
        .status(400)
        .json({ error: "You can't follow/unfollow yourself" });
    }
    if (!userToModify || !currentUser) {
      return res.status(400).json({ error: "User not found" });
    }
    const isFollowing = currentUser.following.includes(id);
    if (isFollowing) {
      //unfollow user
      await User.findByIdAndUpdate(id, { $pull: { following: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      //TODO return id of user as a response
      res.status(200).json({ message: "Unfollowed successfully" });
    } else {
      //Follow user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      //send notification to the user
      const newNotification = new Notification({
        type: "follow",
        from: req.user._id,
        to: userToModify._id,
      });
      await newNotification.save();
      //TODO return id of user as a response
      res.status(200).json({
        message: "User followed successfully",
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in FollowUnfollowUser: ", error.message);
  }
};
