import { CategoryForm, MenuFormData } from "@/Schemas/menuSchemas";
import API from "./axiosInstance";

export const AddCategory=async(data:FormData)=>{
    const res=await API.post("/menu/category",data,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
    return res.data
}
export const GetCategories=async(branchId:string,search:string,startDate:string|null,endDate:string|null,page:number)=>{
    const res=await API.get("/menu/categories",{params:{
        branchId,
        ...(search&&{search}),
        ...(startDate&&{startDate}),
        ...(endDate&&{endDate}),
        page
    }})
    console.log("this is the categories",res.data)
    return res.data.data.categories??[]
}
export const DeleteCategory=async(id:string)=>{
    const res=await API.delete(`/menu/category/${id}`)
    return res.data
}
export const UpdateCategory=async({id,data}:{id:string,data:FormData})=>{


  for (let pair of data.entries()) {
    console.log("API 👉", pair[0], pair[1]);
  }
    const res=await API.put(`/menu/category/${id}`,data,{
        headers:{
            "Content-Type":"multipart/form-data"
        }
    })
    return res.data
}

export const AddMenu=async(data:MenuFormData)=>{
    const res=await API.post("/menu/add",data)
    return res.data
}
export const GetMenus=async(search:string,branchId:string)=>{
  const res=await API.get('/menu/all',{params:{search,branchId}})
  return res.data.data??[]
}
export const UpdateMenu=async({id,menus}:{id:string,menus:string})=>{
    console.log("callinng update",menus,id)
  const res=await API.put(`/menu/update/${id}`,{menus})
  return res.data
}
export const DeleteMenu=async(id:string)=>{
  const res=await API.delete(`/menu/delete/${id}`)
  return res.data
}