const moment = require("moment");

const Rooms = require("../models/Rooms");
const Types = require("../models/Types");
const Users = require("../models/Users");
const UserTypes = require("../models/UserTypes");

exports.findAllRooms = async () => {};
exports.findOneRoom = async (data) => {
  let { user_id, user_id_clerk, user_id_interpreter } = data;
  const room_info = await Rooms.findOne({
    where: {
      user_id: user_id,
      user_id_clerk: user_id_clerk,
      user_id_interpreter,
    },
  });
  if (!room_info) {
    return { message: "Erro in search is room for this ID: ", user_id };
  }
  return room_info.dataValues;
};
exports.createRoom = async ({ totem, clerk, interpreter }) => {
  const totem_id = data.user_id;

  if (!interpreter) interpreter = { id: 3 };

  // return;

  const new_room = await Rooms.create({
    id_totem: totem.id,
    id_clerk: clerk.id,
    id_interpreter: id_interpreter.id,
  });

  console.warn("Criou a sala e colocou o id do atendente junto com o do tetem");
  return new_room.dataValues;
};
exports.finishRoom = async (data) => {
  let { user_id, user_id_clerk, user_id_interpreter, room_id } = data;
  const room_info = await Rooms.findOne({ where: { user_id: user_id } });

  // console.log("Data =>", data);
  console.log("");
  if (!room_info) {
    return { message: "Erro in search this room" };
  }

  let time_initial_call = moment(room_info.dataValues.createdAt);
  let now_time = moment(Date.now());

  duration = now_time.diff(time_initial_call, "minutes");

  const update_room = await Rooms.update(
    { duration: duration },
    { where: { id: room_id } }
  );

  // if (update_room == 0) {
  //   return { message: "Error in finish room" };
  // }
  return true;
};
exports.callConnectRoom = async (data) => {
  const { key } = data;
  const room_info = await Rooms.findByPk(key);
  return room_info.dataValues;
};
exports.callAccepted = async (key) => {
  const resp = await Rooms.update({ is_accepted: 1 }, { where: { id: key } });
  if (resp == 0) {
    console.error(resp);
    return new Error("Error om accepted in call");
  }
  return true;
};
exports.findOneRoomActive = async (data) => {
  const { key } = data;
  const room_info = await Rooms.findOne({ where: { id: key } });

  return room_info.dataValues;
};
