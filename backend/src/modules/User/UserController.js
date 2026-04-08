import User from "./User.js";
import { GetMeUser, LogintheUser, SignupAdmin } from "./UserService.js";

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
export const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(req.body)
    if (!email?.trim() || !password?.trim())
      return res.status(400).json({ message: "email and password required" });

    const {user,token} = await LogintheUser({email, password});
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