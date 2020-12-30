"use strict";
const textCache = require("./seedFiles/textCache");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("text_cache", textCache, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("text_cache", null, {});
  },
};
