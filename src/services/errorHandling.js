 
export const asyncHandler= (fun)=>{
return (req,res,next)=>{

    fun(req,res,next).catch(err=>{
        next(new Error(err,{cause:500})) 
    })
}
}
export const globalErrorHandling = (err,req,res,next)=>{
    if(err){
        if(process.env.MODE == "dev"){
            return res.status(err['cause'] || 500).json({message:err.message,stack:err.stack})

        }else{
            return res.status(err['cause'] || 500).json({message:err.message})

        }
    }
}