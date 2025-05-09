import app from "./app";
import supertest from "supertest";

const request = supertest

describe("[app setup]", ()=>{

    test("the server is running", async()=>{
        expect(app).toBeDefined()
    })

    // database connection is successful

    test("unkown routes get 404 error handler", async()=>{
        const randomn_string = 'qwewrqdasas'
        const response = await request(app).get(`/${randomn_string}`)
        expect(response.statusCode).toBe(404)
    })

    // parse-json in request body
})