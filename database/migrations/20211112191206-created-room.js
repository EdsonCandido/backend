"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return await queryInterface.createTable("rooms", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      id_totem: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "totems",
          key: "id",
        },
        onUpdate: "CASCADE",
      },
      id_interpreter: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "interpreters",
          key: "id",
        },
        onUpdate: "CASCADE",
      },
      id_clerk: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "clerks",
          key: "id",
        },
        onUpdate: "CASCADE",
      },
      duration: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      room: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      is_accepted: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      is_finish: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable("rooms");
  },
};
