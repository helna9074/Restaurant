import { CreateFloor, CreateTable, DeleteById, DeleteTableById, GetFloors, GetTables, UpdateById, UpdateTableById } from "./TableService.js"

export const AddFloor=async(req,res)=>{
    try{
        console.log("reached on floor")
        const {branchId,floorName,count}=req.body
        console.log("this is are the body",branchId,floorName,count)
        if(!branchId)
            return res.status(400).json({message:"branchId is required"})
        const data=await CreateFloor(branchId,floorName,count)
        return res.status(201).json({message:"floor is added successfully",data})
    }catch(error){
        if (error.code === 11000) {
      return res.status(400).json({ message: "Floor already exists" });
    }
return res.status(500).json({message:"Internal Server Error"})
    }
}
export const GetAllFloors=async(req,res)=>{
    try{
       const {branchId,search}=req.query
       console.log("BRANCHIDAND SERACH REACHED",branchId,search)
       if(!branchId)
            return res.status(400).json({message:"branchId is required"})
        const data=await GetFloors(branchId,search)
          return res.status(201).json({message:"floor is added successfully",data})
    }catch(err){
        console.log(err)
      return res.status(500).json({message:"Internal Server Error"})  
    }
}
export const UpdateFloor=async(req,res)=>{
    try{
       const {id}=req.params
        if(!id)
            return res.status(400).json({message:"id is required"})
       const {floorName,count}=req.body
       const data=await UpdateById(id,floorName,count)
       return res.status(201).json({message:"floor is added successfully",data})
    }catch(err){
        console.log(err)
      return res.status(500).json({message:"Internal Server Error"})   
    }
}
export const DeleteFloor=async(req,res)=>{
    try{
         const {id}=req.params
        if(!id)
            return res.status(400).json({message:"id is required"})
     
       const data=await DeleteById(id)
       return res.status(201).json({message:"floor is deleted successfully",data})

    }catch(err){
         console.log(err)
      return res.status(500).json({message:"Internal Server Error"})    
    }
}
export const AddTable=async(req,res)=>{
    try{
        console.log("reached on tables")
        const {branchId,floorName,table,capacity}=req.body
        console.log("this is are the body",branchId,floorName,table,capacity)
        if(!branchId)
            return res.status(400).json({message:"branchId is required"})
        const data=await CreateTable(branchId,floorName,table,capacity)
        return res.status(201).json({message:"floor is added successfully",data})
    }catch(error){
        console.log(error)
        if (error.code === 11000) {
      return res.status(400).json({ message: "Table already exists" });
    }
return res.status(500).json({message:"Internal Server Error"})
    }
}
export const GetAllTables=async(req,res)=>{
    try{
       const {branchId,search}=req.query
       console.log("BRANCHIDAND SERACH REACHED",branchId,search)
       if(!branchId)
            return res.status(400).json({message:"branchId is required"})
        const data=await GetTables(branchId,search)
          return res.status(201).json({message:"floor is added successfully",data})
    }catch(err){
        console.log(err)
      return res.status(500).json({message:"Internal Server Error"})  
    }
}
export const UpdateTable=async(req,res)=>{
    try{
       const {id}=req.params
        if(!id)
            return res.status(400).json({message:"id is required"})
       const {floorName,table,capacity}=req.body
       const data=await UpdateTableById(id,floorName,table,capacity)
       return res.status(201).json({message:"floor is added successfully",data})
    }catch(err){
        console.log(err)
      return res.status(500).json({message:"Internal Server Error"})   
    }
}
export const DeleteTable=async(req,res)=>{
    try{
         const {id}=req.params
        if(!id)
            return res.status(400).json({message:"id is required"})
     
       const data=await DeleteTableById(id)
       return res.status(201).json({message:"floor is deleted successfully",data})

    }catch(err){
         console.log(err)
      return res.status(500).json({message:"Internal Server Error"})    
    }
}