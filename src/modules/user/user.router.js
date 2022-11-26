import { Router } from "express";
import { auth } from "../../middleware/auth.js";
import { endPoint } from "./user.endPoint.js";
const router = Router()




router.get('/',auth(endPoint.profile), (req ,res)=>{
    res.status(200).json({message:"Done",user:req.user })
})




export default router