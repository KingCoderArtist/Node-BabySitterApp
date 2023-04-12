const mongoose = require("mongoose");

const childSchema = new mongoose.Schema(
  {
    parentId: {
      type: String,
    },
    name: {
      type: String,
    },
    gender: {
      type: String,
    },
    date: {
      type: String,
    },
    allergies: {
      type: String,
    },
    notes: {
      type: String,
    },
    isChild: {
      default: false,
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Child", childSchema);
