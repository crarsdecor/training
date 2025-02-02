const SocialMedia = require("../model/SocialMediaMode");

module.exports = async (req, res) => {
  try {
    const content = await SocialMedia.find({});
    res.status(200).json({
      message: "Social media content found successfully.",
      content,
    });
  } catch (error) {
    console.error("Error finding social media content:", error);

    // Handle server error
    res.status(500).json({
      message: "An error occurred while finding the content.",
      error: error.message,
    });
  }
};
