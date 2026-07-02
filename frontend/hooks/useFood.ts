import { GetFoods } from "@/service/API/MenuApi";
import { Food } from "@/types/menu";
import { useQuery } from "@tanstack/react-query";

export const useFood = ({
  branchId,
  search,
  page,
  limit,
  kitchen,
  category,
}: Food) => {
  const query = useQuery({
    queryKey: ["food", branchId, search, page, limit, kitchen, category],
    queryFn: () =>
      GetFoods({ search, branchId, page, limit, kitchen, category }),
    enabled:
      !!branchId || !!search || !!page || !!limit || !!kitchen || !!category,
    staleTime: 2 * 60 * 1000,
  });
  const data = query.data?.data ?? [];

  return { ...query, data };
};
