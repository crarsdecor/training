const SocialMedia = require("../model/SocialMediaMode");

module.exports = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedContent = await SocialMedia.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedContent) {
      return res.status(404).json({ message: "Content not found!" });
    }

    res
      .status(200)
      .json({ message: "Content updated successfully!", updatedContent });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!", error });
  }
};
