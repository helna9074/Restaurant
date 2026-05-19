import User from "../User/User.js";
import { AddDpts, AddEmp, AddPos, DeleteDepartment, DeleteEmp, DeletePos, GetDepartments, GetEmp, GetOneEmpl, GetPos, UpdateById, UpdateDepartment, UpdatePos } from "./departmentServices.js";
import Departments from "./models/departments.js";
import Employee from "./models/Employee.js";
import Position from "./models/Position.js";

export const AddDepartments = async (req, res) => {
  try {
    console.log("api reached in adddepartment")
    const { branches, departments } = req.body.data;
    if (departments.length > 5) {
  return res.status(400).json({
    message: "Maximum 5 departments allowed",
  });
}
    if (!branches?.length || !departments?.length) {
      return res
        .status(400)
        .json({ message: "branch and departments is required" });
    }
    const result = await AddDpts(branches, departments);
    return res
      .status(201)
      .json({ message: "customer type added", data: result });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "internal Server Errro",error:error.message });
  }
};
export const GetDpts = async (req, res) => {
  try {
    console.log("API HIT ✅");
   const branchId=req.query.branchId;
   const search=req.query.search||"";
   
  //  if(req.user.role==="admin"){
const data = await GetDepartments({branchId,search});
   
    return res.status(200).json({
      message:"fetched successfully",
      data,
    });
 
    
  } catch (error) {
    console.log("FULL ERROR 👉", error); // 👈 VERY IMPORTANT

    return res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};
export const UpdateDpt = async (req, res) => {
  try {
    
    console.log("branchId getted here")
     const { id, department } = req.body;
     console.log("this is the id and department",id,department)
    if (!id) return res.status(400).json({ message: "id is required" });
  if (!department) {
  return res.status(400).json({
    message: "department is required",
  });
}
   

    const data = await UpdateDepartment(id, department);

    return res.status(200).json({ message: "found the cutomer", data });
  } catch (error) {
    return res.status(500).json({ message: "inernal server error" });
  }
};
export const DeleteDpt = async (req, res) => {
  try {
    console.log("deleting..")
    const { id } = req.params;
     
    if (!id) return res.status(400).json({ message: "id is required" });
    const data=DeleteDepartment(id)
    return res.status(200).json({message:"deleted successfully"})
  } catch (error){
 return res.status(500).json({message:"internal server Erro"})
  }
};
export const AddPosition = async (req, res) => {
  try {
    console.log("api reached in addPosition")
    const { branch, department,positions } = req.body.data;
    
    if (!branch?.length || !department?.length||!positions?.length) {
      return res
        .status(400)
        .json({ message: "branch and departments is required" });
    }
    const result = await AddPos(branch, department,positions);
    return res
      .status(201)
      .json({ message: "customer type added", data: result });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "internal Server Errro",error:error.message });
  }
};
export const GetPositions = async (req, res) => {
  try {
   
   const branch=req.query.branchId;
   const search=req.query.search||"";
   
   if(req.user.role==="admin"){
const data = await GetPos({branch,search});
   
 
    return res.status(200).json({
      message:"fetched successfully",
      data,
    });
   }
   const user=await User.findById(req.user.id)
   const dpts=await Position.find({branch:{$in:user.branches}})
   return res.status(200).json({
        dpts,
      
       
   })
    
  } catch (error) {
    console.log("FULL ERROR 👉", error); // 👈 VERY IMPORTANT

    return res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};
export const UpdatePosition = async (req, res) => {
  try {
    
    console.log("Positionid getted here")
     const { id, position,department } = req.body;

    if (!id) return res.status(400).json({ message: "id is required" });
  if (!department||!position) {
  return res.status(400).json({
    message: "department is required",
  });
}
   

    const data = await UpdatePos(id, department,position);

    return res.status(200).json({ message: "found the cutomer", data });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "inernal server error" });
  }
};
export const DeletePosition = async (req, res) => {
  try {
    console.log("deleting..")
    const { id } = req.params;

     
    if (!id) return res.status(400).json({ message: "id is required" });
    const data=DeletePos(id)
    return res.status(200).json({message:"deleted successfully"})
  } catch (error){
 return res.status(500).json({message:"internal server Erro"})
  }
};
export const AddEmployee=async(req,res)=>{
  try{
    console.log("personal and work getted here")
    const {personal,work,branch}=req.body
    if(!personal||!work){
      return res.staus(400).json({message:"personal and work is missing"})
    }
    const existingEmployee=await Employee.findOne({
    "personalDetails.email":personal.email
  })
  if(existingEmployee){
    return res.status(409).json({
      message:"Employee already exists"
    })
  }
   personal.salary=Number(personal.salary)
   personal.gender=personal.gender.toLowerCase().trim()
    const result=await AddEmp(personal,work,branch)
    return res.status(201).json(result)

  }catch(error){
   console.log(error)
   return res.status(500).json({message:"internal server error",error:error.message})
  }
}
export const GetEmployees = async (req, res) => {
  try {
    let data;
   const branch=req.query.branchId;
   const search=req.query.search||"";
   
   if(req.user.role==="admin"){
 data = await GetEmp({branch,search});
   
 
    return res.status(200).json({
      message:"fetched successfully",
      data,
    });
   }
   const user=await User.findById(req.user.id)
    data=await Employee.find({branch:{$in:user.branches}})
   return res.status(200).json({
        data,
      
       
   })
    
  } catch (error) {
    console.log("FULL ERROR 👉", error); // 👈 VERY IMPORTANT

    return res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};
export const GetEmply=async(req,res)=>{
  try{
    console.log("found it")
     const {id}=req.params
     if(!id) return res.status(400).json({message:"id is required"})
      const result=await GetOneEmpl(id)
    return res.status(200).json({messsage:"Employee found",result})
  }catch(err){
    return res.status(500).json({message:"internal Server Error"})
  }
}
export const UpdateEmployee=async(req,res)=>{
  try{
    const {id}=req.params
    if(!id) return res.status(400).json({message:"id is required"})
     const {personal,work}=req.body
     if(!personal||!work) return res.status(400).json({message:"personal and work is required"})
      const data=await UpdateById(id,personal,work)
    console.log("this is the updated data",data)
    return res.status(200).json({message:"updated successfully",data})
  }catch(err){
    return res.status(500).json({message:"internal server error"})
  }
}
export const DeleteEmployee = async (req, res) => {
  try {
    console.log("deleting..")
    const { id } = req.params;

     
    if (!id) return res.status(400).json({ message: "id is required" });
    const data=DeleteEmp(id)
    return res.status(200).json({message:"deleted successfully"})
  } catch (error){
 return res.status(500).json({message:"internal server Erro"})
  }
};