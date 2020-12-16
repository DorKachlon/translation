"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Progress", {
      user_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      language_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      word_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      score: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Progress");
  },
};
