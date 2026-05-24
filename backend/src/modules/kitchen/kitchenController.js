import { CreateKitchen, DeleteById, GetKitchens, UpdateById } from "./kitchenService.js"

export const AddKitchen=async(req,res)=>{
    try{
        console.log("reached on kitchen")
        const {branchId,kitchen}=req.body
        console.log("this is are the body",branchId,kitchen)
        if(!branchId)
            return res.status(400).json({message:"branchId is required"})
        const data=await CreateKitchen(branchId,kitchen)
        return res.status(201).json({message:"kitchen is added successfully",data})
    }catch(error){
        if (error.code === 11000) {
      return res.status(400).json({ message: "Kitchen already exists" });
    }
return res.status(500).json({message:"Internal Server Error"})
    }
}
export const GetAllKitchens=async(req,res)=>{
    try{
       const {branchId,search}=req.query
       console.log("BRANCHIDAND SERACH REACHED",branchId,search)
       if(!branchId)
            return res.status(400).json({message:"branchId is required"})
        const data=await GetKitchens(branchId,search)
          return res.status(201).json({message:"kitchen is added successfully",data})
    }catch(err){
        console.log(err)
      return res.status(500).json({message:"Internal Server Error"})  
    }
}
export const UpdateKitchen=async(req,res)=>{
    try{
        console.log("reached on update kitchen")
       const {id}=req.params
        if(!id)
            return res.status(400).json({message:"id is required"})
       const {kitchen}=req.body
       const data=await UpdateById(id,kitchen)
       return res.status(201).json({message:"kitchen is updated successfully",data})
    }catch(err){
        console.log(err)
      return res.status(500).json({message:"Internal Server Error"})   
    }
}
export const DeleteKitchen=async(req,res)=>{
    try{
         const {id}=req.params
        if(!id)
            return res.status(400).json({message:"id is required"})
     
       const data=await DeleteById(id)
       return res.status(201).json({message:"kitchen is deleted successfully",data})

    }catch(err){
         console.log(err)
      return res.status(500).json({message:"Internal Server Error"})    
    }
}