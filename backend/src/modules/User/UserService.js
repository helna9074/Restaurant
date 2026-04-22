import User from "./User.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
export const SignupAdmin=async(username,email,password)=>{
  const hashPass=await bcrypt.hash(password,10)
  const user= await User.create({
    username,
    email,
    password:hashPass,
    role:"admin"
  })
 
  return user
}

export const LogintheUser=async({email,password})=>{
  console.log("reached",email,password)
  const user=await User.findOne({email})
  if(!user){
    throw new Error("no user found")
  }
  const isMatch=await bcrypt.compare(password,user.password)
  if(!isMatch){
   throw new Error("invalid credintials")
  }
   const token=jwt.sign({
    id:user._id,
    role:user.role,
  },process.env.SECRET_KEY,{expiresIn:"1d"})

   return {user,token}
}
export const GetMeUser=async(id)=>{
   const response=await User.findById(id).select("username role").lean()
   return response
}