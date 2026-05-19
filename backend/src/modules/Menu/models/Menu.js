import mongoose from "mongoose";
const Schema=mongoose.Schema
const MenuSchema=new Schema({
    branchId:{type:mongoose.Types.ObjectId,ref:"Branch",required:true},
    menutype:{type:String,required:true},
   
})

MenuSchema.index({branchId:1,menutype:1},{unique:true})

export default mongoose.model("MenuType",MenuSchema)