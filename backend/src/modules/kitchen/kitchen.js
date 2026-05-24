import mongoose from "mongoose";

const KitchenSchema = new mongoose.Schema({
  branchId: { type: mongoose.Schema.Types.ObjectId, ref: "Branch", required: true },
  kitchen: { type: String, required: true },
});

export default mongoose.model("Kitchen", KitchenSchema);