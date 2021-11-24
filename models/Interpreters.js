const { Model, DataTypes } = require("sequelize");

class Interpreters extends Model {
  static init(connection) {
    super.init(
      {
        id_user: DataTypes.INTEGER,
        is_logged: DataTypes.INTEGER,
        in_call: DataTypes.INTEGER,
      },
      { sequelize: connection }
    );
  }
}

module.exports = Interpreters;
