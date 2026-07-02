import { GetCategories } from "@/service/API/MenuApi"
import { categoryTableData } from "@/types/menu";
import { useQuery } from "@tanstack/react-query"

export const useCategory = (selectedBranch:string,startDate:string|null="",endDate:string|null="",debouncedValue:string="",page:number=0) => {
    const query=useQuery({
        queryKey:["categories",selectedBranch,startDate,endDate, debouncedValue, ],
        queryFn:()=>GetCategories(selectedBranch,debouncedValue,startDate,endDate,page),
        enabled:!!selectedBranch,
        staleTime:2 * 60 * 1000,
      })
    const categories:categoryTableData[]=query.data?.data?.categories??[];
    return {
        ...query,
        categories
    }
}