const UserTypes = require("../models/UserTypes");
const Users = require("../models/Users");
const Types = require("../models/Types");

exports.findAll = async (req, res, next) => {
  const userTypes = await UserTypes.findAll();
  // UserTypes.belongsTo(Users, { foreignKey: "id" });
  return res.json(userTypes);
};

exports.findOne = async (req, res, next) => {
  const user_id = req.params.id;

  const permissionsUser = await UserTypes.findAll({ where: { user_id } });

  let arr = [];

  await Promise.all(
    permissionsUser.map(async (element) => {
      const aux = await Types.findByPk(element.type_id);
      arr.push(aux);
    })
  ).catch((err) => console.error(err));

  let arr2 = [];
  await Promise.all(
    permissionsUser.map(async (element) => {
      let aux = await Users.findByPk(element.user_id);
      arr2 = aux;
    })
  ).catch((err) => console.log(err));

  const json = { user: arr2, permission: arr };

  if (!permissionsUser) {
    return res.status(500).json({ message: "Fail in created user" });
  }
  return res.json(json);
};
exports.save = async (req, res, next) => {
  const { user_id, type_id } = req.body;

  const permissionsUser = await UserTypes.create({ type_id, user_id });

  if (!permissionsUser)
    return res.status(500).join({ message: `Record not found!` });

  return res.status(201).json(permissionsUser);
};

exports.destroy = async (req, res, next) => {
  const permission_id = req.params.id;

  const permissionUser = await UserTypes.destroy({
    where: { id: permission_id },
  });

  if (!permissionUser)
    return res.status(500).json({ message: `Could not remove this record` });

  return res.status(200).json({ message: `Remove this record successfully` });
};
