const Rooms = require("../models/Rooms");
const Service = require("../services/RoomService");

exports.findAll = async (req, res, next) => {
  const rooms = await Rooms.findAll();

  res.json(rooms);
};

exports.connectCall = async (req, res, next) => {};
exports.findOne = async (req, res, next) => {};
exports.save = async (req, res, next) => {
  let { user_id, user_id_clerk, user_id_interpreter } = req.body;

  const room = await Rooms.create({
    user_id,
    user_id_clerk,
    user_id_interpreter,
  });
  if (!room) {
    return res.status(500).json({ message: "Error the created this record" });
  }
  return res.status(201).json(room);
};
exports.update = async (req, res, next) => {
  const room_id = req.params.id;

  const init_date = await Rooms.findOne({ where: { id: room_id } });

  if (!init_date) {
    return res.status(404).json({ message: "Could not find this room!" });
  }

  const date_now = new Date().getTime();
  const date_finish = new Date(init_date.createdAt).getTime();
  console.log("date now =>", date_now);
  console.log("*-*-*-*-*-*-*-*-*-*-*-*-*-*");
  console.log("date =>", date_finish);

  let duration = parseInt(date_finish - date_now);

  const room = await Rooms.update(
    { duration },
    {
      where: { id: room_id },
    }
  );

  if (!room) {
    res.status(500).json({ message: "Error in finish this room" });
  }
  res.json({ message: "Finish this room!" });
};
exports.destroy = async (req, res, next) => {};

exports.getMyRoom = async (req, res, next) => {
  const resp = await Service.findMyRoom(req.params.id);
  return res.json(resp);
};
