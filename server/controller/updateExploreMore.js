const ExploreMore = require("../model/exploreMoreModel");
module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const { contentType, link } = req.body;

    const updatedContent = await ExploreMore.findByIdAndUpdate(
      id,
      { contentType, link },
      { new: true }
    );

    if (!updatedContent) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.status(200).json({ message: "Content updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update content", error });
  }
};
