const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    fullName: {
      type: String,
    },
    spouseName: {
      type: String,
    },
    address: {
      type: Array,
    },
    phone: {
      type: Number,
    },
    childrens: {
      type: Array,
    },
    pets: {
      type: String,
    },
    referral: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "Pending",
      enum: ["Pending", "Accepted"],
    },
  },
  { timestamps: true }
);

parentSchema.methods = {
  toAuthJSON: function () {
    return {
      _id: this._id,
      email: this.email,
      role: this.role,
      fullName: this.fullName,
      spouseName: this.spouseName,
      address: this.address,
      phone: this.phone,
      childrens: this.childrens,
      pets: this.pets,
      referral: this.referral,
      isVerified: this.isVerified,
      status: this.status,
      createdAt: this.createdAt,
    };
  },
};

module.exports = mongoose.model("Parent", parentSchema);
