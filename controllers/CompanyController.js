const Company = require("../models/Companies");

const utils = require("../utils/format");

exports.findAll = async (req, res, next) => {
  const companies = await Company.findAll();

  return res.json(companies);
};
exports.findOne = async (req, res, next) => {
  const company_id = req.params.id;

  const company = await Company.findOne({ where: { id: company_id } });
  if (!company)
    return res.status(404).json({ message: "Record of Company not found" });

  return res.json(company);
};
exports.create = async (req, res, next) => {
  let { name, email, corporate_name, cnpj, city, state } = req.body;

  cnpj = await utils.clearCnpj(cnpj);
  const company = await Company.create({
    name,
    email,
    corporate_name,
    cnpj,
    city,
    state,
  });
  if (!company) {
    return res.status(400).json({ message: "Error the created a record" });
  }

  return res.status(201).json(company);
};

exports.update = async (req, res, next) => {
  const company_id = req.params.id;
  const { name, email, corporate_name, cnpj, city, state } = req.body;

  const company = await Company.update(
    {
      name,
      email,
      corporate_name,
      cnpj,
      city,
      state,
    },
    { where: { id: company_id } }
  );
  if (!company) {
    return res.status(406).json({ message: "Error on update record" });
  }
  return res.status(200).json({ message: "Update record success" });
};

exports.destroy = async (req, res, next) => {
  const company_id = req.params.id;

  if (!company_id)
    return res
      .status(404)
      .json({ message: `Error, not found by company record: ${company_id}` });

  const company = await Company.update(
    { active: 0 },
    { where: { id: company_id } }
  );

  if (!company)
    return res
      .status(500)
      .json({ message: "Unexpected erro, record not disable!" });

  return res.status(200).json({ message: "Company record disable!" });
};
