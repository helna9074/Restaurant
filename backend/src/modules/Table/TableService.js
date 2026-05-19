import mongoose from "mongoose";
import Floor from "./models/Floor.js"
import Table from "./models/Table.js";

export const CreateFloor=async(branchId,floor,count)=>{
    const res=await Floor.create({
        branchId,
        name:floor.trim().toLowerCase(),
        count
    })
    return res
}
export const GetFloors = async (branchId, search) => {
  const match = {};

  if (branchId) {
    match.branchId = new mongoose.Types.ObjectId(branchId);
  }

  const pipeline = [
    { $match: match },
    {
      $lookup: {
        from: "branches",
        localField: "branchId",
        foreignField: "_id",
        as: "branch"
      }
    },
   {
  $unwind: {
    path: "$branch",
    preserveNullAndEmptyArrays: true
  }
}
  ];

  if (search) {
    pipeline.push({
      $match: {
         $or: [
          { name: { $regex: search, $options: "i" } },
          { "branch.name": { $regex: search, $options: "i" } },
        ],
      }
    });
  }
  pipeline.push({
    $project:{
      _id:1,
      branchId:1,
      restaurant:"$branch.name",
      count:1,
      name:1
    }
  })
  pipeline.push({
    $sort:{createdAt:-1}
  })
  return await Floor.aggregate(pipeline);
};
export const UpdateById=async(id,name,count)=>{
  const res=await Floor.findByIdAndUpdate(id,{name,count},{new:true})
  return res
}
export const DeleteById=async(id)=>{
  const res=await Floor.findByIdAndDelete(id)
  return res
}

export const CreateTable=async(branchId,floor,table,capacity)=>{
    const res=await Table.create({
        branchId,
        floor,
        table,
        capacity
    })
    return res
}
export const GetTables = async (branchId, search) => {
  const match = {};

  if (branchId) {
    match.branchId = new mongoose.Types.ObjectId(branchId);
  }

  const pipeline = [
    { $match: match },
    {
      $lookup: {
        from: "branches",
        localField: "branchId",
        foreignField: "_id",
        as: "branch"
      }
    },
   {
  $unwind: {
    path: "$branch",
    preserveNullAndEmptyArrays: true
  }
},{
  $lookup:{
    from:"floors",
    localField:"floor",
    foreignField:"_id",
    as:"floor"
  }
},{
      $unwind: {
        path: "$floor",
        preserveNullAndEmptyArrays: true,
      },
    },
  ];

  if (search?.trim()) {
    pipeline.push({
      $match: {
         $or: [
          {"floor.name":{$regex:search,$options:"i"}},
          { table: { $regex: search, $options: "i" } },
          { "branch.name": { $regex: search, $options: "i" } },
        ],
      }
    });
  }
   pipeline.push({
    $sort:{createdAt:-1}
  })
  pipeline.push({
    $project:{
      _id:1,
      branchId:1,
      restaurant:"$branch.name",
      floor:"$floor._id",
      floorName:"$floor.name",
    capacity:1,
      table:1
    }
  })
 
  return await Table.aggregate(pipeline);
};
export const UpdateTableById=async(id,floor,table,capacity)=>{
  const res=await Table.findByIdAndUpdate(id,{floor,table,capacity},{new:true})
  return res
}
export const DeleteTableById=async(id)=>{
  const res=await Table.findByIdAndDelete(id)
  return res
}