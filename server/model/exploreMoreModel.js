const mongoose = require("mongoose");

const { Schema } = mongoose;

// Define the course schema
const exploreModel = new Schema(
  {
    link: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Explore", exploreModel);
