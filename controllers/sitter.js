const Sitter = require("../models/sitter");
const { validationResult } = require("express-validator");

exports.getSitter = async (req, res) => {
  try {
    const sitter = await Sitter.find();
    const msg =
      Sitter.length === 0 ? `Sitter list's empty` : `Sitter get successfully`;
    res.send({ status: 200, message: msg, users: sitter });
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
  }
};

exports.getSitterById = async (req, res) => {
  const _id = req.params.id;
  try {
    const sitter = await Sitter.findOne({ _id: _id });
    res.send({
      status: 200,
      message: "Sitter get successfully",
      user: sitter,
    });
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
  }
};

exports.updateSitterById = async (req, res) => {
  const _id = req.params.id;
  try {
    const sitter = await Sitter.updateOne({ _id: _id }, { $set: req.body });
    res.send({
      status: 200,
      message: "Sitter updated successfully",
    });
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
  }
};
