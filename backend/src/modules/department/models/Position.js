import mongoose from "mongoose";
const Schema = mongoose.Schema;
const PositionSchema = new Schema(
  {
    branch: {
      type: mongoose.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    department: {
      type: mongoose.Types.ObjectId,
      ref: "Department",
      required: true,
    },
    position: 
      {
        type: String,

        required: true,
      }
    
  },
  { timestamps: true },
);
PositionSchema.index(
  { branch: 1, department: 1, position: 1 },
  { unique: true },
);
export default mongoose.model("Position", PositionSchema);
