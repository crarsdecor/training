const mongoose = require("mongoose");

const { Schema } = mongoose;

// Define the course schema
const SocialMediaModal = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    themeLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("SocialMedia", SocialMediaModal);
