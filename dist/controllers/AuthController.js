"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.registerController = void 0;
const handlePassword_1 = require("../utils/handlePassword");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const handleError_1 = require("../utils/handleError");
const handlejwt_1 = require("../utils/handlejwt");
const registerController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const newPassword = data.password;
        const passwordHash = yield (0, handlePassword_1.encrypt)(newPassword);
        const roles = data.roles ? data.roles : ['user'];
        const newUser = Object.assign(Object.assign({}, data), { password: passwordHash, roles: roles });
        console.log(newUser);
        const user = yield UserModel_1.default.create(newUser);
        const userData = {
            id: user === null || user === void 0 ? void 0 : user.get('id'),
            name: user === null || user === void 0 ? void 0 : user.get('name'),
            email: user === null || user === void 0 ? void 0 : user.get('email'),
            role: user === null || user === void 0 ? void 0 : user.get('roles'),
        };
        const sesiondata = {
            token: yield (0, handlejwt_1.tokenSign)(user),
            user: userData
        };
        res.status(201).send({ sesiondata });
    }
    catch (error) {
        console.log(error);
        (0, handleError_1.handleHttpError)(res, "ERROR_REGISTER_USER");
    }
});
exports.registerController = registerController;
const loginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //req = matchedData(req);
        const userEmail = req.body.email;
        const loginPassword = req.body.password;
        const user = yield UserModel_1.default.findOne({ where: { email: userEmail } });
        //💥OTRO ANY POR AQUÍII
        if (!user) {
            (0, handleError_1.handleHttpError)(res, "USER_NOT_EXISTS", 404);
        }
        const userData = {
            id: user === null || user === void 0 ? void 0 : user.get('id'),
            name: user === null || user === void 0 ? void 0 : user.get('name'),
            email: user === null || user === void 0 ? void 0 : user.get('email'),
            role: user === null || user === void 0 ? void 0 : user.get('roles'),
        };
        const hashPassword = user === null || user === void 0 ? void 0 : user.get('password');
        const check = yield (0, handlePassword_1.compare)(loginPassword, hashPassword);
        if (!check) {
            (0, handleError_1.handleHttpError)(res, "PASSWORD_INVALID", 401);
        }
        //user?.set('password', undefined, {strict:false})
        const sesiondata = {
            token: yield (0, handlejwt_1.tokenSign)(user),
            user: userData
        };
        res.send({ sesiondata });
    }
    catch (error) {
        if (!res.headersSent) {
            (0, handleError_1.handleHttpError)(res, "ERROR_LOGIN_USER", 401);
        }
    }
});
exports.loginController = loginController;
