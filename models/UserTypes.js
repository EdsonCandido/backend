const { Model, DataTypes } = require("sequelize");

class UserTypes extends Model {
  static init(connection) {
    super.init(
      {
        user_id: DataTypes.INTEGER,
        type_id: DataTypes.INTEGER,
      },
      { sequelize: connection }
    );
  }
}

module.exports = UserTypes;
