import { Router } from "express";
const router = Router()




router.get('/', (req ,res)=>{
    res.status(200).json({message:"Brand Module"})
})




export default router