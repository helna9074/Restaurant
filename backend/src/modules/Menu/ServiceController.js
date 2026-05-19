import imagekit from "../../../config/imagekit.js";
import Category from "./models/Category.js";
import Menu from "./models/Menu.js";

const requiredFields = ["branchId", "category"];

export const createCategory = async (data, file) => {
  const filteredData = {};

  // ✅ validation
  for (const field of requiredFields) {
    if (!data[field] || data[field].trim() === "") {
      throw new Error(`${field} is required`);
    }
    filteredData[field] = data[field].trim();
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
export const GetAllCategories=async(page, limit, search,branchId,startDate,endDate)=>{
  
   
     const skip=(page-1)*limit
     const filter={}
   
  
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

  filter["offer.isActive"] = true;


  filter["offer.startDate"] = { $lte: end };
  filter["offer.endDate"] = { $gte: start };
}
     
    
     const total=await Category.countDocuments(filter)
     
    const categories=await Category.find(filter).sort({createdAt:-1}).limit(limit).skip(skip).lean()

    return {
categories,
page,
totalPages:Math.ceil(total/limit)
 }
}
export const DeleteCategoryById=async(id)=>{
  console.log("reached")
  const res=await Category.findByIdAndDelete(id)
  return res
}
export const UpdateCategoryById = async (id, data, file) => {
  console.log("loading")
  console.log("this is the data",data,file)
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

  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    updateData,
    { new: true }
  );

  return updatedCategory;
};
export const AddMenus=async(branchId,menus)=>{
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
}
export const GetAllMenus=async(search,branchId)=>{

  const filter={}
   if (branchId) {
    filter.branchId = branchId;
  }

  if (search) {
    filter.menutype = { $regex: search, $options: "i" };
  }
  filter.branchId=branchId
  const res=await Menu.find(filter)
  return res
}
export const MenuUpdate=async(id,menus)=>{
 
  const res=await Menu.findByIdAndUpdate(id,{menutype:menus},{ returnDocument: "after" })
  return res
}
export const MenuDelete=async(id)=>{
  const res=await Menu.findByIdAndDelete(id)
  return res
}