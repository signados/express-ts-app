"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRol = void 0;
var handleError_1 = require("../utils/handleError");
var checkRol = function (reqRol) { return function (req, res, next) {
    try {
        var user = req.body.user;
        // console.log({user})
        var rolesByUser_1 = user.role;
        var checkValueRol = reqRol.some(function (rolSingle) { return rolesByUser_1.includes(rolSingle); });
        if (!checkValueRol) {
            (0, handleError_1.handleHttpError)(res, "USER_NOT_PERMISSIONS");
        }
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "ERROR_PERMISSIONS", 403);
    }
    next();
}; };
exports.checkRol = checkRol;
