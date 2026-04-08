import User from "../User/User.js";
import {
  AddCustomerType,
  AddPaymentMethod,
  createBranchService,
  DeleteCustomerById,
  DeleteOne,
  DeletePaymentMethod,
  GetAllBranches,
  GetAllCustomers,
  GetAllPayments,
  getOneBranch,
  UpdateCustomerById,
  UpdateOne,
  updatePaymentById,
  
} from "./branchService.js";
import Branch from "./models/branch.js";
import CustomerType from "./models/CustomerType.js";
import Payment from "./models/Payment.js";

export const AddBranch = async (req, res) => {
  try {
    const branch = await createBranchService(req.body, req.file);

    return res
      .status(201)
      .json({ message: "branch is added successfully", Branch: branch });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "internal servver error" });
  }
};
export const GetBranches = async (req, res) => {
  try {
    console.log("api hitttt")
    const limit = Number(req.query.limit) || 10;

    const page = Number(req.query.page) || 1;

    const search = req.query.search || "";
    if(req.user.role==="admin"){
 const data = await GetAllBranches({ page, limit, search });
    return res.status(200).json({ message: "fetched successfully", data });
    }
   const user=await User.findById(req.user.id)
   const branches=await Branch.find({_id:{$in:user.branches}})
   return res.json({
    branches,
    page:1,
    totalPages:1
   })
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};
export const updateBranch = async (req, res) => {
  try {
    const data = req.body;
    const { id } = req.params;
    console.log("this isthe file ", req.file);

    const filteredData = await UpdateOne(id, data, req.file);
    return res.status(200).json({ message: "updated successfully", data });
  } catch (error) {
    return res.status(500).json({ message: "internal server Error" });
  }
};
export const getupdateBranch = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("this is the id")

    if (!id) return res.status(400).json({ message: "id is required" });
    const branch = await getOneBranch(id);
    return res.status(200).json({ message: "branch is found", branch: branch });
  } catch (error) {
    return res.status(500).json({ message: "internal server error" });
  }
};
export const DeleteBranch = async (req, res) => {
  try {
    console.log("hited here")
    const {branchId,type} = req.body;
    if (!branchId) return res.status(400).json({ message: "id is required" });
    const data = await DeleteOne(branchId,type);
    return res.status(200).json({ message: "deleted successfully", data });
  } catch (error) {
    return res.status(500).json({ message: "internal server Error" });
  }
};
export const AddCustomer = async (req, res) => {
  try {
    console.log("api reached in addcustomer")
    const { branches, types } = req.body;
 
    if (!branches?.length || !types?.length) {
      return res
        .status(400)
        .json({ message: "branch and customer is required" });
    }
    const result = await AddCustomerType(branches, types);
    return res
      .status(201)
      .json({ message: "customer type added", data: result });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "internal Server Errro",error:error.message });
  }
};
export const GetCustomers = async (req, res) => {
  try {
    console.log("API HIT ✅");
   const branchId=req.query.branchId;
   const search=req.query.search||"";
   
   if(req.user.role==="admin"){
const data = await GetAllCustomers({branchId,search});
    console.log("this is the data",data)
 
    return res.status(200).json({
      message:"fetched successfully",
      data,
    });
   }
   const user=await User.findById(req.user.id)
   const customers=await CustomerType.find({branch:{$in:user.branches}})
   return res.status(200).json({
        Customers:customers,
      
       
   })
    
  } catch (error) {
    console.log("FULL ERROR 👉", error); // 👈 VERY IMPORTANT

    return res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};
export const UpdateCustomer = async (req, res) => {
  try {
    console.log("branchId getted here")
     const { branchId, types } = req.body;
    if (!branchId) return res.status(400).json({ message: "id is required" });
  
    console.log(branchId, types);

    const data = await UpdateCustomerById(branchId, types);

    return res.status(200).json({ message: "found the cutomer", data });
  } catch (error) {
    return res.status(500).json({ message: "inernal server error" });
  }
};
export const DeleteCustomer = async (req, res) => {
  try {
    console.log("deleting..")
    const { branchId,type } = req.body;
     
    if (!branchId) return res.status(400).json({ message: "id is required" });
    const data=DeleteCustomerById(branchId,type)
    return res.status(200).json({message:"deleted successfully"})
  } catch (error){
 return res.status(500).json({message:"internal server Erro"})
  }
};
export const AddPayment = async (req, res) => {
  try {
    console.log("api reached in addPayments")
    const { branch, paymethods } = req.body;
 
    if (!branch?.length || !paymethods?.length) {
      return res
        .status(400)
        .json({ message: "branch and customer is required" });
    }
    const result = await AddPaymentMethod(branch, paymethods);
    return res
      .status(201)
      .json({ message: "customer type added", data: result });
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "internal Server Errro", error:error.message});
  }
};
export const GetPayments = async (req, res) => {
  try {
    console.log("API HIT ✅");
    const branchId=req.query.branchId;
    const search=req.query.search||""
    console.log("this ist branchId",branchId)
    if(!branchId){
      return res.status(400).json({message:"branchid is required"})
    }
   console.log('this is the branchId',branchId)
   if(req.user.role==="admin"){
const data = await GetAllPayments(branchId,search);
    console.log("this is the data",data)
 
    return res.status(200).json({
      message:"fetched successfully",
      data,
    });
   }
   const user=await User.findById(req.user.id)
   const Payments=await Payment.find({branchId:{$in:user.branches}})
   console.long("this is the res",Payments)
   return res.status(200).json({
       Payments
   })
    
  } catch (error) {
    console.log("FULL ERROR 👉", error); // 👈 VERY IMPORTANT

    return res.status(500).json({
      message: "internal server error",
      error: error.message,
    });
  }
};
export const UpdatePayment = async (req, res) => {
  try {
     const {branchId,paymethods}=req.body
  
    if (!branchId) return res.status(400).json({ message: "id is required" });
    
    

    const data = await updatePaymentById(branchId, paymethods);

    return res.status(200).json({ message: "found the cutomer", data });
  } catch (error) {
    return res.status(500).json({ message: "inernal server error" ,error:error.message});
  }
};
export const DeletePayment = async (req, res) => {
  try {
    const { branchId,paymethod } = req.body;
     
    if (!branchId) return res.status(400).json({ message: "id is required" });
    const data=DeletePaymentMethod(branchId,paymethod)
    return res.status(200).json({message:"deleted successfully"})
  } catch (error){
 return res.status(500).json({message:"internal server Erro"})
  }
};