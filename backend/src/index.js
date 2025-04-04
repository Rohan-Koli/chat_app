import express from "express"
import authRouter from "./routes/authRoutes.js"
import messageRouter from "./routes/messageRoutes.js"
import  dotenv from "dotenv"
import  {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser"
import cors from "cors"
import {app,server,io} from "./lib/socket.js"
import path from "path"

dotenv.config()
const PORT = process.env.PORT
const __dirname =path.resolve()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use("/api/auth",authRouter)
app.use("/api/messages",messageRouter)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../frontend/dist")));

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
    })
}

server.listen(PORT,()=>{
    (`Server running on port ${PORT}`)
    connectDB()
})