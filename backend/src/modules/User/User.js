import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
     employee: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    unique: true,
    required:false, // one account per employee
    sparse: true  // allows admin without employee
  },
    branches:[
        {type:mongoose.Schema.Types.ObjectId,ref:"Branch"}
    ],
    isActive: {
    type: Boolean,
    default: true
  }
  },
  { timestamps: true },
);


export default mongoose.model("User", UserSchema);
