const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const { Schema } = mongoose;
const sevFivSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    videoId: {
      type: Number,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
sevFivSchema.plugin(autoIncrement, { inc_field: "videoId", start_seq: 1 });

module.exports = mongoose.model("Sevenfive", sevFivSchema);
