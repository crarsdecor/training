const SocialMedia = require("../model/SocialMediaMode");

module.exports = async (req, res) => {
  try {
    const images = await SocialMedia.find({ type: "Theme" });
    res.status(200).json({
      message: "Themes found successfully.",
      images,
    });
  } catch (error) {
    console.error("Error finding themes:", error);

    // Handle server error
    res.status(500).json({
      message: "An error occurred while finding the themes.",
      error: error.message,
    });
  }
};
