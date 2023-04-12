const User = require("../models/user");
const Token = require("../models/token");
const Company = require("../models/company");
const Parent = require("../models/parent");
const Sitter = require("../models/sitter");
const passport = require("passport");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const async = require("async");
const path = require("path");

const smtpTransport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nss.143121@gmail.com",
    pass: "nsns@#$86278",
  },
});

exports.signup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: 422,
      message: errors.array()[0].msg,
    });
  }
  // if (req.body.role === "company") {
  //   const { fullName, typeOfBusiness, phone, zipCode } = req.body;
  //   if (!fullName || !typeOfBusiness || !phone || isNaN(phone) || !zipCode) {
  //     return res.status(422).json({
  //       status: 422,
  //       message: `all field's is required`,
  //     });
  //   }
  // }
  // if (req.body.role === "parent") {
  //   const {
  //     fullName,
  //     spouseName,
  //     address,
  //     phone,
  //     childrens,
  //     pets,
  //     referral,
  //   } = req.body;
  //   if (
  //     !fullName ||
  //     !spouseName ||
  //     !address ||
  //     !phone ||
  //     isNaN(phone) ||
  //     !childrens ||
  //     !pets ||
  //     !referral
  //   ) {
  //     return res.status(422).json({
  //       status: 422,
  //       message: `all field's is required`,
  //     });
  //   }
  // }
  // if (req.body.role === "sitter") {
  //   const {
  //     firstName,
  //     lastName,
  //     phone,
  //     gender,
  //     maiorAndSchool,
  //     highSchool,
  //     year,
  //     okayWithPets,
  //     hobbies,
  //     aboutBabySitting,
  //   } = req.body;
  //   if (
  //     !firstName ||
  //     !lastName ||
  //     !phone ||
  //     isNaN(phone) ||
  //     !gender ||
  //     !maiorAndSchool ||
  //     !highSchool ||
  //     !year ||
  //     !okayWithPets ||
  //     !hobbies ||
  //     !aboutBabySitting
  //   ) {
  //     return res.status(422).json({
  //       status: 422,
  //       message: `all field's is required`,
  //     });
  //   }
  // }

  const user = new User(req.body);
  try {
    await user.save();
    if (user.role === "company") {
      const company = new Company(req.body);
      company._id = user._id;
      try {
        await company.save();
        const userToken = new Token({
          _userId: company._id,
          token: crypto.randomBytes(3).toString("hex"),
        });
        try {
          await userToken.save();
          const mailOptions = {
            from: "nss.143121@gmail.com",
            to: user.email,
            subject: "Account Verification Token",
            text:
              "Hello,\n\n" +
              "Please verify your account by OTP: \n" +
              userToken.token +
              ".\n",
          };
          smtpTransport.sendMail(mailOptions, function (err) {
            if (err) {
              return res.status(500).send({ message: err.message });
            }
            res.status(201).send({
              status: 201,
              message: "we have sent an OTP to your email",
              user: company.toAuthJSON(),
            });
          });
        } catch (error) {
          res
            .status(500)
            .send({ status: 500, message: `something wen't wrong` });
        }
      } catch (error) {
        res.status(500).send({ status: 500, error: error });
      }
    }
    if (user.role === "parent") {
      const parent = new Parent(req.body);
      parent._id = user._id;
      try {
        await parent.save();
        const userToken = new Token({
          _userId: parent._id,
          token: crypto.randomBytes(3).toString("hex"),
        });
        try {
          await userToken.save();
          const mailOptions = {
            from: "nss.143121@gmail.com",
            to: user.email,
            subject: "Account Verification Token",
            text:
              "Hello,\n\n" +
              "Please verify your account by OTP: \n" +
              userToken.token +
              ".\n",
          };
          smtpTransport.sendMail(mailOptions, function (err) {
            if (err) {
              return res.status(500).send({ message: err.message });
            }
            res.status(201).send({
              status: 201,
              message: "we have sent an OTP to your email",
              user: parent.toAuthJSON(),
            });
          });
        } catch (error) {
          res
            .status(500)
            .send({ status: 500, message: `something wen't wrong` });
        }
      } catch (error) {
        res.status(500).send({ status: 500, error: error });
      }
    }
    if (user.role === "sitter") {
      const image =
        req.file === undefined ? "" : req.headers.host + "/" + req.file.path;
      const sitter = new Sitter(req.body);
      sitter._id = user._id;
      sitter.profilePic = image;
      try {
        await sitter.save();
        const userToken = new Token({
          _userId: sitter._id,
          token: crypto.randomBytes(3).toString("hex"),
        });
        try {
          await userToken.save();
          const mailOptions = {
            from: "nss.143121@gmail.com",
            to: user.email,
            subject: "Account Verification Token",
            text:
              "Hello,\n\n" +
              "Please verify your account by OTP: \n" +
              userToken.token +
              ".\n",
          };
          smtpTransport.sendMail(mailOptions, function (err) {
            if (err) {
              return res.status(500).send({ message: err.message });
            }
            res.status(201).send({
              status: 201,
              message: "we have sent an OTP to your email",
              user: sitter.toAuthJSON(),
            });
          });
        } catch (error) {
          res
            .status(500)
            .send({ status: 500, message: `something wen't wrong` });
        }
      } catch (error) {
        res.status(500).send({ status: 500, error: error });
      }
    }
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).send({ status: 409, message: "Email already exists" });
    } else {
      res.status(500).send({ status: 500, error: error });
    }
  }
};

exports.signin = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: 422,
      message: errors.array()[0].msg,
    });
  }

  passport.authenticate("user-signin", { session: false }, async function (
    err,
    user,
    info
  ) {
    if (err) {
      return next(err);
    }
    if (user) {
      if (user.role === "company") {
        const company = await Company.findById(user._id);
        const token = user.generateJWT();
        return res.status(200).json({
          status: 200,
          message: "User login successfully",
          token,
          user: company.toAuthJSON(),
        });
      }
      if (user.role === "parent") {
        const parent = await Parent.findById(user._id);
        const token = user.generateJWT();
        return res.status(200).json({
          status: 200,
          message: "User login successfully",
          token,
          user: parent.toAuthJSON(),
        });
      }
      if (user.role === "sitter") {
        const sitter = await Sitter.findById(user._id);
        const token = user.generateJWT();
        return res.status(200).json({
          status: 200,
          message: "User login successfully",
          token,
          user: sitter.toAuthJSON(),
        });
      }
    } else {
      return res.status(500).json(info);
    }
  })(req, res, next);
};

exports.resendEmail = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: 422,
      message: errors.array()[0].msg,
    });
  }
  const { _id, email } = req.body;
  const userToken = new Token({
    _userId: _id,
    token: crypto.randomBytes(3).toString("hex"),
  });
  try {
    await userToken.save();
    const mailOptions = {
      from: "nss.143121@gmail.com",
      to: email,
      subject: "Account Verification Token",
      text:
        "Hello,\n\n" +
        "Please verify your account by OTP: \n" +
        userToken.token +
        ".\n",
    };
    smtpTransport.sendMail(mailOptions, function (err) {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      res.status(200).send({
        status: 200,
        message: "we have sent an OTP to your email again",
      });
    });
  } catch (error) {
    res.status(500).send({ status: 500, message: `something wen't wrong` });
  }
};

exports.verifyEmail = async (req, res) => {
  await Token.findOne({ token: req.params.otp }, function (err, token) {
    if (!token)
      return res.status(400).send({
        status: 400,
        message: "The OTP entered is incorrect.",
      });
    User.findOne({ _id: token._userId }, async (err, user) => {
      if (!user)
        return res.status(400).send({
          status: 400,
          message: "We were unable to find a user for this OTP.",
        });
      if (user.role === "company") {
        const company = await Company.findById(user._id);
        if (company.isVerified)
          return res.status(400).send({
            status: 400,
            message: "This user has already been verified.",
          });
        company.isVerified = true;
        company.save(function (err) {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }
          res.status(200).send({
            status: 200,
            message: "This user has been verified.",
          });
        });
      }
      if (user.role === "parent") {
        const parent = await Parent.findById(user._id);
        if (parent.isVerified)
          return res.status(400).send({
            status: 400,
            message: "This user has already been verified.",
          });
        parent.isVerified = true;
        parent.save(function (err) {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }
          res.status(200).send({
            status: 200,
            message: "This user has been verified.",
          });
        });
      }
      if (user.role === "sitter") {
        const sitter = await Sitter.findById(user._id);
        if (sitter.isVerified)
          return res.status(400).send({
            status: 400,
            message: "This user has already been verified.",
          });
        sitter.isVerified = true;
        sitter.save(function (err) {
          if (err) {
            return res.status(500).send({ msg: err.message });
          }
          res.status(200).send({
            status: 200,
            message: "This user has been verified.",
          });
        });
      }
    });
  });
};

exports.profile = async (req, res) => {
  const _id = req.payload._id;
  try {
    const user = await User.findById(_id);
    if (user.role === "company") {
      const company = await Company.findById(user._id);
      res.send({
        status: 200,
        message: "Profile get successfully",
        user: company.toAuthJSON(),
      });
    }
    if (user.role === "parent") {
      const parent = await Parent.findById(user._id);
      res.send({
        status: 200,
        message: "Profile get successfully",
        user: parent.toAuthJSON(),
      });
    }
    if (user.role === "sitter") {
      const sitter = await Sitter.findById(user._id);
      res.send({
        status: 200,
        message: "Profile get successfully",
        user: sitter.toAuthJSON(),
      });
    }
  } catch (error) {
    res.status(500).send({ status: 500, message: error });
  }
};

exports.editProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: 422,
      message: errors.array()[0].msg,
    });
  }
  const _id = req.payload._id;
  try {
    const user = await User.findById(_id);
    if (user.role === "company") {
      const company = await Company.updateOne({ _id: _id }, { $set: req.body });
      res.send({
        status: 200,
        message: "Profile updated successfully",
      });
    }
    if (user.role === "parent") {
      const parent = await Parent.updateOne({ _id: _id }, { $set: req.body });
      res.send({
        status: 200,
        message: "Profile updated successfully",
      });
    }
    if (user.role === "sitter") {
      const sitter = await Sitter.updateOne({ _id: _id }, { $set: req.body });
      res.send({
        status: 200,
        message: "Profile updated successfully",
      });
    }
  } catch (error) {
    res.status(500).send({ status: 500, message: error });
  }
};

exports.forgetPassword = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: 422,
      message: errors.array()[0].msg,
    });
  }

  async.waterfall(
    [
      function (done) {
        crypto.randomBytes(3, function (err, buf) {
          var token = buf.toString("hex");
          done(err, token);
        });
      },
      function (token, done) {
        User.findOne({ email: req.body.email }, function (err, user) {
          if (!user) {
            return res.status(500).send({
              status: 500,
              message: "No account with that email address exists",
            });
          }
          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
          user.save(function (err) {
            done(err, token, user);
          });
        });
      },
      function (token, user, done) {
        const mailOptions = {
          from: "nss.143121@gmail.com",
          to: user.email,
          subject: "Password Reset",
          text:
            "You are receiving this because you (or someone else) have requested the reset of the password for your account. \n\n" +
            token +
            "\n\n" +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n",
        };
        smtpTransport.sendMail(mailOptions, function (err) {
          done(err, "email sent successfully");
        });
      },
    ],
    function (err, result) {
      if (err) return next(err);
      res.send({ status: 200, message: result });
    }
  );
};

exports.resetPassword = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: 422,
      message: errors.array()[0].msg,
    });
  }

  async.waterfall(
    [
      function (done) {
        User.findOne(
          {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() },
          },
          function (err, user) {
            if (!user) {
              return res.status(500).send({
                status: 500,
                message: "The OTP entered is incorrect.",
              });
            }
            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            user.save(function (err) {
              done(err, user);
            });
          }
        );
      },
      function (user, done) {
        var mailOptions = {
          from: "nss.143121@gmail.com",
          to: user.email,
          subject: "Your password has been changed",
          text:
            "Hello,\n\n" +
            "This is a confirmation that the password for your account " +
            user.email +
            " has just been changed.\n",
        };
        smtpTransport.sendMail(mailOptions, function (err) {
          done(err, "password change successfully");
        });
      },
    ],
    function (err, result) {
      if (err) return next(err);
      res.send({ status: 200, message: result });
    }
  );
};
