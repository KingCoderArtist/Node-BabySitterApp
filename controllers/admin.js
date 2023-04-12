const Admin = require("../models/admin");
const passport = require("passport");
const { validationResult } = require("express-validator");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const async = require("async");

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

  const admin = new Admin(req.body);
  try {
    await admin.save();
    res.status(201).json({
      status: 201,
      message: "successfully registered",
      user: admin.toAuthJSON(),
    });
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

  passport.authenticate("admin-signin", { session: false }, async function (
    err,
    admin,
    info
  ) {
    if (err) {
      return next(err);
    }
    if (admin) {
      const token = admin.generateJWT();
      return res.status(200).json({
        status: 200,
        message: "Successfully login",
        token,
        user: admin.toAuthJSON(),
      });
    } else {
      return res.status(500).json(info);
    }
  })(req, res, next);
};

exports.profile = async (req, res) => {
  const _id = req.payload._id;
  try {
    const admin = await Admin.findById(_id);
    return res.status(200).json({
      status: 200,
      message: "Profile get successfully",
      user: admin.toAuthJSON(),
    });
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
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
        crypto.randomBytes(10, function (err, buf) {
          var token = buf.toString("hex");
          done(err, token);
        });
      },
      function (token, done) {
        Admin.findOne({ email: req.body.email }, function (err, admin) {
          if (!admin) {
            return res.status(500).send({
              status: 500,
              message: "No account with that email address exists",
            });
          }
          admin.resetPasswordToken = token;
          admin.resetPasswordExpires = Date.now() + 3600000; // 1 hour
          admin.save(function (err) {
            done(err, token, admin);
          });
        });
      },
      function (token, admin, done) {
        const mailOptions = {
          from: "nss.143121@gmail.com",
          to: admin.email,
          subject: "Password Reset",
          text:
            "Hello,\n\n" +
            "Please verify your account by OTP: \n" +
            token +
            ".\n",
        };
        smtpTransport.sendMail(mailOptions, function (err) {
          done(err, token);
        });
      },
    ],
    function (err, result) {
      if (err) return next(err);
      res.send({ status: 200, message: 'email send successfully', token: result });
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
        Admin.findOne(
          {
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() },
          },
          function (err, admin) {
            if (!admin) {
              return res
                .status(500)
                .send({ status: 500, message: "token is not valid..." });
            }
            admin.password = req.body.password;
            admin.resetPasswordToken = undefined;
            admin.resetPasswordExpires = undefined;
            admin.save(function (err) {
              done(err, admin);
            });
          }
        );
      },
      function (admin, done) {
        var mailOptions = {
          from: "nss.143121@gmail.com",
          to: admin.email,
          subject: "Your password has been changed",
          text:
            "Hello,\n\n" +
            "This is a confirmation that the password for your account " +
            admin.email +
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
