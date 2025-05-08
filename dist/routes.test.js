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
const app_1 = __importDefault(require("./app"));
const db_1 = require("./db");
const request = supertest_1.default;
// set user details
const dummyUser = {
    // id:'17',
    name: 'sentinel_val',
    email: 'sentinel@gmail.com',
    password: 'Sentinel@25'
};
describe('[routes setup]', () => {
    // setup the teardown
    beforeAll(() => {
        db_1.pool.query(`DELETE FROM users;`);
    });
    // afterAll(()=>{
    //     pool.query(
    //         `DELETE FROM users;`
    //     )
    // })
    describe('1.user registration endpoint', () => {
        test('register new users with name,email and password', () => __awaiter(void 0, void 0, void 0, function* () {
            // 1.arrange 2.act 3.assert            
            const registerUser = yield request(app_1.default).post('/register').send(dummyUser);
            expect(registerUser.statusCode).toBe(200);
            expect(registerUser.body).toBeDefined();
            expect(registerUser.body).toEqual({
                success: 'You have successfuly created a new user!'
            });
        }));
    });
    describe('2.user login endpoint', () => {
        test('login existing users with valid name and password', () => __awaiter(void 0, void 0, void 0, function* () {
            // 1.arrange 2.act 3.assert
            const loginUser = yield request(app_1.default).post('/login').send(dummyUser);
            expect(loginUser.statusCode).toBe(200);
            expect(loginUser.body).toMatchObject({
                success: 'You have successfuly logged in!',
            });
        }));
        test('failing test for incorrect username and password', () => __awaiter(void 0, void 0, void 0, function* () {
            // 1.arrange 2.act 3.assert
            const wrongUser = {
                name: 'qwert',
                email: 'qwerty@gmai.com',
                password: 'Qwerty25'
            };
            const loginUser = yield request(app_1.default).post('/login').send(wrongUser);
            expect(loginUser.statusCode).toBe(400);
            expect(loginUser.body).toMatchObject({
                error: 'Incorect username or password, try again?'
            });
        }));
    });
    describe('3.get specific user with an id', () => {
        test('valid id will return existing user', () => __awaiter(void 0, void 0, void 0, function* () {
            // 1.arrange 2.act 3.assert
            const [getThisId] = yield db_1.pool.query(`SELECT * FROM users WHERE name='${dummyUser.name}';`);
            const user = getThisId;
            const id = user[0].id;
            const getUserById = yield request(app_1.default).get(`/get/'${id}'`);
            expect(getUserById.statusCode).toBe(200);
            expect(getUserById.body).toMatchObject({
                success: 'Here is the user: '
            });
        }));
        test('failing test with invalid id that returns an error', () => __awaiter(void 0, void 0, void 0, function* () {
            const id = (Math.random() * 100).toFixed();
            // console.log(id)
            const getUserById = yield request(app_1.default).get(`/get/${id}`);
            expect(getUserById.statusCode).toBe(400);
            expect(getUserById.body).toMatchObject({
                error: 'There is no user with that id. Try again?'
            });
        }));
    });
    describe('4.update user details', () => {
        test('update user credentials with valid id', () => __awaiter(void 0, void 0, void 0, function* () {
            // 1.arrange 2.act 3.assert
            const [getThisId] = yield db_1.pool.query(`SELECT * FROM users WHERE name='${dummyUser.name}';`);
            const user = getThisId;
            const id = user[0].id;
            const newUser = {
                name: 'Sir Lancelot',
                email: 'lance@gmail.com',
                password: 'Lance@25'
            };
            const updateUser = yield request(app_1.default).patch(`/update/${id}`).send(newUser);
            expect(updateUser.statusCode).toBe(200);
            expect(updateUser.body).toBeDefined();
            expect(updateUser.body).toMatchObject({
                success: 'You have successfully updated your details: '
            });
        }));
        test('invalid id user id throws an error', () => __awaiter(void 0, void 0, void 0, function* () {
            // 1.act 2.arrage 3.assert
            const id = (Math.random() * 100).toFixed();
            // console.log(id)
            const newUser = {
                name: 'Sir Lancelot',
                email: 'lance@gmail.com',
                password: 'Lance@25'
            };
            const updateUser = yield request(app_1.default).patch(`/update/${id}`).send(newUser);
            expect(updateUser.statusCode).toBe(400);
            expect(updateUser.body).toMatchObject({
                error: 'Failed updating details, try again?'
            });
        }));
    });
    describe('5.get all users in system endpoint', () => {
        test('return users if present in system', () => __awaiter(void 0, void 0, void 0, function* () {
            // 1.act 2.arrange 3.assert
            const getUsers = yield request(app_1.default).get('/get-users');
            expect(getUsers.statusCode).toBe(200);
            expect(getUsers.body).toBeDefined();
            expect(getUsers.body).toMatchObject({
                success: 'All users in db: '
            });
        }));
        test('failing test that returns error if no users in system', () => __awaiter(void 0, void 0, void 0, function* () {
            // 1.act 2.arrange 3.assert
            const getUsers = yield request(app_1.default).get('/get-users');
            expect(getUsers.statusCode).toBe(400);
            expect(getUsers.body).toMatchObject({
                error: 'Currently no users in the db.'
            });
        }));
    });
    describe('6.delete a user from system', () => {
        // setup teardown
        // restore original dummy user
        beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
            const registerUser = yield request(app_1.default).post(`/register`).send(dummyUser);
        }));
        test('delete user from system with valid id', () => __awaiter(void 0, void 0, void 0, function* () {
            // 1.arrange 2.act 3.assert
            const [getThisId] = yield db_1.pool.query(`SELECT * FROM users WHERE name='${dummyUser.name}';`);
            const user = getThisId;
            const id = user[0].id;
            const deleteUser = yield request(app_1.default).delete(`/delete/${id}`);
            expect(deleteUser.statusCode).toBe(200);
            expect(deleteUser.body).toMatchObject({
                success: 'You have successfuly deleted your account!'
            });
        }));
        test('deleting user with invalid will throw an erorr', () => __awaiter(void 0, void 0, void 0, function* () {
            // 1.arrange 2.act 3.assert
            const id = (Math.random() * 100).toFixed();
            const deleteUser = yield request(app_1.default).delete(`/delete/${id}`);
            expect(deleteUser.statusCode).toBe(400);
            expect(deleteUser.body).toMatchObject({
                error: 'That user does not exist, try again?'
            });
        }));
    });
});
