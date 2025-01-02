const SevFivVideo = require("../model/SevFivModal"); // Ensure this path points to the correct model

module.exports = async (req, res) => {
  try {
    // Fetch all videos from the database
    const videos = await SevFivVideo.find();

    res.status(200).json({
      message: "Videos fetched successfully.",
      videos,
    });
  } catch (error) {
    console.error("Error fetching videos:", error);

    // Handle server error
    res.status(500).json({
      message: "An error occurred while fetching the videos.",
      error: error.message,
    });
  }
};
