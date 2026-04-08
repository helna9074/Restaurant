import { loginuser } from "@/types/user"
import API from "./axiosInstance"
import { LoginForm } from "@/Schemas/LoginSchema"


export const LoginUser=async(data:LoginForm)=>{
    try{
        console.log("this is the data getted in loginuser",data)
     const res=await API.post<loginuser>("/user/login",data)
     return res.data
    }catch(error){
        console.log("this is the error",error)
    }
}

export const getMe=async()=>{
    const res=await API.get("/user/me")
    return res.data
}