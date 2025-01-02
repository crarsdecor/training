const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const { Schema } = mongoose;

const courseVideoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    courseCategory: {
      type: String,
      required: true,
    },
    courseType: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    courseVideoId: {
      type: Number,
      unique: true,
    },
    users: {
      type: [
        {
          name: {
            type: String,
            required: true,
          },
        },
      ],
      default: [], // Default to an empty array
    },
  },
  {
    timestamps: true,
  }
);

courseVideoSchema.plugin(autoIncrement, {
  inc_field: "courseVideoId",
  start_seq: 1,
});

module.exports = mongoose.model("CourseVideo", courseVideoSchema);
