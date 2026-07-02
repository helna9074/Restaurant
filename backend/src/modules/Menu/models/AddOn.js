import mongoose from "mongoose";
const Schema=mongoose.Schema
const AddOnSchema=new Schema({
    branchId:{type:mongoose.Types.ObjectId,ref:"Branch",required:true},
    addOnName:{type:String,required:true},
    portions:[
        {
            portion:{
                type:String,
                required:true,
            },
            price:{
                type:Number,
                required:true,
            }
        }
    ]
   
},{timestamps:true})

AddOnSchema.index({branchId:1,addOnName:1},{unique:true})

export default mongoose.model("AddOn",AddOnSchema)