import { Router } from "express";
const router = Router()




router.get('/', (req ,res)=>{
    res.status(200).json({message:"product Module"})
})




export default router