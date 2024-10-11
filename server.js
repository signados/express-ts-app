"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var config_1 = require("./utils/config");
var db_1 = require("./database/db");
var UserRouter_1 = require("./routes/UserRouter");
var express = require("express");
var cors = require("cors");
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
    console.log("error:' ".concat(error));
}
if (config_1.NODE_ENV !== 'test') {
    exports.app.listen(config_1.PORT, function () {
        console.log("\uD83D\uDE80server up in http://localhost:".concat(config_1.PORT, "/"));
    });
}
