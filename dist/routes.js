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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("./db");
const router = (0, express_1.Router)();
// registerUser
router.post('/register', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = request.body;
        const registerUser = yield db_1.pool.query(`INSERT INTO users VALUES(
            DEFAULT,
            '${name}',
            '${email}',
            '${password}'
            );`);
        return response.status(200).json({ success: 'You have successfuly created a new user!' });
    }
    catch (error) {
        return response.status(500).json({ error: error });
    }
}));
// loginUser
router.post('/login', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, password } = request.body;
        const [loginUser] = yield db_1.pool.query(`SELECT * FROM users WHERE
             name='${name}' AND password='${password}';`);
        const user = loginUser;
        if (user && user.length > 0) {
            return response.status(200).json({ success: 'You have successfuly logged in!' });
        }
        return response.status(400).json({ error: 'Incorect username or password, try again?' });
    }
    catch (error) {
        return response.status(500).json({ error: error });
    }
}));
// getUsers
router.get('/get-users', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [getUsers] = yield db_1.pool.query(`SELECT * FROM users;`);
        const users = getUsers;
        if (users && users.length > 0) {
            return response.status(200).json({ success: 'All users in db: ', users });
        }
        return response.status(400).json({ error: 'Currently no users in the db.' });
    }
    catch (error) {
        return response.status(500).json({ error: error });
    }
}));
// getUserById
router.get('/get/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const id = request.params.id;
    try {
        const [getUserById] = yield db_1.pool.query(`SELECT * FROM users WHERE id=${id};`);
        const user = getUserById;
        if (user && user.length > 0) {
            return response.status(200).json({ success: 'Here is the user: ', user });
        }
        return response.status(400).json({ error: 'There is no user with that id. Try again?' });
    }
    catch (error) {
        return response.status(500).json({ error: error });
    }
}));
// updateUser
router.patch('/update/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        const { name, email, password } = request.body;
        const [updateUser] = yield db_1.pool.query(`SELECT * FROM users WHERE id='${id}';`);
        const user = updateUser;
        if (user.length > 0) {
            yield db_1.pool.query(`UPDATE users SET 
                name='${name}',
                email='${email}',
                password='${password}' 
                WHERE id='${id}'
                ;`);
            return response.status(200).json({ success: 'You have successfully updated your details: ' });
        }
        return response.status(400).json({ error: 'Failed updating details, try again?' });
    }
    catch (error) {
        return response.status(500).json({ error: error });
    }
}));
// deleteUser
router.delete('/delete/:id', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = request.params.id;
        const [deleteUser] = yield db_1.pool.query(`SELECT * FROM users WHERE id=${id};`);
        const user = deleteUser;
        if (user.length > 0) {
            yield db_1.pool.query(`DELETE FROM users WHERE id=${user[0].id};`);
            return response.status(200).json({ success: 'You have successfuly deleted your account!' });
        }
        return response.status(400).json({ error: 'That user does not exist, try again?' });
    }
    catch (error) {
        return response.status(500).json({ error: error });
    }
}));
// 404 routes
router.get('*', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    response.status(404).json({ error: 'Oops! Route does not exist. Try something different?' });
}));
exports.default = router;
