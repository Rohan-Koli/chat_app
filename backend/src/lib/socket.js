import {Server} from "socket.io"
import express from "express"
import htttp from "http"
import { connect } from "http2"

const app = express()
const server = htttp.createServer(app)

const io =new Server(server,{
    cors:{
        origin:["http://localhost:5173"]
    }
})


export function getReceiverSocketId(userId) {
    userId = String(userId);
   
    if(Object.keys(userSocketMap)[0] === userId){
       
        return Object.values(userSocketMap)[0]
    } 
    // return userSocketMap[userId]
}

// used to store online users
const userSocketMap = {}


io.on("connection",(socket)=>{
   
    
    const userId = socket.handshake.query.userId
    
    if(userId) userSocketMap[userId] =socket.id
    io.emit("getOnlineUsers",Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
        delete userSocketMap[userId]
        io.emit("getOnlineUsers",Object.keys(userSocketMap))
    })
})

export {io,app,server}