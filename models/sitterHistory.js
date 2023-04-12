const mongoose = require("mongoose");

const SitterHistorySchema = new mongoose.Schema(
  {
    sitterId: {
      type: String,
    },
    sitterName: {
      type: String,
    },
    bookings: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SitterHistory", SitterHistorySchema);
