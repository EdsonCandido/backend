const Clerks = require("../models/Clerks");
const Interpreters = require("../models/Interpreters");
const Totems = require("../models/Totems");
const Users = require("../models/Users");
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  let data = {};
  const user = await Users.findOne({ where: { email, password } });
  const totem = await Totems.findOne({
    where: { id_user: user.getDataValue("id") },
  });
  const clerk = await Clerks.findOne({
    where: { id_user: user.getDataValue("id") },
  });
  const interpreter = await Interpreters.findOne({
    where: { id_user: user.getDataValue("id") },
  });
  if (user) {
    data = {
      user,
    };
  }
  if (totem) {
    data = {
      user,
      totem,
    };
  }
  if (clerk) {
    data = {
      user,
      clerk,
    };
  }
  if (!user)
    return res.status(401).json({ message: "Login and password invalid" });
  if (!user.dataValues.active)
    return res.status(401).json({ message: "User not active" });

  return res.json(data);
};
