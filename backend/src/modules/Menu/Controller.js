import Category from "./models/Category.js";
import Menu from "./models/Menu.js";
import {
  createCategory,
  DeleteCategoryById,
  GetAllCategories,
  UpdateCategoryById,
  AddMenus,
  GetAllMenus,
  MenuUpdate,
  MenuDelete
} from "./ServiceController.js";



export const AddCategory = async (req, res) => {
  try {
    const file = req.file;
    const data = req.body;

    const category = await createCategory(data, file);

    return res.status(201).json({
      message: "Category added successfully",
      data: category,
    });
  } catch (error) {
    console.log(error);

    if (error.code === 11000) {
      return res.status(400).json({
        message: "Category already exists for this branch",
      });
    }

    return res.status(500).json({
      message: error.message || "Internal server error",
    });
  }
};
export const GetCategories = async (req, res) => {
  try {
    console.log("api hitttt");
    const limit = Number(req.query.limit) || 10;

    const page = Number(req.query.page) || 1;

    const search = req.query.search || "";
    const branchId = req.query.branchId || "";
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    if (req.user.role === "admin") {
      const data = await GetAllCategories(
        page,
        limit,
        search,
        branchId,
        startDate,
        endDate,
      );
      return res.status(200).json({ message: "fetched successfully", data });
    }
    const user = await User.findById(req.user.id);
    const data = await Category.find({ branchId: { $in: user.branches } });
    return res.json({
      data,
      page: 1,
      totalPages: 1,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};
export const DeleteCategory = async (req, res) => {
  try {
    console.log("api called for deleteation");
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "id is required" });
    const data = await DeleteCategoryById(id);
    return res.status(200).json({ messsage: "deleted successfully" });
  } catch (error) {
    console.log("this is the error", error);
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};
export const UpdateCategory = async (req, res) => {
  try {
    console.log("it is updateting");
    const { id } = req.params;
    const file = req.file;
    const data = req.body;
    console.log("this is the id ,file,data", id, file, data);
    const updated = await UpdateCategoryById(id, data, file);
    return res.status(200).json({
      message: "Category updated successfully",
      data: updated,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};
export const AddMenu = async (req, res) => {
  try {
    const { branchId, menus } = req.body;
    if (!branchId.length || !menus.length)
      return res.statuss(400).json({ message: "all fields required" });
    const data = await AddMenus(branchId, menus);
    return res.status(200).json({
      message: "menu added successfully",
      data,
    });
  } catch (err) {
    if (err.code === 11000) {
      console.log(`Duplicate menu skipped: ${menu}`);
    } else {
      return res
        .status(500)
        .json({ message: "internal server error", error: err.message });
    }
  }
};
export const GetMenus = async (req, res) => {
  try {
    console.log("api hitttt");
   

    const search = req.query.search || "";
    const branchId = req.query.branchId || "";
   
    if (req.user.role === "admin") {
      const data = await GetAllMenus(
       
        search,
        branchId,
       
      );
      return res.status(200).json({ message: "fetched successfully", data });
    }
    const user = await User.findById(req.user.id);
    const data = await Menu.find({ branchId: { $in: user.branches } });
    return res.json({
      data,
     
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};
export const UpdateMenu=async(req,res)=>{
  try{
    const {id}=req.params
    const {menus}=req.body
    // if(!menus.length===1) return res.status(400).json({message:"update one type at one time"})
    if(!id) return res.status(400).json({message:"id is required"})
      const data=await MenuUpdate(id,menus)

 return res.json({
      data,
     
    });
  }catch(err){
    console.log(err)
     return res
      .status(500)
      .json({ message: "internal server error", error: err.message });
  }
}
export const DeleteMenu=async(req,res)=>{
  try{
    const {id}=req.params
    if(!id) return res.status(400).json({message:"id is required"})
    const data=await MenuDelete(id)
  return res.json({
      data,
     
    });
  }catch(err){
        console.log(err)
     return res
      .status(500)
      .json({ message: "internal server error", error: err.message });
  }
}