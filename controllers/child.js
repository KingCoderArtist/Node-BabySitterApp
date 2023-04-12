const Child = require("../models/child");
const { validationResult } = require("express-validator");

exports.createChild = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: 422,
      message: errors.array()[0].msg,
    });
  }
  const child = new Child(req.body);
  child.parentId = req.payload._id;
  try {
    await child.save();
    res.status(201).json({
      status: 201,
      message: "child created successfully",
      response: child,
    });
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
  }
};

exports.getChild = async (req, res) => {
  const _id = req.payload._id;
  try {
    const child = await Child.find({ parentId: _id });
    const msg =
      child.length === 0 ? `Child list's empty` : `Child get successfully`;
    res.send({
      status: 200,
      message: msg,
      response: child,
    });
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
  }
};

exports.updateChild = async (req, res) => {
  const _id = req.params.id;
  try {
    const child = await Child.updateOne({ _id: _id }, { $set: req.body });
    res.send({
      status: 200,
      message: "Child updated successfully",
    });
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
  }
};

exports.deleteChild = async (req, res) => {
  const _id = req.params.id;
  try {
    const child = await Child.deleteOne({ _id: _id });
    res.send({
      status: 200,
      message: "Child deleted successfully",
    });
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
  }
};
