import User from "./User.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import mongoose from "mongoose"
export const SignupAdmin=async(username,email,password)=>{
  const hashPass=await bcrypt.hash(password,10)
  const user= await User.create({
    username,
    email,
    password:hashPass,
    role:"admin",
    branches:[]
  })
 
  return user
}

export const LoginUser=async({email,password})=>{
  console.log("reached",email,password)

  const user=await User.findOne({email})
  if(!user){
    throw new Error("no user found")
  }
    if (!user.isActive) {
  throw new Error("User is inactive");
}
  const isMatch=await bcrypt.compare(password,user.password)
  if(!isMatch){
   throw new Error("invalid credintials")
  }
   const token=jwt.sign({
    id:user._id,
    role:user.role,
    branches:user.branches
  },process.env.SECRET_KEY,{expiresIn:"1d"})

   return {user,token}
}
export const GetMeUser=async(id)=>{
   const response=await User.findById(id).select("username role").lean()
   return response
}
export const createUser = async (
  email,
  password,
  employeeId,
  branchId
) => {


  const hashPass = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashPass,
    role: "user",
    employee: employeeId,
    branches: [branchId]
  });

  return user;
};
export const GetAllUsers=async(branchId,search)=>{
   const pipeline = [];

  // ✅ Match branch
  if (branchId) {
    pipeline.push({
      $match: {
        branches: {
          $in: [new mongoose.Types.ObjectId(branchId)],
        },
      },
    });
  }

  // ✅ Join employee
  pipeline.push({
    $lookup: {
      from: "employees",
      localField: "employee",
      foreignField: "_id",
      as: "employee",
    },
  });

  pipeline.push({
    $unwind: "$employee",
  });

  // ✅ Join department
  pipeline.push({
    $lookup: {
      from: "departments",
      localField: "employee.workInformation.department",
      foreignField: "_id",
      as: "department",
    },
  });

  // ✅ Join position
  pipeline.push({
    $lookup: {
      from: "positions",
      localField: "employee.workInformation.position",
      foreignField: "_id",
      as: "position",
    },
  });

  // ✅ Search
  if (search) {
    pipeline.push({
      $match: {
        $or: [
          {
            "employee.personalDetails.firstName": {
              $regex: search,
              $options: "i",
            },
          },
          {
            "employee.personalDetails.email": {
              $regex: search,
              $options: "i",
            },
          },
          {
            "department.department": {
              $regex: search,
              $options: "i",
            },
          },
          {
            "position.position": {
              $regex: search,
              $options: "i",
            },
          },
        ],
      },
    });
  }

  // ✅ Final output
  pipeline.push({
    $project: {
      _id: 1,
      employeeId: "$employee._id",
      name: "$employee.personalDetails.firstName",
      email: "$employee.personalDetails.email",
      department: {
        $arrayElemAt: ["$department.department", 0],
      },
      position: {
        $arrayElemAt: ["$position.position", 0],
      },
    },
  });


  return await User.aggregate(pipeline);
  
}
export const UpdateTheUser=async(id,data)=>{
  const {email,newpassword,employeeId,branchId}=data
  const updateFields={
    email,
    employee:employeeId,
    branches:[branchId]
    
  }
  if(newpassword&&newpassword.trim()!==""){
    const hashed=await bcrypt.hash(newpassword,10)
    updateFields.password=hashed
  }
  const res=await User.findByIdAndUpdate(id,updateFields,{new:true})
}
export const DeleteUser=async(id)=>{
  const res=await User.findByIdAndDelete(id)
  return res
}