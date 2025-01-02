const CourseVideo = require("../model/CourseVideoModal");

// Add user to a specific course video
module.exports = async (req, res) => {
  try {
    const { name, videoId } = req.body; // User name from the request body
    // Validate the input
    if (!name) {
      return res.status(400).json({ message: "User name is required." });
    }
    // // Find the video by ID
    const video = await CourseVideo.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found." });
    }
    // Add the new user name to the users array
    video.users.push({ name });
    // Save the updated video document
    await video.save();
    res.status(200).json({
      message: "User added successfully.",
    });
  } catch (error) {
    console.error("Error adding user to course video:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
