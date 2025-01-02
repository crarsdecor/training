const CourseVideo = require("../model/CourseVideoModal");
module.exports = async (req, res) => {
  try {
    const videos = await CourseVideo.find({
      courseCategory: "Amazon",
      courseType: "Advanced",
    });
    res.status(200).json({ videos });
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ message: "Failed to fetch videos." });
  }
};
