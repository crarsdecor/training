// const Ticket = require("../model/ticketModel");
const User = require("../model/userModel");

module.exports = async (req, res) => {
  try {
    // Fetch tickets for the given UID
    const allUsers = await User.find({ role: "user" });

    // Respond with the tickets
    res.status(200).json({
      message: "Tickets fetched successfully.",
      allUsers,
    });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({
      message: "An error occurred while fetching tickets.",
      error: error.message,
    });
  }
};
