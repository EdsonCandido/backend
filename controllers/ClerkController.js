const Clerk = require("../models/Clerks");
const Users = require("../models/Users");
exports.findAll = async () => {
  const resp = await Clerk.findAll();

  return resp;
};
exports.findOne = async (key) => {
  const resp = await Clerk.findByPk(key);
  return resp;
};
exports.create = async (user_id, state = {}) => {
  const user = await Users.create(state);
  const resp = await Clerk.create({
    user_id: user.getDataValue("id"),
  });
  return resp;
};
exports.update = async (key, state) => {
  const clerk = await Clerk.findByPk(key);
  const user = await Users.findByPk(clerk.getDataValue("id"));

  const resp = await Clerk.update(state, { where: { id: key } });
  return resp;
};
exports.activate = async (key) => {
  const resp = await Clerk.update({ active: 1 }, { where: { id: key } });
  return resp;
};

exports.findOneFree = async () => {
  const clerk = await Clerk.findOne({ where: { is_logged: 1, active: 1 } });

  if (!clerk) {
    console.error(clerk);
    return new Error("Could not find a record");
  }

  await Clerk.update({ is_logged: 0 }, { where: { id: clerk.dataValues.id } });

  return clerk.dataValues;
};
