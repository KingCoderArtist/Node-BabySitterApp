const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    sitterId: {
      type: String,
    },
    image: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    registerLocation: {
      type: String,
      required: true,
    },
    additionalLocation: {
      type: String,
    },
    childs: {
      type: Object,
    },
    pets: {
      type: Object,
    },
    house: {
      type: Object,
    },
    bookingNote: {
      type: Object,
    },
    status: {
      type: String,
      default: "New",
      enum: ["New", "Closed", "Accepted", "Current"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
