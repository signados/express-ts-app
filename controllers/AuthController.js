"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.registerController = void 0;
var handlePassword_1 = require("../utils/handlePassword");
var UserModel_1 = require("../models/UserModel");
var handleError_1 = require("../utils/handleError");
var handlejwt_1 = require("../utils/handlejwt");
var registerController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, newPassword, passwordHash, newUser, user, userData, sesiondata, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                data = req.body;
                newPassword = data.password;
                return [4 /*yield*/, (0, handlePassword_1.encrypt)(newPassword)];
            case 1:
                passwordHash = _b.sent();
                newUser = __assign(__assign({}, data), { password: passwordHash });
                console.log(newUser);
                return [4 /*yield*/, UserModel_1.default.create(newUser)];
            case 2:
                user = _b.sent();
                userData = {
                    id: user === null || user === void 0 ? void 0 : user.get('id'),
                    name: user === null || user === void 0 ? void 0 : user.get('name'),
                    email: user === null || user === void 0 ? void 0 : user.get('email'),
                    role: user === null || user === void 0 ? void 0 : user.get('role'),
                };
                _a = {};
                return [4 /*yield*/, (0, handlejwt_1.tokenSign)(user)];
            case 3:
                sesiondata = (_a.token = _b.sent(),
                    _a.user = userData,
                    _a);
                res.status(201).send({ sesiondata: sesiondata });
                return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                console.log(error_1);
                (0, handleError_1.handleHttpError)(res, "ERROR_REGISTER_USER");
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.registerController = registerController;
var loginController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userEmail, loginPassword, user, userData, hashPassword, check, sesiondata, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                userEmail = req.body.email;
                loginPassword = req.body.password;
                return [4 /*yield*/, UserModel_1.default.findOne({ where: { email: userEmail } })];
            case 1:
                user = _b.sent();
                //💥OTRO ANY POR AQUÍII
                if (!user) {
                    (0, handleError_1.handleHttpError)(res, "USER_NOT_EXISTS", 404);
                }
                userData = {
                    id: user === null || user === void 0 ? void 0 : user.get('id'),
                    name: user === null || user === void 0 ? void 0 : user.get('name'),
                    email: user === null || user === void 0 ? void 0 : user.get('email'),
                    role: user === null || user === void 0 ? void 0 : user.get('role'),
                };
                hashPassword = user === null || user === void 0 ? void 0 : user.get('password');
                return [4 /*yield*/, (0, handlePassword_1.compare)(loginPassword, hashPassword)];
            case 2:
                check = _b.sent();
                if (!check) {
                    (0, handleError_1.handleHttpError)(res, "PASSWORD_INVALID", 401);
                }
                _a = {};
                return [4 /*yield*/, (0, handlejwt_1.tokenSign)(user)];
            case 3:
                sesiondata = (_a.token = _b.sent(),
                    _a.user = userData,
                    _a);
                res.send({ sesiondata: sesiondata });
                return [3 /*break*/, 5];
            case 4:
                error_2 = _b.sent();
                if (!res.headersSent) {
                    (0, handleError_1.handleHttpError)(res, "ERROR_LOGIN_USER", 401);
                }
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.loginController = loginController;
