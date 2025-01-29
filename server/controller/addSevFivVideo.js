const SevFivVideo = require("../model/SevFivModal"); // Ensure this path points to the correct model

module.exports = async (req, res) => {
  try {
    const { title, link, courseCategory } = req.body;

    // Ensure the fields are provided
    if (!title || !link) {
      return res.status(400).json({
        message: "Title and link are required.",
      });
    }

    // Create a new video document and save to the database
    const newVideo = new SevFivVideo({
      title,
      link,
      courseCategory,
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
