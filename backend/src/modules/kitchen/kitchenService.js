import mongoose from "mongoose";
import Kitchen from "./kitchen.js"
export const CreateKitchen=async(branchId,kitchen)=>{
    const res=await Kitchen.create({
        branchId,
        kitchen
    })
    return res
}
export const GetKitchens = async (branchId, search) => {
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
          { kitchen: { $regex: search, $options: "i" } },
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
      kitchen:1
    }
  })
  pipeline.push({
    $sort:{createdAt:-1}
  })
  return await Kitchen.aggregate(pipeline);
};
export const UpdateById=async(id,kitchen)=>{
  const res=await Kitchen.findByIdAndUpdate(id,{kitchen},{new:true})
  return res
}
export const DeleteById=async(id)=>{
  const res=await Kitchen.findByIdAndDelete(id)
  return res
}