const Community = require("../models/community");

exports.addOrUpdateKey = async (req, res) => {
  const { communityId } = req.params;
  const keyData = req.body;

  try {
    const community = await Community.findById(communityId);
    if (!community) {
      return res
        .status(404)
        .json({ success: false, message: "Community not found" });
    }

    // Set or update the key information
    community.key = keyData;
    await community.save();

    res.status(200).json({ success: true, data: community.key });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// If you need to remove the key, you can add a removeKey function here
