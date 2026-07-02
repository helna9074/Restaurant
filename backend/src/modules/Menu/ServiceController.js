import mongoose from "mongoose";
import imagekit from "../../../config/imagekit.js";
import AddOn from "./models/AddOn.js";
import Category from "./models/Category.js";
import Food from "./models/Food.js";
import Menu from "./models/Menu.js";

const requiredFields = ["branchId", "category"];
const requiredfoodFields = [
  "foodName",
  "branchId",
  "foodType",
  "category",
  "kitchen",
];
export const createCategory = async (data, file) => {
  const filteredData = {};

  // ✅ validation
  for (const field of requiredFields) {
    if (!data[field] || data[field].trim() === "") {
      throw new Error(`${field} is required`);
    }
    filteredData[field] =
      typeof data[field] === "string" ? data[field].trim() : data[field];
  }
  if (data.offer) {
    const offer = JSON.parse(data.offer); // if coming from formData

    if (offer.isActive) {
      if (!offer.startDate || !offer.endDate || !offer.discount) {
        throw new Error("Offer requires startDate, endDate and discount");
      }
    }

    filteredData.offer = offer;
  }

  // ✅ image upload
  if (file) {
    const response = await imagekit.upload({
      file: file.buffer,
      fileName: Date.now() + "-" + file.originalname,
      folder: "/categories",
    });

    filteredData.img = response.url;
  }

  const category = await Category.create(filteredData);

  return category;
};
export const GetAllCategories = async (
  page,
  limit,
  search,
  branchId,
  startDate,
  endDate,
) => {
  const skip = (page - 1) * limit;
  const filter = {};

  if (branchId) {
    filter.branchId = branchId;
  }

  if (search) {
    filter.category = {
      $regex: search,
      $options: "i",
    };
  }

  if (startDate && endDate) {
    const start = new Date(startDate);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    filter["offer.isActive"] = true;

    filter["offer.startDate"] = {
      $gte: start,
    };

    filter["offer.endDate"] = {
      $lte: end,
    };
  }

  const total = await Category.countDocuments(filter);

  const categories = await Category.find(filter)
    .sort({ createdAt: -1 })
    .limit(limit)
    .skip(skip)
    .lean();

  return {
    categories,
    page,
    totalPages: Math.ceil(total / limit),
  };
};
export const DeleteCategoryById = async (id) => {
  console.log("reached");
  const res = await Category.findByIdAndDelete(id);
  return res;
};
export const UpdateCategoryById = async (id, data, file) => {
  console.log("loading");
  console.log("this is the data", data, file);
  const updateData = {};
  if (data.category) updateData.category = data.category.trim();
  if (data.offer) {
    const offer = JSON.parse(data.offer);

    if (offer.isActive) {
      if (!offer.startDate || !offer.endDate || !offer.discount) {
        throw new Error("Offer requires startDate, endDate and discount");
      }

      updateData.offer = {
        isActive: true,
        startDate: new Date(offer.startDate),
        endDate: new Date(offer.endDate),
        discount: Number(offer.discount),
      };
    } else {
      updateData.offer = {
        isActive: false,
        startDate: null,
        endDate: null,
        discount: null,
      };
    }
  }

  if (file) {
    const response = await imagekit.upload({
      file: file.buffer,
      fileName: Date.now() + "-" + file.originalname,
      folder: "/categories",
    });

    updateData.img = response.url;
  }

  const updatedCategory = await Category.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  return updatedCategory;
};
export const AddMenus = async (branchId, menus) => {
  const docs = menus.map((menu) => ({
    branchId,
    menutype: menu,
  }));

  try {
    const result = await Menu.insertMany(docs, { ordered: false });
    return result;
  } catch (err) {
    if (err.code === 11000) {
      console.log("Some duplicates skipped");
      return err.insertedDocs || [];
    }
    throw err;
  }
};
export const GetAllMenus = async (search, branchId) => {
  const filter = {};
  if (branchId) {
    filter.branchId = branchId;
  }

  if (search) {
    filter.menutype = { $regex: search, $options: "i" };
  }
  filter.branchId = branchId;
  const res = await Menu.find(filter);
  return res;
};
export const MenuUpdate = async (id, menus) => {
  const res = await Menu.findByIdAndUpdate(
    id,
    { menutype: menus },
    { returnDocument: "after" },
  );
  return res;
};
export const MenuDelete = async (id) => {
  const res = await Menu.findByIdAndDelete(id);
  return res;
};
export const AddAddOn = async (branchId, addOnName, portions) => {
  try {
    const hasPortions = portions.length > 0;
    const newAddOn = await AddOn.create({
      branchId,
      addOnName,
      portions,
    });
  } catch (err) {
    if (err.code === 11000) {
      console.log("Some duplicates skipped");
      return err.insertedDocs || [];
    }
    throw err;
  }
};
export const GetAllAddOns = async (search, branchId) => {
  const filter = {};
  if (branchId) {
    filter.branchId = branchId;
  }

  if (search) {
    filter.addOnName = { $regex: search, $options: "i" };
  }
  filter.branchId = branchId;
  const res = await AddOn.find(filter).lean();
  return res;
};
export const AddOnUpdate = async (id, addOnName, portions) => {
  const res = await AddOn.findByIdAndUpdate(
    id,
    { addOnName, portions },
    { new: true },
  );
  return res;
};
export const AddOnDelete = async (id) => {
  const res = await AddOn.findByIdAndDelete(id);
  return res;
};
export const AddFood = async (data, file) => {
  const filteredData = {};
  for (const field of requiredfoodFields) {
    if (!data[field] || data[field].trim() === "") {
      throw new Error(`${field} is required`);
    }
    filteredData[field] = data[field].trim();
  }
  if (data.offer) {
    const offer = JSON.parse(data.offer);

    if (offer.isActive) {
      if (!offer.startDate || !offer.endDate || !offer.discount) {
        throw new Error("Offer requires startDate, endDate and discount");
      }
    }

    filteredData.offer = offer;
  }
  if (data.menuTypes) {
    const menutype = JSON.parse(data.menuTypes || []);
    filteredData.menuTypes = menutype;
  }

  if (data.course) {
    filteredData.course = data.course;
  }
  if (data.addOn) {
    filteredData.addOn = JSON.parse(data.addOn);
  }
  if (data.portions) {
    filteredData.portions = JSON.parse(data.portions);
  }

  // ✅ image upload
  if (file) {
    const response = await imagekit.upload({
      file: file.buffer,
      fileName: Date.now() + "-" + file.originalname,
      folder: "/foods",
    });

    filteredData.img = response.url;
  }
  console.log("this is the  course what i get", data.course);

  const food = await Food.create(filteredData);

  return food;
};
export const UpdatingFood = async (id, data, file) => {
  console.log("loading");
  console.log("this is the data", data, file);
  const updateData = {};
  for (const field of requiredfoodFields) {
    if (!data[field] || data[field].trim() === "") {
      throw new Error(`${field} is required`);
    }
    updateData[field] = data[field].trim();
  }

  if (data.offer) {
    const offer = JSON.parse(data.offer);

    if (offer.isActive) {
      if (!offer.startDate || !offer.endDate || !offer.discount) {
        throw new Error("Offer requires startDate, endDate and discount");
      }

      updateData.offer = {
        isActive: true,
        startDate: new Date(offer.startDate),
        endDate: new Date(offer.endDate),
        discount: Number(offer.discount),
      };
    } else {
      updateData.offer = {
        isActive: false,
        startDate: null,
        endDate: null,
        discount: null,
      };
    }
  }
  if (data.special !== undefined) {
    updateData.special = data.special === "true";
  }
  //
  if (data.menuTypes) {
    const menutype = JSON.parse(data.menuTypes || []);
    updateData.menuTypes = menutype;
  }

  if (data.course) {
    updateData.course = data.course;
  }
  if (data.addOn) {
    updateData.addOn = JSON.parse(data.addOn);
  }
  if (data.portions) {
    updateData.portions = JSON.parse(data.portions);
  }

  if (file) {
    const response = await imagekit.upload({
      file: file.buffer,
      fileName: Date.now() + "-" + file.originalname,
      folder: "/foods",
    });

    updateData.img = response.url;
  }

  const updatedFood = await Food.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  console.log("thi sis the offer", updatedFood.offer);
  return updatedFood;
};
export const GetAllFoods = async ({
  page = 1,
  limit = 10,
  search,
  branchId,
  kitchen,
  category,
}) => {
  const skip = (page - 1) * limit;
  const pipeline = [];
  if (branchId) {
    pipeline.push({
      $match: {
        branchId: new mongoose.Types.ObjectId(branchId),
      },
    });
  }
  pipeline.push({
    $lookup: {
      from: "kitchens",
      localField: "kitchen",
      foreignField: "_id",
      as: "kitchen",
    },
  });
  pipeline.push({
    $lookup: {
      from: "categories",
      localField: "category",
      foreignField: "_id",
      as: "category",
    },
  });
  if (search) {
    pipeline.push({
      $match: {
        foodName: { $regex: search, $options: "i" },
      },
    });
  }
  if (kitchen) {
    pipeline.push({
      $match: {
        kitchen: {
          $elemMatch: {
            _id: new mongoose.Types.ObjectId(kitchen),
          },
        },
      },
    });
  }
  if (category) {
    pipeline.push({
      $match: {
        category: {
          $elemMatch: {
            _id: new mongoose.Types.ObjectId(category),
          },
        },
      },
    });
  }
  pipeline.push({
    $project: {
      _id: 1,
      category: {
        $arrayElemAt: ["$category.category", 0],
      },
      kitchen: {
        $arrayElemAt: ["$kitchen.kitchen", 0],
      },
      foodName: 1,
      img: 1,
      createdAt: 1,
    },
  });
  pipeline.push({
    $sort: { createdAt: -1 },
  });
  const totalFoods =
    (
      await Food.aggregate([
        ...pipeline,
        {
          $count: "count",
        },
      ])
    )[0]?.count || 0;

  pipeline.push({
    $sort: { createdAt: -1 },
  });
  const allFoods = await Food.aggregate(pipeline).skip(skip).limit(limit);
  return {
    allFoods,
    totalPages: Math.ceil(totalFoods / limit),
  };
};
export const ViewSingleFood = (id) => {
  return Food.findById(id)
    .populate({ path: "category", select: "category" })
    .populate({ path: "kitchen", select: "kitchen" })
    .lean();
};
export const DeleteFoodById = async (id) => {
  const res = await Food.findByIdAndDelete(id);
  return res;
};
