const CourseVideo = require("../model/CourseVideoModal");
module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, courseCategory, courseType, link } = req.body;

    const updatedVideo = await CourseVideo.findByIdAndUpdate(
      id,
      { title, courseCategory, courseType, link },
      { new: true } // Return the updated document
    );

    if (!updatedVideo) {
      return res.status(404).json({ message: "Video not found." });
    }

    res
      .status(200)
      .json({ message: "Video updated successfully.", video: updatedVideo });
  } catch (error) {
    console.error("Error updating video:", error);
    res.status(500).json({ message: "Failed to update video." });
  }
};
