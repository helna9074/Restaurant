import imagekit from "../../../config/imagekit.js";

import Branch from "./models/branch.js";
import CustomerType from "./models/CustomerType.js";
import Payment from "./models/Payment.js";
const allowedFields=[
    "name",
    "address",
    "phone",
    "state",
    "city",
    "email",
    "country",
    "ownername",
    "workingDays",
    "openingtime",
    "closingtime",
    "ordervalue",
    "pretime",
    "reservationRequired",
    "HalalCertified",
    "LanLine",
    "currency",
    "currencySymbol"
]
const requriedFields=[
     "name",
    "address",
    "ownername",
    "email",
    "state",
    "country",
    "city",
    "phone"
]
export const createBranchService=async(data,file)=>{
   
     data.HalaCertified=data.HalaCertified==="true"
    data.reservationRequired=data.reservationRequired==="true"
    for(const field of requriedFields){
        if(!data[field]||data[field].trim()===""){
            throw new Error(`${field} is required`)
        }
    }
 const filteredData={}
 for (const key of allowedFields){
    if(data[key]!==undefined){
        filteredData[key]=data[key]
    }
 }
    
    if(file){
        const response=await imagekit.upload({
            file:file.buffer,
            fileName:Date.now()+"-"+file.originalname,
            folder:'/branches'
        })
       filteredData.logo=response.url
    }
   
     const branch=await Branch.create(
      filteredData
    )
    return branch
}
export const GetAllBranches=async({page=1,limit=10,search=''})=>{

   
     const skip=(page-1)*limit
     const filter=search?{
        $or:[
            {name:{$regex:search,$options:"i"}},
            {city:{$regex:search,$options:"i"}},
            {state:{$regex:search,$options:"i"}},
            {country:{$regex:search,$options:"i"}},
            {email:{$regex:search,$options:"i"}}
        ]
     }:{}
    
        const totalBranches=await Branch.countDocuments(filter)
     
    const branches=await Branch.find(filter).select("name logo phone state city email createdAt updatedAt").sort({createdAt:-1}).limit(limit).skip(skip).lean()
    if(!branches.length) return {branches:[],page,totalPages:0}
    return {
branches:branches,
page,
totalPages:Math.ceil(totalBranches/limit)
 }
}
export const UpdateOne=async(id,data,file)=>{
     console.log("this is data we updating ",data)
     if(!id){
        throw new Error("id must required")
    }
    if(!data){
        throw new Error("no  data provided")
    }
    data.HalalCertified=data.HalalCertified==="true"
    data.reservationRequired=data.reservationRequired==="true"
    const filteredData={}
    for(const key of allowedFields){
        if(data[key]!==undefined){
            filteredData[key]=data[key]
        }
    }

    if(file){
        console.log("this is the file",file)
       const response=await imagekit.upload({
        file:file.buffer,
        fileName:Date.now()+"-"+file.originalname,
        folder:"/branches"
       })
       filteredData.logo=response.url
    }
   
    const updated=await Branch.findByIdAndUpdate(id,filteredData,{new:true,runValidators:true})

    if(!updated){
        throw new Error("Branch not found")
    }
    return updated

}
export const getOneBranch=async(id)=>{
    
    const response=await Branch.findById(id)
    return response
}
export const DeleteOne=async(id)=>{
    const response=await Branch.findByIdAndDelete(id)
    return response
}
export const AddCustomerType=async(branches,types)=>{
    const results=[]
    for(const branch of branches){
        
        const existing=await CustomerType.findOne({branch})
        if(existing){
            existing.types=Array.from(new Set([...existing.types,...types]))
            await existing.save()
            results.push(existing)
        }else{
            const newDoc=await CustomerType.create({branch,types})
            results.push(newDoc)
        }
    }
    
    return results
}
export const GetAllCustomers=async({branchId,search=""})=>{
    console.log("this is the branch id and search",branchId,search)
  let filter={}
  if(search){
    filter.types={$regex:search,$options:"i"}
  }
  if(branchId){
    filter.branch=branchId
  }
  console.log("this is the branchId",branchId)
    const Customers=await CustomerType.find(filter).populate("branch","name").sort({createdAt:-1}).lean()
   
console.log("this is the customers",Customers)
   return Customers
   
}
export const UpdateCustomerById=async(branchIds,types)=>{
    const response=await CustomerType.updateMany({branch:{$in:branchIds}},{$set:{types}})
    return response
}
export const DeleteCustomerById=async(branchId,type)=>{
    console.log("this is the branchId",branchId)
    const response=await CustomerType.findOneAndUpdate({branch:branchId},{$pull:{types:type}},{new:true})
    return response
}
export const AddPaymentMethod=async(branch,paymethods)=>{
    const result=[]
    for(const  branchId of branch){
         const existing=await Payment.findOne({branchId})
    if(existing){
        existing.paymethods=Array.from(new Set([...existing.paymethods,...paymethods]))
        await existing.save()
        result.push(existing)

    }else{
         const newDoc= await Payment.create({
        branchId,
       paymethods
    })
     result.push(newDoc)
    }
    }
   
  return result
   
}
export const GetAllPayments=async(branchId,search="")=>{
    let filter={}
    if(search){
        filter.paymethods={$regex:search,$options:"i"}
    }
    if(branchId){
        filter.branchId=branchId
    }

    const Payments=await Payment.find(filter).sort({createdAt:-1}).lean()

    return Payments
}
export const updatePaymentById=async(branchIds,paymethods)=>{
     const response=await Payment.updateMany({branchId:{$in:branchIds}},{$set:{paymethods}})
     console.log("this is the updation",response)
    return response

}
export const DeletePaymentMethod=async(branchId,paymethod)=>{
    const response=await Payment.findOneAndUpdate({branchId},{$pull:{paymethods:paymethod}})
    return response
}