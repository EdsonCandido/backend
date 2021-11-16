const { Model, DataTypes } = require("sequelize");

class Users extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        email: DataTypes.STRING,
        cpf: DataTypes.STRING,
        active: DataTypes.INTEGER,
        is_logged: DataTypes.INTEGER,
      },
      {
        sequelize: connection,
      }
    );
  }
}

module.exports = Users;
