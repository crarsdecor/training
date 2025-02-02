const SocialMedia = require("../model/SocialMediaMode");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedContent = await SocialMedia.findByIdAndDelete(id);

    if (!deletedContent) {
      return res.status(404).json({ message: "Content not found!" });
    }

    res.status(200).json({ message: "Content deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", error });
  }
};
