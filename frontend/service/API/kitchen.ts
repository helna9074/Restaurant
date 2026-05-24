import API from "./axiosInstance";

export const AddKitchen = async ({
  branchId,
  kitchen,
}: {
  branchId: string;
  kitchen: string;
}) => {
  const res = await API.post("/kitchen/add", { branchId, kitchen });
  return res.data;
};
export const GetKitchens = async (branchId: string, search = "") => {
  const res = await API.get("/kitchen/all", { params: { branchId, search } });
  console.log("this is the get api data", res);
  return res.data;
};
export const UpdateKitchen = async ({
  id,
  kitchen,
}: {
  id: string;
  kitchen: string;
}) => {
  console.log("this is the id in update kitchen", id);
  const res = await API.put(`/kitchen/update/${id}`, { kitchen });
  return res.data;
};
export const DeleteKitchen = async (id: string) => {
  const res = await API.delete(`/kitchen/delete/${id}`);
  return res.data;
};