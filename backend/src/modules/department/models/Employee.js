import  mongoose  from 'mongoose'

const Schema=mongoose.Schema
const EmployeeSchema=new Schema(
{
   branch:{type:Schema.Types.ObjectId,required:true,ref:"Branch"},
  personalDetails: {
   
    firstName:{type:String,required:true},
    lastName:{type:String},
    email:{type:String,required:true,trim:true,unique:true},
    phone:{type:String,required:true},
    address:{type:String},
    gender:{type:String,enum:["male","female"],required:true},
    nationality:{type:String,required:true}

  },

  workInformation: {
    department:{type:Schema.Types.ObjectId,ref:"Department",required:true},
    position:{type:Schema.Types.ObjectId,ref:"Position",required:true},
    joiningDate:{type:Date,required:true},
    salary:{type:Number,required:true,min:0}
  }
},{timestamps:true}
)
export default mongoose.model("Employee",EmployeeSchema)