import jwt from 'jsonwebtoken'


export const Authorization=async(req,res,next)=>{
    try{
         const token=req.cookies.token
         if(!token) return res.status(401).json({message:"not authorized ,no token",errorCode:"No_TOKEN"})
            const decode=jwt.verify(token,process.env.SECRET_KEY)
            req.user=decode
             next()
    }catch(error){
     console.log("jwt error",error.message)
     return res.status(401).json({message:"jwt errror"})
    }
}