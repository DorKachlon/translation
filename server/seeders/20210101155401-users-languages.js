"use strict";
const usersLanguages = require("./seedFiles/usersLanguages");

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert("users_languages", usersLanguages, {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete("users_languages", null, {});
    },
};
