const Booking = require("../models/booking");
const { validationResult } = require("express-validator");

exports.createBooking = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: 422,
      message: errors.array()[0].msg,
    });
  }
  const image =
    req.file === undefined ? "" : req.headers.host + "/" + req.file.path;
  const booking = new Booking(req.body);
  booking.userId = req.payload._id;
  booking.image = image;
  try {
    await booking.save();
    res.status(201).json({
      status: 201,
      message: "Booking created successfully",
      response: booking,
    });
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.find();
    const msg =
      booking.length === 0
        ? `Booking list's empty`
        : `Booking get successfully`;
    res.send({ status: 200, message: msg, response: booking });
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
  }
};

exports.getBookingById = async (req, res) => {
  const _id = req.params.id;
  try {
    const booking = await Booking.findOne({ _id: _id });
    res.send({
      status: 200,
      message: "Booking get successfully",
      response: booking,
    });
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
  }
};

exports.getBookingByUser = async (req, res) => {
  const _id = req.payload._id;
  try {
    const booking = await Booking.find({ userId: _id });
    const msg =
      booking.length === 0
        ? `Booking list's empty`
        : `Booking get successfully`;
    res.send({ status: 200, message: msg, response: booking });
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
  }
};

exports.updateBooking = async (req, res) => {
  const _id = req.params.id;
  try {
    const booking = await Booking.updateOne({ _id: _id }, { $set: req.body });
    res.send({
      status: 200,
      message: "Booking updated successfully",
    });
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
  }
};

exports.deleteBooking = async (req, res) => {
  const _id = req.params.id;
  try {
    const booking = await Booking.deleteOne({ _id: _id });
    res.send({
      status: 200,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
  }
};
