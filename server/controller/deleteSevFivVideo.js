const SevFivVideo = require("../model/SevFivModal"); // Ensure this path points to the correct model

module.exports = async (req, res) => {
  try {
    const { id } = req.params; // Video ID to delete

    // Find and delete the video by ID
    const deletedVideo = await SevFivVideo.findByIdAndDelete(id);

    if (!deletedVideo) {
      return res.status(404).json({
        message: "Video not found.",
      });
    }

    res.status(200).json({
      message: "Video deleted successfully.",
      video: deletedVideo,
    });
  } catch (error) {
    console.error("Error deleting video:", error);

    res.status(500).json({
      message: "An error occurred while deleting the video.",
      error: error.message,
    });
  }
};