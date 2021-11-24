const Totem = require("../models/Totems");

exports.findAll = async () => {
  const totems = await Totem.findAll();
  return totems;
};
exports.findOne = async (key) => {
  const totem = await Totem.findByPk(key);
  if (!totem) {
    return new Error("Totem not found in server");
  }
  return totem;
};
exports.create = async (data) => {
  const { name } = data;
  const totem = await Totem.create({
    name,
  });
  return totem;
};
exports.active = async (key) => {
  const totem = await Totem.update({ active: 1 }, { where: { id: key } });
  if (totem == 0) {
    console.error("Erro in activate totem");
    return new Error("Erro in activate totem");
  }
  return totem;
};
exports.call = async (key, state) => {
  const totem = await Totem.update({ in_call: state }, { where: { id: key } });
  if (totem == 0) {
    console.error("Erro in modify state to totem");
    return new Error("Erro in modify state to totem");
  }
  return totem;
};
exports.update = async (key, date) => {
  const { name, active, in_call, disable } = date;
  const totem = await Totem.update({ name, active }, { where: { id: key } });
  if (totem == 0) {
    console.error("Erro in update state to totem");
    return new Error("Erro in update state to totem");
  }
  return totem;
};
exports.destroy = async (key) => {
  const totem = await Totem.update(
    { in_call: 0, active: 0, disable: 0 },
    { where: { id: key } }
  );
  if (totem == 0) {
    console.error(totem);
    return new Error("Erro in disable totem");
  }
  return true;
};
