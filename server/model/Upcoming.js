const mongoose = require("mongoose");

const { Schema } = mongoose;

// Define the course schema
const upcSchema = new Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Upcoming", upcSchema);
