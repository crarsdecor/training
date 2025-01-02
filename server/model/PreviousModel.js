const mongoose = require("mongoose");

const { Schema } = mongoose;

// Define the course schema
const PrevSchema = new Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Previous", PrevSchema);
