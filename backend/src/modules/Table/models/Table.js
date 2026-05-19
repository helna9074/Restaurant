import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TableSchema = new Schema(
  {
    branchId: { type: mongoose.Types.ObjectId, ref: "Branch", required: true },
    floor:{type:mongoose.Types.ObjectId,ref:"Floor",required:true},
    table:{type:String,required:true},
    capacity:{type:Number,required:true}
  },
  { timestamps: true },
);
TableSchema.index({branchId:1,table:1,floor:1},{unique:true})

export default mongoose.model("Table", TableSchema);
