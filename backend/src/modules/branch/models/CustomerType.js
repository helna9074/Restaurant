import mongoose from "mongoose";
const Schema=mongoose.Schema
const CustomerSchema=new Schema({
    branch:
        {
            type:mongoose.Types.ObjectId,
            ref:"Branch",
            required:true,
            unique:true
         
        }
    ,
    types:[
        {
            type:String,
            enum:["Walk in customer","Take away","Dine in","Home delivery"],
            required:true,
           
        }
    ]
},{timestamps:true})

export default mongoose.model("CustomerType",CustomerSchema)