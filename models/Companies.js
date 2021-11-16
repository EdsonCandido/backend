const { Model, DataTypes } = require("sequelize");

class Company extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        corporate_name: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING,
        cnpj: DataTypes.STRING,
        active: DataTypes.INTEGER,
      },
      {
        sequelize: connection,
      }
    );
  }
}

module.exports = Company;
