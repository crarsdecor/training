const mongoose = require("mongoose");
const mongooseSequence = require("mongoose-sequence")(mongoose);

const { Schema, model } = mongoose;

const reviewSchema = new Schema({
  comment: {
    type: String,
    default: "",
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: null,
  },
});

const appointmentSchema = new Schema({
  appointmentId: {
    type: Number,
  },
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  enrollment: {
    type: String,
    required: true,
  },
  manager: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  userReview: reviewSchema,
  managerReview: reviewSchema,
  ad: String,
  status: {
    type: String,
    default: "Pending",
  },
});

appointmentSchema.plugin(mongooseSequence, { inc_field: "appointmentId" });

const Appointment = model("Appointment", appointmentSchema);
module.exports = Appointment;
