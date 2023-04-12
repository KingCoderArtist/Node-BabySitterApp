const mongoose = require("mongoose");

const sitterSchema = new mongoose.Schema(
  {
    profilePic: {
      type: String,
      default: "",
    },
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
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phone: {
      type: Number,
    },
    gender: {
      type: String,
    },
    maiorAndSchool: {
      type: String,
    },
    highSchool: {
      type: String,
    },
    year: {
      type: String,
    },
    okayWithPets: {
      type: String,
    },
    hobbies: {
      type: String,
    },
    aboutBabySitting: {
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

sitterSchema.methods = {
  toAuthJSON: function () {
    return {
      _id: this._id,
      profilePic: this.profilePic,
      email: this.email,
      role: this.role,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      gender: this.gender,
      maiorAndSchool: this.maiorAndSchool,
      highSchool: this.highSchool,
      year: this.year,
      okayWithPets: this.okayWithPets,
      hobbies: this.hobbies,
      aboutBabySitting: this.aboutBabySitting,
      isVerified: this.isVerified,
      status: this.status,
      createdAt: this.createdAt,
    };
  },
};

module.exports = mongoose.model("Sitter", sitterSchema);
