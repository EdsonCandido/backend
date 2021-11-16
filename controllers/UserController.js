const User = require("../models/Users");
const utils = require("../utils/format");

exports.findAll = async (req, res, next) => {
  const users = await User.findAll();

  return res.json(users);
};
exports.findOne = async (req, res, next) => {
  const user_id = req.params.id;
  const user = await User.findOne({ where: { id: user_id } });

  if (!user) return res.status(404).json({ message: "Record user not found" });

  return res.json(user);
};
exports.save = async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({ name, email, password });

  if (!user) {
    return res.json({ message: "Fail in created user" });
  }

  return res.status(201).json(user);
};
exports.update = async (req, res, next) => {
  const user_id = req.params.id;
  let { name, password, email, cpf, active } = req.body;

  cpf = await utils.clearCpf(cpf);
  if (!user_id) {
    return res.json({ message: `Could not find this ${user_id}` });
  }
  const user = await User.update(
    {
      name,
      password,
      email,
      cpf,
      active,
    },
    { where: { id: user_id } }
  );
  if (user == 0) {
    return res.status(406).json({ message: "Error on update record" });
  }

  res.status(200).json({ message: "Record update success full" });
};
exports.destroy = async (req, res, next) => {
  const user_id = req.params.id;

  const user = await User.update({ active: "0" }, { where: { id: user_id } });

  if (user == 0) {
    return res.status(406).json({ message: "Error on disable in record" });
  }

  res.status(200).json({ message: "Record disable success full" });
};
