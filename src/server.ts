import app from "./app";
import dotenv from 'dotenv'

const port = process.env.PORT

app.listen(port,()=>{
    console.log(`server is running on port http://localhost:${port}`)
})