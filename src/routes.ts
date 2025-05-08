import { Request,Response } from "express";
import { Router } from "express";
import { pool } from './db'
import { Users } from "./models";

const router = Router()


// registerUser
router.post('/register', async(request:Request, response:Response)=>{
    try {
        const {name,email,password} = request.body
        const registerUser = await pool.query(
            `INSERT INTO users VALUES(
            DEFAULT,
            '${name}',
            '${email}',
            '${password}'
            );`
        )
        return response.status(200).json({success:'You have successfuly created a new user!'})
        
    } catch (error) {
        return response.status(500).json({error:error})
    }
})


// loginUser
router.post('/login', async(request:Request, response:Response)=>{
    try {
        const {name,password} = request.body
        const [loginUser] = await pool.query(
            `SELECT * FROM users WHERE
             name='${name}' AND password='${password}';`
        )
        const user = loginUser as Array<Users>
        if (user && user.length > 0){
            return response.status(200).json({success:'You have successfuly logged in!'})
        }
        return response.status(200).json({error:'Incorect username or password, try again?'})
    } catch (error) {
        return response.status(500).json({error:error})
    }
})


// getUsers
router.get('/get-users',async (request:Request, response:Response) =>{
    try {
        const [getUsers] = await pool.query(
            `SELECT * FROM users;`
        )
        const users = getUsers as Array<Users>
        if (users && users.length > 0){
            return response.status(200).json({success:'All users in db: ',users})
        }
        return response.status(400).json({success:'Currently no users in the db.'})
        
    } catch (error) {
        return response.status(500).json({error:error})
    }
})


// getUserById
router.get('/get/:id',async(request:Request<{id:string}>, response:Response) =>{
    const id = request.params.id
    try {
        const [getUserById] = await pool.query(
            `SELECT * FROM users WHERE id=${id};`
        )
        const user = getUserById as Array<Users>
        if (user && user.length > 0){
            return response.status(200).json({success:'Here is the user: ',user})
        }
        return response.status(400).json({error:'There is no user with that id. Try again?'})
        
    } catch (error) {
        return response.status(500).json({error:error})
    }    
})


// updateUser
router.patch('/update/:id',async(request:Request<{id:string}>,response:Response) =>{
    try {
        const id = request.params.id
        const {name,email,password} = request.body
        const [updateUser] = await pool.query(
            `SELECT * FROM users WHERE id='${id}';`
        )
        const user = updateUser as Array<Users>

        if (user.length > 0){
            await pool.query(
                `UPDATE users SET 
                name='${name}',
                email='${email}',
                password='${password}' 
                WHERE id='${id}'
                ;`
            )
            return response.status(200).json({success:'You have successfully updated your details: '})
        }
        return response.status(400).json({error:'Failed updating details, try again?'})
    } catch (error) {
        return response.status(500).json({error:error})
    }
})


// deleteUser
router.delete('/delete/:id',async(request:Request<{id:string}>,response:Response) =>{
    try {
        const id = request.params.id
        const [deleteUser] = await pool.query(
            `SELECT * FROM users WHERE id=${id};`
        )
        const user = deleteUser as Array<Users>
        if(user.length > 0){
            await pool.query(
                `DELETE FROM users WHERE id=${user[0].id};`
            )
            return response.status(200).json({success:'You have successfuly deleted your account!'})
        }
        return response.status(400).json({error:'That user does not exist, try again?'})
        
    } catch (error) {
        return response.status(500).json({error:error})
    }
})


// 404 routes
router.get('*', async(request:Request, response:Response) =>{
    response.status(404).json({error:'Oops! Route does not exist. Try something different?'})
})

export default router