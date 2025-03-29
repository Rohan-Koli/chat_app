import User from "../models/userModel.js"
import Message from "../models/messageModel.js"
import cloudinary from "../lib/cloudinary.js"
import { getReceiverSocketId,io } from "../lib/socket.js"
export const getUsersForSidebar =async (req,res)=>{
    try {
        const loggedInUserId = req.user._id
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password")

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Errro in getUsersForSidebar ",error.message)
        res.status(500).json({message:"Internal erver error"})
    }
}

export const getMessages = async(req,res)=>{
    try {
        const {id: receiverId} = req.params
        const myId = req.user._id

        const messages = await Message.find({
            $or:[
                {senderId:myId,receiverId:receiverId},
                {senderId:receiverId,receiverId:myId}
            ]
        })
        
        res.status(200).json(messages)
    } catch (error) {
        console.log("Errro in getMessages ",error.message)
        res.status(500).json({message:"Internal erver error"})
    }
}

export const sendMessage = async(req,res)=>{
    try {
        const {text,image}= req.body
        const {id:receiverId} = req.params
        const senderId = req.user._id

        let imageUrl
        if(image){
    
            const uploadResponse = await cloudinary.uploader.upload(image)
    
            imageUrl = uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId, 
            receiverId,
            text,
            image:imageUrl
        })

        await newMessage.save()

        const receiverSocketId = getReceiverSocketId(receiverId)
        console.log("reciever Id = ",receiverSocketId)
        if(receiverSocketId){
            io.to(receiverId).emit("newMessage",newMessage)
            console.log("reciever Id = ",receiverSocketId)
        }
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Errro in sendMessage ",error)
        res.status(500).json({message:"Internal erver error"})
    }
}