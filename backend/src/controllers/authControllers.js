import { generateToken } from "../lib/utils.js"
import User from "../models/userModel.js"
import bcryptjs, { getSalt } from "bcryptjs"
import cloudinary from "../lib/cloudinary.js"
export const login = async(req,res)=>{
    try {
        const {email, password} = req.body
         if(!email || !password){
            return res.status(400).json({
                message:"All feilds are required"
            })
         }
         const user = await User.findOne({email})
         if(!user){
            return res.status(404).json({
                message:"Email does not exits"
            })
         }
         const correctPassword = await bcryptjs.compare(password,user.password)
         if(!correctPassword){
            return res.status(400).json({
                message:"Invalid credentials"
            })
         }
         generateToken(user._id,res)
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            messsage:"Can not login",
            error:error.messsages,
            status:0
        })
    }
}

export const signin = async(req,res)=>{
    try {
        const {fullName,email,password} = req.body
        if(!fullName || !email || !password){
            return res.satus(400).json({
                status:0,
                messsage:"name email and passsword is required"
            })
        }
        if(password.length < 6){
            return res.status(400).json({
                message:"Password must be greater than 6 characters"
            })
        }
        const isExists = await User.findOne({email})
        if(isExists){
            return res.status(400).json({
                status:0,
                message:"this mail already exists"
            })
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)
        const newUser = await User({fullName,email,password:hashedPassword})
        if(newUser){
            generateToken(newUser._id,res)
            await newUser.save()
            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic
            })
        }else{
            res.status(400).json({
                message:"Invaid User data"
            })
        }
    } catch (error) {
        (error)
        return res.status(500).json({
            messsage:"Internal Server Error",
            error:error.messsage,
            status:0
        })
    }
}

export const logout = async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({
            message:"User logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            messsage:"Internal server error",
            error:error.messsage,
            status:0
        })
    }
}

export const updateProfile= async(req,res)=>{
    try {
        const {profilePic} = req.body
        const userId = req.user._id

        if(!profilePic){
            return res.status(404).json({message:"Profile pic is required"})
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic:uploadResponse.secure_url},{new:true})

        res.status(200).json({updatedUser})
    } catch (error) {
        res.status(500).json({
            messsage:"Internal Server error",
            error:error.message
        })
    }
}


export const checkAuth = async(req,res)=>{
    try {
        return res.status(200).json(req.user)
    } catch (error) {
        console.log("Error = ",error.message)
        res.status(500).json({message:"Internal Server error"})
    }
}

