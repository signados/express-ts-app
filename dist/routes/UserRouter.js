"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const AuthController_1 = require("../controllers/AuthController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const rolMiddleware_1 = require("../middleware/rolMiddleware");
const userRouter = (0, express_1.Router)();
userRouter.post("/register", AuthController_1.registerController);
userRouter.post("/login", AuthController_1.loginController);
userRouter.get("/users", authMiddleware_1.authMiddleware, (0, rolMiddleware_1.checkRol)(["admin"]), UserController_1.default.getUsers);
userRouter.get("/users/:id", authMiddleware_1.authMiddleware, (0, rolMiddleware_1.checkRol)(["admin"]), UserController_1.default.getUser);
userRouter.patch("/users/:id", authMiddleware_1.authMiddleware, (0, rolMiddleware_1.checkRol)(["admin"]), UserController_1.default.updateUser);
userRouter.delete("/users/:id", authMiddleware_1.authMiddleware, (0, rolMiddleware_1.checkRol)(["admin"]), UserController_1.default.deleteUser);
exports.default = userRouter;
