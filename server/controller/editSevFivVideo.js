const SevFivVideo = require("../model/SevFivModal"); // Ensure this path points to the correct model

module.exports = async (req, res) => {
  try {
    const { id } = req.params; // Video ID to update
    const { title, link } = req.body; // Updated data

    // Ensure the fields are provided
    if (!title || !link) {
      return res.status(400).json({
        message: "Title and link are required.",
      });
    }

    // Find the video by ID and update it
    const updatedVideo = await SevFivVideo.findByIdAndUpdate(
      id,
      { title, link },
      { new: true } // Return the updated document
    );

    if (!updatedVideo) {
      return res.status(404).json({
        message: "Video not found.",
      });
    }

    res.status(200).json({
      message: "Video updated successfully.",
      video: updatedVideo,
    });
  } catch (error) {
    console.error("Error updating video:", error);

    res.status(500).json({
      message: "An error occurred while updating the video.",
      error: error.message,
    });
  }
};