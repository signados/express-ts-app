"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const config_1 = require("./utils/config");
const db_1 = __importDefault(require("./database/db"));
const UserRouter_1 = __importDefault(require("./routes/UserRouter"));
const express = require("express");
const cors = require("cors");
exports.app = express();
exports.app.use(cors());
exports.app.use(express.json());
exports.app.use('/api/', UserRouter_1.default);
exports.app.use(express.static('storage'));
try {
    db_1.default.authenticate();
    console.log('💫💫💫conected to database💫💫💫');
}
catch (error) {
    console.log(`error:' ${error}`);
}
if (config_1.NODE_ENV !== 'test') {
    exports.app.listen(config_1.PORT, () => {
        console.log(`🚀server up in http://localhost:${config_1.PORT}/`);
    });
}
