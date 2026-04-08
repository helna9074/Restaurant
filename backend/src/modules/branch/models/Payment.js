import mongoose from 'mongoose'

const Schema=mongoose.Schema
const PaymentSchema=new Schema({
    branchId:{
         type:mongoose.Types.ObjectId,
         ref:"Branch",
        required:true,
        unique:true

    },
       
    
    paymethods:[
        {
            type:String,
            enum:["Cash","Card","Online"],
            required:true
        }
    ]
})
export default mongoose.model("PaymentMethod",PaymentSchema)