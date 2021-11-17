const Users = require("../models/Users");
const UserTypes = require("../models/UserTypes");
const Types = require("../models/Types");
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await Users.findOne({ where: { email, password } });

  if (!user)
    return res.status(401).json({ message: "Login and password invalid" });
  if (!user.dataValues.active)
    return res.status(401).json({ message: "User not active" });

  const permission = await UserTypes.findAll({
    where: { user_id: user.dataValues.id },
  });

  let arr = [];

  await Promise.all(
    permission.map(async (element) => {
      const aux = await Types.findByPk(element.type_id);
      arr.push(aux);
    })
  ).catch((err) => console.error(err));

  let arr2 = [];
  await Promise.all(
    permission.map(async (element) => {
      let aux = await Users.findByPk(element.user_id);
      arr2 = aux;
    })
  ).catch((err) => console.log(err));

  const json = { user: arr2, permission: arr };

  return res.json(json);
};
