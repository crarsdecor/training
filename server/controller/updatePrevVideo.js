const Previous = require("../model/PreviousModel");
module.exports = async (req, res) => {
  console.log("working");
  const { id } = req.params;
  const { topic, link } = req.body;

  if (!topic || !link) {
    return res.status(400).json({ message: "Topic and link are required" });
  }

  try {
    const updatedVideo = await Previous.findByIdAndUpdate(
      id,
      { topic, link },
      { new: true }
    );
    if (!updatedVideo) {
      return res.status(404).json({ message: "Video not found" });
    }
    res
      .status(200)
      .json({ message: "Video updated successfully", updatedVideo });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update video", error: err.message });
  }
};
