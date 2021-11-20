const { Model, DataTypes } = require("sequelize");

class Totems extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
        active: DataTypes.INTEGER,
        disable: DataTypes.INTEGER,
        in_call: DataTypes.INTEGER,
      },
      { sequelize: connection }
    );
  }
}

module.exports = Totems;
