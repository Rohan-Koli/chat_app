import Router from "express"
import {login,logout,signin,updateProfile,checkAuth} from "../controllers/authControllers.js"
import { protectRoute } from "../middlewares/auth.js"

const authRouter = Router()

authRouter.post("/logout",logout)
authRouter.post("/login",login)
authRouter.post("/signup",signin)
authRouter.put("/update-profile",protectRoute,updateProfile)
authRouter.get("/check",protectRoute,checkAuth)

export default authRouter