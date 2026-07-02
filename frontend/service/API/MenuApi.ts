import {
  AddOnFormData,
  CategoryForm,
  FoodFormData,
  MenuFormData,
} from "@/Schemas/menuSchemas";
import API from "./axiosInstance";
import { Food } from "@/types/menu";

export const AddCategory = async (data: FormData) => {
  const res = await API.post("/menu/category", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
export const GetCategories = async (
  branchId: string,
  search: string,
  startDate: string | null,
  endDate: string | null,
  page: number,
) => {
  const res = await API.get("/menu/categories", {
    params: {
      branchId,
      ...(search && { search }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
      page,
    },
  });
  console.log("this is the categories", res.data);
  return res.data;
};
export const DeleteCategory = async (id: string) => {
  const res = await API.delete(`/menu/category/${id}`);
  return res.data;
};
export const UpdateCategory = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  for (let pair of data.entries()) {
    console.log("API 👉", pair[0], pair[1]);
  }
  const res = await API.put(`/menu/category/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const AddMenu = async (data: MenuFormData) => {
  const res = await API.post("/menu/add", data);
  return res.data;
};
export const GetMenus = async (search: string, branchId: string) => {
  const res = await API.get("/menu/all", { params: { search, branchId } });
  return res.data.data ?? [];
};
export const UpdateMenu = async ({
  id,
  menus,
}: {
  id: string;
  menus: string;
}) => {
  console.log("callinng update", menus, id);
  const res = await API.put(`/menu/update/${id}`, { menus });
  return res.data;
};
export const DeleteMenu = async (id: string) => {
  const res = await API.delete(`/menu/delete/${id}`);
  return res.data;
};
export const AddAddOn = async (data: AddOnFormData) => {
  const res = await API.post("/menu/addon", data);
  return res.data;
};
export const GetAddOns = async (search: string, branchId: string) => {
  const res = await API.get("/menu/addons", { params: { search, branchId } });
  console.log("this is the addOns", res.data);
  return res.data;
};
export const UpdateAddOn = async ({
  id,
  addOn,
  portions,
}: {
  id: string;
  addOn: string;
  portions: { portion: string; price: number }[];
}) => {
  console.log("callinng update", addOn, portions, id);
  console.log("this is the portions we ott", portions);
  const res = await API.put(`/menu/addon/${id}`, { addOn, portions });
  return res.data;
};
export const DeleteAddOn = async (id: string) => {
  const res = await API.delete(`/menu/addon/${id}`);
  return res.data;
};
export const CreateFood = async (data: FormData) => {
  console.log("food is creating ", data);
  const res = await API.post("/menu/food", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
export const UpdateFood = async ({
  id,
  data,
}: {
  id: string;
  data: FormData;
}) => {
  console.log("food is updating api");
  const res = await API.put(`/menu/food/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
export const GetFoods = async ({
  search,
  branchId,
  page,
  limit,
  kitchen,
  category,
}: Food) => {
  const res = await API.get("/menu/foods", {
    params: { search, branchId, page, limit, kitchen, category },
  });
  console.log("this is the foods", res.data);
  return res.data;
};
export const ViewFood = async (id?: string) => {
  const res = await API.get(`/menu/food/${id}`);
  console.log(" this is the view food ", res.data);
  return res.data.data;
};
export const DeleteFood = async (id?: string) => {
  const res = await API.delete(`/menu/food/${id}`);
  return res.data;
};
