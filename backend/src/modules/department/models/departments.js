import mongoose from "mongoose";
const Schema=mongoose.Schema
const DepartmentSchema=new Schema({
    branch:
        {
            type:mongoose.Types.ObjectId,
            ref:"Branch",
            required:true,
            unique:true
         
        },
    
    department:
        {
            type:String,
           
            required:true,
           
        }
    
},{timestamps:true})
DepartmentSchema.index({ branch: 1, department: 1 }, { unique: true });
export default mongoose.model("Department",DepartmentSchema)