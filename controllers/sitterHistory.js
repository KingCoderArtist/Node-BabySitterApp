const SitterHistory = require("../models/sitterHistory");
const { validationResult } = require("express-validator");
const _ = require("lodash");

exports.createSitterHistory = async (req, res) => {
  const sitterHistory = new SitterHistory(req.body);
  try {
    await sitterHistory.save();
    res.status(201).json({
      status: 201,
      message: "Booked sitter successfully",
      response: sitterHistory,
    });
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
  }
};

exports.getSitterHistory = async (req, res) => {
  const _id = req.payload._id;
  try {
    const sitterHistory = await SitterHistory.find()
      .sort({ sitterName: 1 })
      .populate({
        path: "bookings",
        match: {
          userId: _id,
        },
      });
    const msg =
      sitterHistory.length === 0
        ? `No sitter available`
        : `Sitter history get successfully`;
    const filter = _.filter(sitterHistory, function (o) {
      return o.bookings;
    });
    res.send({
      status: 200,
      message: msg,
      response: filter,
    });
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
  }
};
