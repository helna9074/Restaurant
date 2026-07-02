import { ReactNode } from "react";

export type categoryTableData = {
  _id: string;
  branchId: string;
  category: string;
  img: string;
  offer?: {
    isActive?: boolean;
    startDate?: string;
    endDate?: string;
    discount?: number;
  };

  action?: ReactNode;
};
export type menuTableData = {
  _id: string;
  branchId: string;
  menutype: string;
  action?: ReactNode;
};
export type addOnTableData = {
  _id: string;
  branchId: string;
  addOnName: string;
  portions: [{ portion: string; price: number }];
  action?: ReactNode;
};
export type AddOnOption = {
  _id: string;
  addOnName: string;
};
export type Food = {
  branchId: string;
  search?: string;
  page?: number;
  limit?: number;
  kitchen?: string;
  category?: string;
};
export type FoodTableData = {
  category: string;
  img: string;
  createdAt: string;
  foodName: string;
  kitchen: string;
  _id: string;
  action?: ReactNode;
  totalPages?: number;
};
export type FoodEditData = {
  _id: string;

  branchId: string;

  category: {
    _id: string;
    category: string;
  };

  kitchen: {
    _id: string;
    kitchen: string;
  };

  foodName: string;

  foodType: "veg" | "nonveg";

  menuTypes: ("Breakfast" | "Lunch" | "Dinner")[];

  course: "starter" | "maincourse" | "dessert";

  special: boolean;

  addOn: string[];

  portions: {
    portion: string;
    price: number;
  }[];

  offer?: {
    isActive?: boolean;
    startDate?: string;
    endDate?: string;
    discount?: number;
  };

  img: string;
};
export type Field = {
  key: string;
  text: string;
  type?: "text" | "date" | "array" | "boolean"; // optional, default is text
};
export type Section = {
  title: string;
  fields: Field[];
};
