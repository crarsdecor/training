const ExploreMore = require("../model/exploreMoreModel");
module.exports = async (req, res) => {
  try {
    console.log("working");
    const { contentType, link } = req.body;

    if (!contentType || !link) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContent = new ExploreMore({ contentType, link });
    await newContent.save();

    res
      .status(200)
      .json({ message: "Content added successfully", content: newContent });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
