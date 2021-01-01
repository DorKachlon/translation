"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            first_name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            last_name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            native_language_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            current_language_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            chat_mode: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            manual_mode: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            lazy_mode: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
                defaultValue: false,
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
        await queryInterface.dropTable("users");
    },
};
