const Previous = require("../model/PreviousModel");
module.exports = async (req, res) => {
  try {
    const { topic, link } = req.body;

    // Create a new video document and save to the database
    const newVideo = new Previous({
      topic,
      link,
    });

    // Save the new video to the database
    await newVideo.save();

    res.status(200).json({
      message: "Video added successfully.",
      video: newVideo, // Return the created video object
    });
  } catch (error) {
    console.error("Error adding video:", error);

    // Handle server error
    res.status(500).json({
      message: "An error occurred while adding the video.",
      error: error.message,
    });
  }
};
