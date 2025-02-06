const ExploreMore = require("../model/exploreMoreModel");
module.exports = async (req, res) => {
  try {
    const data = await ExploreMore.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch data", error });
  }
};
