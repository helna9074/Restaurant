import mongoose from "mongoose";
const Schema=mongoose.Schema
const CategorySchema=new Schema({
    branchId:{type:mongoose.Types.ObjectId,ref:"Branch",required:true},
    category:{type:String,required:true},
    img:{type:String,required:true},
   offer: {
  isActive: { type: Boolean, default: false },
  startDate: Date,
  endDate: Date,
  discount: Number,
}
})

CategorySchema.index({branchId:1,category:1},{unique:true})

export default mongoose.model("Category",CategorySchema)