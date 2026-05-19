import { departmentPayload, departmentType, EmployeePayload, PersonalPayload, PositionPayload } from "@/types/department"
import API from "./axiosInstance"
import { PersonalFormData, WorkFormData } from "@/Schemas/departmentSchema"

export const AddDpt=async(data:{branches:string[],departments:string[]})=>{
    try{
    
   
        const result=await API.post('/dpt/add',{data})
        return result
    }catch(error){
      console.log("this is the error of adding",error)
      throw error
    }
}
export const GetAllDepartments=async(branchId:string,search:string)=>{
try{
    console.log("api is called and this si the branchId",branchId)

  const res=await API.get("dpt/alldpt",{params:{
    branchId,
    search
  }
  })
  console.log("...calling")
  console.log("this is the response we getted",res.data)
  console.log("this is the response ",res.data)
  return res.data.data
}catch(error){
  console.log("the error of getting",error)
  throw error
}

  



}
export const UpdateDpt=async({id,department}:departmentPayload)=>{
  try{
    const res=await API.put('dpt/update',{id,department})
     return res.data
  }catch(error){
    throw error
  }
}
export const DeleteDpt=async(id:string)=>{
  try{
    console.log("called")
    const res=await API.delete(`dpt/delete/${id}`)
    return res.data
  }catch(error){
    throw error
  }
}

export const UpdatePosition=async({id,department,position}:PositionPayload)=>{
  try{
    const res=await API.put('dpt/pos',{id,department,position})
     return res.data
  }catch(error){
    throw error
  }
}
export const DeletePosition=async(id:string)=>{
  try{
    console.log("called delete")
    const res=await API.delete(`dpt/pos/${id}`,)
    return res.data
  }catch(error){
    throw error
  }
}
export const AddPostion=async(data:{branch:string,positions:string[],department:string})=>{
    try{
      console.log("this is the addapi")
        const result=await API.post('/dpt/pos',{data})
        return result
    }catch(error){
      console.log("this is the error",error)
      throw error
    }
}
export const GetPositions=async(search="",branchId:string)=>{
  try{
    console.log("getPosition is loading",branchId)
    const res=await API.get("dpt/pos",{params:{branchId,search}})
    console.log("this is the response",res.data)
    return res.data

  }catch(error){
    console.log("this is the error on postion",error)
    throw error
  }
}
export const AddEmployee=async({branch,personal,work}:EmployeePayload)=>{
  try{
    console.log("calling the api")
    const res=await API.post('dpt/emp',{branch,personal,work})
    console.log("this is the response",res)
    return res.data
  }catch(error){
    console.log("this is the error",error)
    throw error
  }
}
export const GetEmployees=async(search="",branchId:string)=>{
  try{
    console.log("getEmployee is loading",branchId)
    const res=await API.get("dpt/emp",{params:{branchId,search}})
    console.log("this is the response",res.data)
    return res.data

  }catch(error){
    console.log(error)
    throw error
  }
}
export const GetEmpById=async(id:string)=>{
  try{
    console.log("getEmployee is loading",id)
    const res=await API.get(`dpt/emp/${id}`)
    console.log("this is the response",res.data)
    return res.data.result||null

  }catch(error){
    console.log(error)
    throw error
  }
}
export const UpdateEmployee=async({id,branch,personal,work}:{id:string;branch:string;personal:PersonalPayload|null;work:WorkFormData|null})=>{
  try{

    console.log("calling the updateing api")
    const res=await API.put(`dpt/emp/${id}`,{personal,work})
    console.log("this is the updatedresponse",res)
    return res.data
  }catch(error){
    console.log("this is the error",error)
    throw error
  }
} 
export const DeleteEmployee=async(id:string)=>{
  try{
    console.log("called delete")
    const res=await API.delete(`dpt/emp/${id}`,)
    return res.data
  }catch(error){
    throw error
  }
}