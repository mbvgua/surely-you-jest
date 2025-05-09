import supertest from "supertest";
import app from "./app";
import { Users } from "./models";
import { pool } from "./db";

const api = supertest(app)

// set user details
const dummyUser:Users = {
    // id:'17',
    name:'sentinel_val',
    email:'sentinel@gmail.com',
    password:'Sentinel@25'
}

// setup the teardown
beforeAll(()=>{
    // use a test pool
    pool.query(
        `DELETE FROM users;`
    )
})

afterAll(()=>{
    pool.query(
        `DELETE FROM users;`
    )
})


describe('[routes setup]', ()=>{

    describe('1.user registration endpoint', ()=>{

        test('register new users with name,email and password', async()=>{
            // 1.arrange 2.act 3.assert            
            const registerUser = await api.post('/register').send(dummyUser)
            expect(registerUser.statusCode).toBe(200)
            expect(registerUser.body).toBeDefined()
            expect(registerUser.body).toEqual({
                success:'You have successfuly created a new user!'
            })
        })

        test('user data in database matches the dummyUser values', async()=>{
            // 1.arrange 2.act 3.assert
            const [rows] = await pool.query(
                `SELECT * FROM users WHERE name='${dummyUser.name}';`
            )
            const user = rows as Array<Users>
            expect(user).toBeDefined()
            expect(user[0].name).toBe(`${dummyUser.name}`)
            expect(user[0].email).toBe(`${dummyUser.email}`)
            expect(user[0].password).toBe(`${dummyUser.password}`)
            
        })
    
    })


    describe('2.user login endpoint', ()=>{

        test('login existing users with valid name and password', async()=>{
            // 1.arrange 2.act 3.assert
            const loginUser = await api.post('/login').send(dummyUser)
            expect(loginUser.statusCode).toBe(200)
            expect(loginUser.body).toMatchObject({
                    success:'You have successfuly logged in!',
            })

        })

        test('failing test for incorrect username and password', async()=>{
            // 1.arrange 2.act 3.assert
            const wrongUser:Users = {
                name:'qwert',
                email:'qwerty@gmai.com',
                password:'Qwerty25'
            }
            const loginUser = await api.post('/login').send(wrongUser)
            expect(loginUser.statusCode).toBe(400)
            expect(loginUser.body).toMatchObject({
                error:'Incorect username or password, try again?'
            })
        })

    })


    describe('3.get specific user with an id', ()=>{

        test('valid id will return existing user', async()=>{
            // 1.arrange 2.act 3.assert
            const [rows] = await pool.query(
                `SELECT * FROM users WHERE name='${dummyUser.name}';`
            )
            const user = rows as Array<Users>
            const id = user[0].id

            const getUserById = await api.get(`/get/'${id}'`)

            expect(getUserById.statusCode).toBe(200)
            expect(getUserById.body).toMatchObject({
                success:'Here is the user: '
            })

        })

        test('failing test with invalid id that returns an error', async()=>{
            const id = (Math.random()*100).toFixed()
            // console.log(id)
            const getUserById = await api.get(`/get/${id}`)
            
            expect(getUserById.statusCode).toBe(400)
            expect(getUserById.body).toMatchObject({
                error:'There is no user with that id. Try again?'
            })

        })

    })

    describe('4.update user details', ()=>{

        test('update user credentials with valid id', async()=>{
            // 1.arrange 2.act 3.assert
            const [rows] = await pool.query(
                `SELECT * FROM users WHERE name='${dummyUser.name}';`
            )
            const user = rows as Array<Users>
            const id = user[0].id

            const newUser:Users = {
                name:'Sir Lancelot',
                email:'lance@gmail.com',
                password:'Lance@25'
            }

            const updateUser = await api.patch(`/update/${id}`).send(newUser)
            expect(updateUser.statusCode).toBe(200)
            expect(updateUser.body).toBeDefined()
            expect(updateUser.body).toMatchObject({
                success:'You have successfully updated your details: '
            })

        })

        test('invalid id user id throws an error', async()=>{
            // 1.act 2.arrage 3.assert
            const id = (Math.random()*100).toFixed()
            // console.log(id)
            const newUser:Users = {
                name:'Sir Lancelot',
                email:'lance@gmail.com',
                password:'Lance@25'
            }

            const updateUser = await api.patch(`/update/${id}`).send(newUser)
            expect(updateUser.statusCode).toBe(400)
            expect(updateUser.body).toMatchObject({
                error:'Failed updating details, try again?'
            })
        })

    })

    describe('5.get all users in system endpoint', ()=>{

        test('return users if present in system', async()=>{
            // 1.act 2.arrange 3.assert
            const getUsers = await api.get('/get-users')
            expect(getUsers.statusCode).toBe(200)
            expect(getUsers.body).toBeDefined()
            expect(getUsers.body).toMatchObject({
                success:'All users in db: '
            })

        })

        test('failing test that returns error if no users in system', async()=>{
            // 1.act 2.arrange 3.assert
            const getUsers = await api.get('/get-users')
            expect(getUsers.statusCode).toBe(400)
            expect(getUsers.body).toMatchObject({
                error:'Currently no users in the db.'
            })
            
        })
    })


    describe('6.delete a user from system', ()=>{
        // setup teardown
        // restore original dummy user
        beforeEach(async()=>{
            const registerUser = await api.post(`/register`).send(dummyUser)
        })

        test('delete user from system with valid id', async()=>{
            // 1.arrange 2.act 3.assert
            const [rows] = await pool.query(
                `SELECT * FROM users WHERE name='${dummyUser.name}';`
            )
            const user = rows as Array<Users>
            const id = user[0].id

            const deleteUser = await api.delete(`/delete/${id}`)
            expect(deleteUser.statusCode).toBe(200)
            expect(deleteUser.body).toMatchObject({
                success:'You have successfuly deleted your account!'
            })
        })

        test('deleting user with invalid will throw an erorr', async()=>{
            // 1.arrange 2.act 3.assert
            const id = (Math.random()*100).toFixed()
            const deleteUser = await api.delete(`/delete/${id}`)
            expect(deleteUser.statusCode).toBe(400)
            expect(deleteUser.body).toMatchObject({
                error:'That user does not exist, try again?'
            })
        })
    })


})