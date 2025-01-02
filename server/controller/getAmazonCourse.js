const Course = require("../model/CourseModel");
module.exports = async (req, res) => {
  try {
    const amazon = await Course.find({ title: "Amazon" });

    // Respond with the tickets
    res.status(200).json({
      message: "Appointment fetched successfully.",
      amazon,
    });
  } catch (error) {
    console.error("Error fetching Appointment:", error);

    // Handle server error
    res.status(500).json({
      message: "An error occurred while fetching Appointment.",
      error: error.message,
    });
  }
};
