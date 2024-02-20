const User = require("../models/user");

// Add Social to User
exports.addSocialToUser = async (req, res) => {
  const { userId } = req.params;
  const socialData = req.body;

  try {
    const user = await User.findById(userId);
    user.socials.push(socialData);
    await user.save();

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Remove Social from User
exports.removeSocialFromUser = async (req, res) => {
  const { userId, socialId } = req.params;

  try {
    const user = await User.findById(userId);
    user.socials.pull({ _id: socialId });
    await user.save();

    res.status(204).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
