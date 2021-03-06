const { Model, DataTypes } = require("sequelize");

class Clerks extends Model {
  static init(connection) {
    super.init(
      {
        id_user: DataTypes.INTEGER,
        is_logged: DataTypes.INTEGER,
        active: DataTypes.INTEGER,
      },
      { sequelize: connection }
    );
  }
}

module.exports = Clerks;
