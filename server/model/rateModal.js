const mongoose = require("mongoose");

const { Schema } = mongoose;

// Define the course schema
const rateSchema = new Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("RateCourse", rateSchema);
