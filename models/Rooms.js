const { Model, DataTypes } = require("sequelize");

class Rooms extends Model {
  static init(connection) {
    super.init(
      {
        user_id: DataTypes.INTEGER,
        user_id_interpreter: DataTypes.INTEGER,
        user_id_clerk: DataTypes.INTEGER,
        duration: DataTypes.STRING,
        room: DataTypes.STRING,
        is_accepted: DataTypes.INTEGER,
      },
      {
        sequelize: connection,
      }
    );
  }
}

module.exports = Rooms;
