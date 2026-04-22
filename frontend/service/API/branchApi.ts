import { CustomerPayload, CustomerRow, Pagination, PaymentPayload } from "@/types/branch";
import API from "../../service/API/axiosInstance";

export const createBranch = async (data: FormData) => {
  const res = await API.post("/branch/add", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
export const getBranches = async ({ page, limit = 10, search ,all}: Pagination) => {
  try {
    console.log("api is calling");
    const res = await API.get("/branch/branches", {
      params: {
        page,
        limit,
        search,
        all
      },
    });
    console.log("this is branches", res.data);
    return res.data;
  } catch (error) {
    console.log("error in getting branches", error);
    throw error;
  }
};

export const updateBranchdata = async (id: string, data: FormData) => {
  const res = await API.put(`/branch/update/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log("this ist updated data", res.data);
  return res.data;
};
export const getBranch = async (id: string) => {
  const res = await API.get(`branch/allbranches/${id}`);
  console.log("this is the getoneData", res.data);
  return res.data;
};
export const DeleteBranch = async (id: string) => {
  const res = await API.delete(`branch/delete/${id}`);
  console.log("this is the response",res.data)
  return res.data;
};
export const AddCustomerType=async(data:{branches:string[];types:string[]})=>{
  try{
     console.log("the data reached",data)
  const res=await API.post("branch/customer",data)
  return res.data
  }catch(error){
    console.log(error)
  }
 
}
export const GetCustomers=async(search:string,branchId:string)=>{
  try{
    console.log("api is called")

  const res=await API.get("branch/customers",{params:{
    branchId,
    search
  }
  })
  console.log("...calling")
  console.log("this is the response we getted",res.data)
  return res.data.data??[]

  }catch(error){
console.log(error,"this was the error")
throw error
  }

}
export const UpdateCustomer=async({branchId,types}:CustomerPayload)=>{
  try{
    const res=await API.put('branch/customer',{branchId,types})
     return res.data
  }catch(error){
    throw error
  }
}
export const DeleteCustomer=async(data:{branchId:string,type:string})=>{
  try{
    console.log("called")
    const res=await API.delete('branch/customer',{data})
    return res.data
  }catch(error){
    throw error
  }
}
export const GetPaymentMethods=async(branchId:string,search="")=>{
  try{
    console.log("getpayment is loading")
    const res=await API.get("branch/payments",{params:{branchId,search}})
    console.log("this is the response",res.data)
    return res.data?.data??[]

  }catch(error){
    console.log("this is the error on pyment",error)
    throw error
  }
}
export const AddPaymentMethod=async(data:{branch:string[];paymethods:string[]})=>{
  try{
    const res=await API.post("branch/payment",data)
    return res.data
  }catch(error){
     console.log("this is the error",error)
    throw error
   
  }
}
export const UpdatePayment=async({branchId,paymethods }:PaymentPayload)=>{
  try{
    console.log("edit api reached",)
    const res=await API.put('branch/payment',{branchId,paymethods})
    return res.data

  }catch(error){

  }
}
export const DeletePayment=async(data:{branchId:string,paymethod:string})=>{
  try{
    const res=await API.delete(`branch/payment`,{data})
    return res.data
  }catch(error){
    throw error
  }
}