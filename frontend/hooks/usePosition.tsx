import { GetPositions } from "@/service/API/departmentApi";
import { PositionType } from "@/types/department";
import { useQuery } from "@tanstack/react-query";

export const usePosition=(search="",selectedBranch:string)=>{
    const query=useQuery({
         queryKey:["position",search,selectedBranch],
             queryFn:()=>GetPositions(search,selectedBranch),
           
            enabled:!!selectedBranch,
            staleTime:2 * 60 * 1000,
    })

    const data:PositionType[]=query.data?.data??[]

    return {
        ...query,
        data
    }
}