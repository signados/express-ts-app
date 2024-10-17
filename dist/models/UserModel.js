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
exports.UserModel = void 0;
const db_1 = __importDefault(require("../database/db"));
const sequelize_1 = require("sequelize");
exports.UserModel = db_1.default.define('user', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'el campo email no puede estar vacío'
            },
        }
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'el campo password no puede estar vacío'
            },
        }
    },
    roles: {
        type: sequelize_1.DataTypes.JSON, // Cambia el tipo a JSON para que soporte estructuras JSON
        defaultValue: ['user'], // Valor por defecto, un array con 'user'
        allowNull: false, // Opcional, para asegurar que no haya valores nulos
    },
}, {
    timestamps: false
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db_1.default.sync({ alter: true });
    // console.log("All models were synchronized successfully.");
}))();
exports.default = exports.UserModel;
