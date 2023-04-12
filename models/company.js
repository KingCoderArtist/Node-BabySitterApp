const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
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
    typeOfBusiness: {
      type: String,
    },
    phone: {
      type: Number,
    },
    zipCode: {
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

companySchema.methods = {
  toAuthJSON: function () {
    return {
      _id: this._id,
      email: this.email,
      role: this.role,
      fullName: this.fullName,
      typeOfBusiness: this.typeOfBusiness,
      phone: this.phone,
      zipCode: this.zipCode,
      isVerified: this.isVerified,
      status: this.status,
      createdAt: this.createdAt,
    };
  },
};

module.exports = mongoose.model("Company", companySchema);
