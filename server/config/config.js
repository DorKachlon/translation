require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "translator",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    define: { underscored: true },
    logging: false,
  },
  test: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_TEST || "translator_test",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    define: { underscored: true },
  },
  production: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "translator",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "mysql",
    define: { underscored: true },
  },
};
