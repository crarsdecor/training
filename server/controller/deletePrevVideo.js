const Previous = require("../model/PreviousModel");
module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedVideo = await Previous.findByIdAndDelete(id);
    if (!deletedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.status(200).json({ message: "Video deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete video", error: err.message });
  }
};
