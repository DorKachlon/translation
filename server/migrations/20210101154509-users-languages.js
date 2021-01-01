"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("users_languages", {
            user_id: {
                primaryKey: true,
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            language_id: {
                primaryKey: true,
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
        await queryInterface.dropTable("users_languages");
    },
};
