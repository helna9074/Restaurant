import mongoose from "mongoose";
const Schema=mongoose.Schema
const branchSchema=new Schema({
    name:{type:String,required:true},
    address:{type:String,required:true},
    country:{type:String},
    state:{type:String,required:true},
    city:{type:String,required:true},
    workingDays:{type:String},
    reservationRequired:{type:Boolean,default:false},
    LanLine:{type:String},
    logo:{type:String},
    openingtime:{type:String},
    closingtime:{type:String},
    ownername:{type:String,required:true},
    email:{type:String,required:true},
    pretime:{type:String},
    ordervalue:{type:Number},
    currency:{type:String},
    currencySymbol:{type:String},
    HalalCertified:{type:Boolean,default:false},
    phone:{type:String,required:true},
},{timestamps:true})

export default mongoose.model("Branch",branchSchema)