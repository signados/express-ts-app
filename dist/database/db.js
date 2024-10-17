"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../utils/config");
const DB_NAME = config_1.NODE_ENV === 'test' ? config_1.DB_TEST_NAME : config_1.DB_DEV_NAME;
const db = new sequelize_1.Sequelize(DB_NAME, config_1.DB_USER, config_1.DB_PASSWORD, {
    host: config_1.DB_HOST,
    dialect: 'mysql',
    port: config_1.DB_PORT, // '8889' for mac, '3306' for windows
    define: {
        timestamps: false,
    }
});
exports.default = db;
