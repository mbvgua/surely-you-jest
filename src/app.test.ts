import app from "./app";
import supertest from "supertest";
import { pool } from "./db";

const api = supertest(app)

describe("[app setup]", ()=>{

    test("the server is running", async()=>{
        expect(api).toBeDefined()
    })

    test('the database connection is successful', async()=>{
        const [rows]:any = await pool.query(
            `SELECT 1+1 as result;`
        )
        expect(rows[0]).toMatchObject({
            result:2
        })
    })

    test("unkown routes get 404 error handler", async()=>{
        const randomn_string = 'qwewrqdasas'
        const response = await api.get(`/${randomn_string}`)
        expect(response.statusCode).toBe(404)
    })

})