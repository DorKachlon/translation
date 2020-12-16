"use strict";
const words = require("./seedFiles/words");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("words", words, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("words", null, {});
  },
};
