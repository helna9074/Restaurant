import mongoose from "mongoose";
const Schema = mongoose.Schema;

const FloorSchema = new Schema(
  {
    branchId: { type: mongoose.Types.ObjectId, ref: "Branch", required: true },
    name:{type:String,required:true,unique:true,trim:true},
    count:{type:Number,required:true}
  },
  { timestamps: true },
);
FloorSchema.index({ branchId: 1, name: 1 }, { unique: true });
export default mongoose.model("Floor", FloorSchema);
