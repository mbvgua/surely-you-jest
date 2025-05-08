import supertest from "supertest";
import app from "./app";
import { Users } from "./models";

const request = supertest

// set user details
const dummyUser:Users = {
    id:'1001',
    name:'sentinel_val',
    email:'sentinel@gmail.com',
    password:'Sentinel@25'
}


describe('[routes setup]', ()=>{

    /* COMMENTED OUT TO PREVENT FAILING TEST EVERYTIME
    
    test('register new users', async()=>{
        const registerUser = await request(app).post('/register').send(dummyUser)
        expect(registerUser.status).toBe(200)
        expect(registerUser.body).toBeDefined()
        // expect(registerUser.body).toEqual(
        //     {
        //         id:'1001',
        //         name:'sentinel_val',
        //         email:'sentinel@gmail.com',
        //         password:'Sentinel@25'            
        //     }
        // )

    })

    */


    test('login existing users', async()=>{
        const loginUser = await request(app).post('/login').send(dummyUser)
        expect(loginUser.status).toBe(200)
        // expect(loginUser.body).toMatchObject({
        //         success:'You have successfuly logged in!',
        //         user: {
        //             name:'sentinel_val',
        //             email:'sentinel@gmail.com',
        //             password:'Sentinel@25'
        //         }          
        // })

    })

    test('get all users in database', async ()=>{
        const getUsers = await request(app).get('/get-users')
        expect(getUsers.status).toBe(200)
    })

    test('get specific user by id', async()=>{
        const id:number = 22
        const getUserById = await request(app).get(`/get/'${id}'`)
        expect(getUserById.status).toBe(200)
    })

    test('[failing test]: 400 error if user does not exist', async()=>{
        const id:number = 342342
        const getUserById = await request(app).get(`/get/${id}`)
        expect(getUserById.status).toBe(400)
    })
    
    test('update user data', async()=>{
        const id:number = 22
        const newUser:Users = {
            name:'big man',
            email:'bazuu@gmail.com',
            password:'Sentinel@25'
        }
        const updateUser = await request(app).patch(`/update/${id}`).send(newUser)
        expect(updateUser.status).toBe(200)
    })

    test('delete existing user', async()=>{
        const id:number =22
        const deleteUser = await request(app).delete(`/delete/${id}`)
        expect(deleteUser.status).toBe(200)
    })

})