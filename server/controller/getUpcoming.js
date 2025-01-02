const Upcoming = require("../model/Upcoming");
module.exports = async (req, res) => {
  try {
    const trainings = await Upcoming.find();
    res.status(200).json({ trainings });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch trainings", error: error.message });
  }
};
