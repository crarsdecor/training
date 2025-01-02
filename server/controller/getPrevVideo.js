const Previous = require("../model/PreviousModel");
module.exports = async (req, res) => {
  try {
    const videos = await Previous.find({});

    // Save the new video to the database

    res.status(200).json({
      message: "Video fetched successfully.",
      videos, // Return the created video object
    });
  } catch (error) {
    console.error("Error fetching video:", error);

    // Handle server error
    res.status(500).json({
      message: "An error occurred while getching the video.",
      error: error.message,
    });
  }
};
