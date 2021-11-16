const Type = require("../models/Types");

exports.findAll = async (req, res, next) => {
  const types = await Type.findAll();

  if (!types) {
    return res.status(200).json({ message: "No Registered type" });
  }

  res.json(types);
};
exports.save = async (req, res, nest) => {
  const { name, description } = req.body;
  const type = await Type.create({ name, description });
  res.json(type);
};
exports.update = async (req, res, next) => {};
exports.destroy = async (req, res, next) => {
  const type_id = req.params.id;

  const type = await Type.update({ active: 0 }, { where: { id: type_id } });

  if (type == 0) {
    return res.status(406).json({ message: "Error on disable in record" });
  }

  res.status(200).json({ message: "Record disable success full" });
};
