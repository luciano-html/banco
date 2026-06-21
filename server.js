import express from "express"
import 'dotenv/config'
import { connectDB } from "./src/server/connection/db.js"
import router from "./src/server/server.routes.js"

const app = express()
const PORT = process.env.PORT

app.use(express.json())
app.use("/",router)
await connectDB()

app.listen(PORT, ()=>{
    console.log('Servidor corriendo en puerto: ',PORT);
})
