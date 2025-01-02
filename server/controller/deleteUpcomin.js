const Upcoming = require("../model/Upcoming");
module.exports = async (req, res) => {
  const { id } = req.params;

  try {
    const training = await Upcoming.findByIdAndDelete(id);
    if (!training) {
      return res.status(404).json({ message: "Training not found" });
    }
    res.status(200).json({ message: "Training deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete training", error: error.message });
  }
};
