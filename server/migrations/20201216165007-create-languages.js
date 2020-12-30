"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("languages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      code: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      language: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      voice: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      direction: {
        allowNull: false,
        type: Sequelize.ENUM(["rtl", "ltr"]),
        defaultValue: "ltr",
      },
      stt: {
        allowNull: false,
        type: Sequelize.ENUM(["azure", "google"]),
        defaultValue: "google",
      },
      tts: {
        allowNull: false,
        type: Sequelize.ENUM(["azure", "google"]),
        defaultValue: "google",
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
    await queryInterface.dropTable("languages");
  },
};
