import { GetAddOns } from "@/service/API/MenuApi";
import { useQuery } from "@tanstack/react-query";

export const useAddOns = (search: "", branchId: string) => {
  const query = useQuery({
    queryKey: ["addOns", search, branchId],
    queryFn: () => GetAddOns(search, branchId),
    enabled: !!branchId,
    staleTime: 2 * 60 * 1000,
  });
  const addOns = query.data?.data ?? [];
  console.log("this is the addOns in the hook", addOns);
  return {
    ...query,
    addOns,
  };
};
