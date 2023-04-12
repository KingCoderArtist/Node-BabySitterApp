const Company = require("../models/company");
const { validationResult } = require("express-validator");

exports.getCompany = async (req, res) => {
  try {
    const company = await Company.find();
    const msg =
      company.length === 0
        ? `Company list's empty`
        : `Company get successfully`;
    res.send({ status: 200, message: msg, users: company });
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
  }
};

exports.getCompanyById = async (req, res) => {
  const _id = req.params.id;
  try {
    const company = await Company.findOne({ _id: _id });
    res.send({
      status: 200,
      message: "Company get successfully",
      user: company,
    });
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
  }
};

exports.updateCompanyById = async (req, res) => {
  const _id = req.params.id;
  try {
    const company = await Company.updateOne({ _id: _id }, { $set: req.body });
    res.send({
      status: 200,
      message: "Company updated successfully",
    });
  } catch (error) {
    res.status(500).send({ status: 500, error: error });
  }
};
