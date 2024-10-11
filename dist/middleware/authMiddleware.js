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
exports.authMiddleware = void 0;
const handleError_1 = require("../utils/handleError");
const handlejwt_1 = require("../utils/handlejwt");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //primero, si no hay token que nos avise y nos mande un error
        if (!req.headers.authorization) {
            (0, handleError_1.handleHttpError)(res, "NEED_SESSION", 401);
            return;
        }
        //busca en las cabeceras el token y selecciona solo el string del token
        const token = req.headers.authorization.split(' ').pop();
        //con el handle que hemos creado *verifyToken()* ( que utiliza de la librería jwt) verificamos que es un token
        const dataToken = yield (0, handlejwt_1.verifyToken)(token);
        const userId = dataToken.id;
        // nuestra firma de token *tokenSign()* necesita un id para funcionar verificamos que esta y si no error.
        if (!userId) {
            (0, handleError_1.handleHttpError)(res, "ERROR_ID_TOKEN", 401);
        }
        //a través del id que trae el token sacamos la información del usuario y la ponemos a disposición de las request que este usuario pueda hacer
        //además de para saber el rol, hacer esto nos permite tener un control de trazabilidad, es decir, saber que usuario ha hecho cada petición.
        const user = yield UserModel_1.default.findByPk(dataToken.id);
        req.body.user = user;
        //si todo da ok que avance al paso siguiente
        next();
    }
    catch (error) {
        (0, handleError_1.handleHttpError)(res, "NOT_SESSION", 401);
    }
});
exports.authMiddleware = authMiddleware;
