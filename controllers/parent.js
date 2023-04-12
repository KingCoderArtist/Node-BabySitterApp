const Parent = require("../models/parent");
const { validationResult } = require("express-validator");

exports.getParent = async (req, res) => {
  try {
    const parent = await Parent.find();
    const msg =
      parent.length === 0 ? `Parent list's empty` : `Parent get successfully`;
    res.send({ status: 200, message: msg, users: parent });
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
  }
};

exports.getParentById = async (req, res) => {
  const _id = req.params.id;
  try {
    const parent = await Parent.findOne({ _id: _id });
    res.send({
      status: 200,
      message: "Parent get successfully",
      user: parent,
    });
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
  }
};

exports.updateParentById = async (req, res) => {
  const _id = req.params.id;
  try {
    const parent = await Parent.updateOne({ _id: _id }, { $set: req.body });
    res.send({
      status: 200,
      message: "Parent updated successfully",
    });
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
  }
};

exports.addParentLocation = async (req, res) => {
  const _id = req.payload._id;
  try {
    const parent = await Parent.findByIdAndUpdate(
      _id,
      { $push: { address: req.body } },
      {
        new: true,
        useFindAndModify: false,
      }
    );
    res.send({
      status: 200,
      message: "Add user location successfully",
      user: parent.address,
    });
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
  }
};

exports.getParentLocation = async (req, res) => {
  const _id = req.payload._id;
  try {
    const parent = await Parent.findById(_id, { address: 1, _id: 0 });
    res.send({
      status: 200,
      message: "Get user location successfully",
      users: parent,
    });
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
  }
};
