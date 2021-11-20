const { Model, DataTypes } = require("sequelize");

class Clerks extends Model {
  static init(connection) {
    super.init(
      {
        user_id: DataTypes.INTEGER,
        is_logged: DataTypes.INTEGER,
        active: DataTypes.INTEGER,
      },
      { sequelize: connection }
    );
  }
}

module.exports = Clerks;
