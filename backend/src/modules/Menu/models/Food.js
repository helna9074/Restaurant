import mongoose from "mongoose";
const Schema = mongoose.Schema;
const FoodSchema = new Schema(
  {
    branchId: { type: mongoose.Types.ObjectId, ref: "Branch", required: true },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    kitchen: { type: mongoose.Types.ObjectId, ref: "Kitchen", required: true },
    foodName: { type: String, required: true },
    img: { type: String },
    offer: {
      isActive: { type: Boolean, default: false },
      startDate: Date,
      endDate: Date,
      discount: Number,
    },
    foodType: { type: String, enum: ["veg", "nonveg"], required: true },
    special: { type: Boolean, default: false },
    menuTypes: {
      type: [String],
      enum: ["Breakfast", "Lunch", "Dinner"],
      default: [],
    },
    course: {
      type: String,
      enum: ["starter", "maincourse", "dessert"],
      default: null,
    },
    addOn: [
      {
        type: mongoose.Types.ObjectId,
        ref: "AddOn",
      },
    ],
    portions: [
      {
        portion: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true },
);

FoodSchema.index({ branchId: 1, category: 1, foodName: 1 }, { unique: true });

export default mongoose.model("Food", FoodSchema);
