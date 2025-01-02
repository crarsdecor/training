const Course = require("../model/CourseModel");
module.exports = async (req, res) => {
  try {
    const website = await Course.find({ title: "Website" });

    // Respond with the tickets
    res.status(200).json({
      message: "Appointment fetched successfully.",
      website,
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
