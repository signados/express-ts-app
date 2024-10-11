"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHttpError = void 0;
var handleHttpError = function (res, message, code) {
    if (message === void 0) { message = 'Ups something happened!'; }
    if (code === void 0) { code = 403; }
    res.status(code).send({ error: message });
    //res.status(code).render('error',{ error : message})
};
exports.handleHttpError = handleHttpError;
