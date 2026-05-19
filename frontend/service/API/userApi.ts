import { AddUserData, loginuser, UpdateUserData } from "@/types/user"
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
export const AddUser=async(data:AddUserData)=>{
    const res=await API.post("/user/create",data)
    return res.data
}
export const GetUsers=async(branchId:string,search="")=>{
    const res=await API.get("/user/users",{params:{branchId,search}})
    return res.data.data??[]
}
export const UpdateUser=async({id,data}:{id:string,data:UpdateUserData})=>{
const res=await API.put("/user/update",{id,data})
return res.data
    
}
export const DeleteUser=async(id:string)=>{
    const res=await API.delete(`/user/delete/${id}`)
    return res.data
}