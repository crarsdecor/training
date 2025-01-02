const mongoose = require("mongoose");

const { Schema } = mongoose;

// Define the course schema
const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    bullet1: {
      type: String,
    },
    bullet2: {
      type: String,
    },
    bullet3: {
      type: String,
    },
    bullet4: {
      type: String,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("Course", courseSchema);
