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
const app_1 = __importDefault(require("./app"));
const supertest_1 = __importDefault(require("supertest"));
const request = supertest_1.default;
describe("[app setup]", () => {
    test("the server is running", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(app_1.default).toBeDefined();
    }));
    // database connection is successful
    test("unkown routes get 404 error handler", () => __awaiter(void 0, void 0, void 0, function* () {
        const randomn_string = 'qwewrqdasas';
        const response = yield request(app_1.default).get(`/${randomn_string}`);
        expect(response.statusCode).toBe(404);
    }));
    // parse-json in request body
});
