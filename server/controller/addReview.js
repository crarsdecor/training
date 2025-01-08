const RateCourse = require("../model/rateModal");

module.exports = async (req, res) => {
  try {
    const { rating, userName, message, courseName } = req.body;

    if (!rating || !userName || !message || !courseName) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Save the review to the database
    const newReview = new RateCourse({
      rating,
      userName,
      message,
      courseName,
    });

    await newReview.save();

    res.status(200).json({
      message: "Review added successfully.",
      review: newReview,
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({
      message: "An error occurred while saving the review.",
    });
  }
};
