const Upcoming = require("../model/Upcoming");
module.exports = async (req, res) => {
  const { topic, link, date, time } = req.body;

  if (!topic || !link || !date || !time) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newTraining = new Upcoming({ topic, link, date, time });
    await newTraining.save();
    res
      .status(201)
      .json({ message: "Training added successfully", training: newTraining });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add training", error: error.message });
  }
};
