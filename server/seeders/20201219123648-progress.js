"use strict";
const progresses = require("./seedFiles/progresses");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("progress", progresses, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("progress", null, {});
  },
};
