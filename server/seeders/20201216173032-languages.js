"use strict";
const languages = require("./seedFiles/languages");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("languages", languages, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("languages", null, {});
  },
};
