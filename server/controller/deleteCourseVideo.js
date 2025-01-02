const CourseVideo = require("../model/CourseVideoModal");
module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedVideo = await CourseVideo.findByIdAndDelete(id);

    if (!deletedVideo) {
      return res.status(404).json({ message: "Video not found." });
    }

    res.status(200).json({ message: "Video deleted successfully." });
  } catch (error) {
    console.error("Error deleting video:", error);
    res.status(500).json({ message: "Failed to delete video." });
  }
};
