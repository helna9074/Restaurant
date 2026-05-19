import { FloorPayload, TablePayload } from "@/types/table";
import API from "./axiosInstance";

export const AddFloor = async ({
  branchId,
  floorName,
  count,
}: FloorPayload) => {
  const res = await API.post("t&f/floor", { branchId, floorName, count });
  return res.data;
};
export const GetFloors = async (branchId: string, search = "") => {
  const res = await API.get("t&f/floors", { params: { branchId, search } });
  console.log("this is the get api data", res);
  return res.data;
};
export const UpdateFloor = async ({
  id,
  floorName,
  count,
}: {
  id: string;
  floorName: string;
  count: number;
}) => {
  const res = await API.put(`t&f/floor/${id}`, { floorName, count });
  return res.data;
};
export const DeleteFloor = async (id: string) => {
  const res = await API.delete(`t&f/floor/${id}`);
  return res.data;
};
export const AddTable = async ({
  branchId,
  floorName,
  table,
  capacity,
}: TablePayload) => {
  console.log("this is the capacity", capacity);
  const res = await API.post("t&f/table", {
    branchId,
    floorName,
    table,
    capacity,
  });
  return res.data;
};
export const GetTables = async (branchId: string, search = "") => {
  const res = await API.get("t&f/tables", { params: { branchId, search } });
  console.log("this is the get api data", res);
  return res.data.data ?? [];
};
export const UpdateTable = async ({
  id,
  floorName,
  table,
  capacity,
}: {
  id: string;
  floorName: string;
  table: string;
  capacity: number;
}) => {
  const res = await API.put(`t&f/table/${id}`, { floorName, table, capacity });
  return res.data;
};
export const DeleteTable = async (id: string) => {
  const res = await API.delete(`t&f/table/${id}`);
  return res.data;
};
