"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRol = void 0;
const handleError_1 = require("../utils/handleError");
const checkRol = (reqRol) => (req, res, next) => {
    try {
        const { user } = req.body;
        // console.log({user})
        const rolesByUser = user.role;
        const checkValueRol = reqRol.some((rolSingle) => rolesByUser.includes(rolSingle));
        if (!checkValueRol) {
            (0, handleError_1.handleHttpError)(res, "USER_NOT_PERMISSIONS");
        }
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "ERROR_PERMISSIONS", 403);
    }
    next();
};
exports.checkRol = checkRol;
