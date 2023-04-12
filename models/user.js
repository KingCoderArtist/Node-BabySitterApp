const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    role: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  autheticate: function (plainpassword) {
    return this.securePassword(plainpassword) === this.encry_password;
  },

  securePassword: function (plainpassword) {
    if (!plainpassword) return "";
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },

  generateJWT: function () {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        role: this.role,
        exp: parseInt(exp.getTime() / 1000),
      },
      process.env.JWT_SECRET
    );
  },

  toAuthJSON: function () {
    return {
      _id: this._id,
      email: this.email,
      role: this.role,
      createdAt: this.createdAt,
    };
  },
};

module.exports = mongoose.model("User", userSchema);
