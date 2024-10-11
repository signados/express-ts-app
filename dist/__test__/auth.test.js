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
const supertest_1 = __importDefault(require("supertest"));
const server_1 = require("../server");
const UserModel_1 = __importDefault(require("../models/UserModel"));
const db_1 = __importDefault(require("../database/db"));
const helperTestData_1 = require("./helpers/helperTestData");
describe("AUTH api/auth", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield db_1.default.authenticate();
        // await UserModel.destroy({where:{ email: testAuthLogin.email}});
    }));
    test("When the user makes a successful registration should be return 201", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).post('/api/register').send(helperTestData_1.testAuthRegister);
        expect(response.statusCode).toEqual(201);
        expect(response.body).toHaveProperty("sesiondata");
    }));
    test("When the user login with an incorrect password it throws an error PASSWORD_INVALID", () => __awaiter(void 0, void 0, void 0, function* () {
        const newTestAuthLogin = Object.assign(Object.assign({}, helperTestData_1.testAuthRegister), { password: "wrong password" });
        const response = yield (0, supertest_1.default)(server_1.app)
            .post("/api/login")
            .send(newTestAuthLogin);
        expect(response.statusCode).toEqual(401);
        expect(response.body.error).toContain("PASSWORD_INVALID");
    }));
    test("when user doesn't exist throws an error USER_NOT_EXISTS", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(server_1.app).post('/api/login')
            .send(helperTestData_1.UnregisteredUser);
        expect(response.statusCode).toEqual(404);
        expect(response.body).toHaveProperty("error");
        expect(response.body.error).toContain("USER_NOT_EXISTS");
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const userEmail = helperTestData_1.testAuthRegister.email;
        const USER_EMAIL = userEmail.toString();
        yield UserModel_1.default.destroy({ where: { email: USER_EMAIL } });
        yield db_1.default.close();
    }));
});
