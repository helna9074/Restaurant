import User from "./User.js";
import { createUser, DeleteUser, GetAllUsers, GetMeUser, LoginUser, SignupAdmin, UpdateTheUser } from "./UserService.js";

export const SignAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ message: "all fields required" });
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "this email is taken" });
    }
    const user= await SignupAdmin(username, email, password);
    return res.status(201).json({ message: "Singup successfully",username:user.username });
  } catch (err) {
    return res.status(500).json({ message: "internal server error" });
  }
};
export const SignUser = async (req, res) => {
  try {
    console.log("creating user")
    const {  email, password,employeeId,branchId } = req.body;
    if (!branchId || !email || !password||!employeeId)
      return res.status(400).json({ message: "all fields required" });
    const existing = await User.findOne({ employee:employeeId });
    if (existing) {
      return res.status(400).json({ message: "this user  already  exists" });
    }
    const user= await createUser( email, password,employeeId,branchId);
    return res.status(201).json({ message: "Singup successfully",user });
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "internal server error" });
  }
};
export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(req.body)
    if (!email?.trim() || !password?.trim())
      return res.status(400).json({ message: "email and password required" });

    const {user,token} = await LoginUser({email, password});
    res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite:"lax",
        maxAge:24*60*60*1000
    })
    return res.status(200).json({ message: "login successfully",role:user.role,username:user.username });
  } catch (error) {
    console.log(error)
    return res.status(400).json({message:error.message });
  }
};
export const GetMe=async(req,res)=>{

    try{
        if(!req.user.id) return res.status(400).json({message:"id is required"})
       const user=await GetMeUser(req.user.id)
       if(!user){
        return res.status(404).json({message:"user not found"})
       
       }
        res.json(user)
    }catch(error){
        return res.status(500).json({message:"internal server error"})

    }
}
export const GetUsers=async(req,res)=>{
  try{
    const {branchId,search}=req.query
    console.log("this is the branchId and search ",req.query)
    if(!branchId)
      return res.status(400).json({message:"enter branchId"})
    const data=await GetAllUsers(branchId,search)
    console.log("this is the response",data)
    return res.status(200).json({message:"fetched successfully",data})

  }catch(err){
    return res.status(500).json({message:"internal server error"})
  }
}
export const UpdateUser=async(req,res)=>{
  try{
    const {id,data}=req.body
    if(!id)
      return res.status(400).json({message:"id is required"})
    const result=await UpdateTheUser(id,data)
    return res.status(200).json({message:"fetched sucessfully",result})
  }catch(err){
    return res.status(500).json({message:"internal server error"})
  }
}
export const DeleteUsers=async(req,res)=>{
  const {id}=req.params
  if(!id) return res.status(400).json({message:"id is required"})
  try{
    const data=await DeleteUser(id)
  }catch(err){
        return res.status(500).json({message:"internal server error"})
  }
}