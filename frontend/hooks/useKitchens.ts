

import { GetKitchens } from "@/service/API/kitchen"
import { kitchenTableData } from "@/types/kitchen"
import { useQuery } from "@tanstack/react-query"

export const useKitchens=(branchId:string,search="")=>{
    const query=useQuery({
        queryKey:["kitchens",branchId],
        queryFn:()=>GetKitchens(branchId,search),
        enabled:!!branchId,
        staleTime: 2 * 60 * 1000,
    })
    const data:kitchenTableData[]=query.data?.data||[]
    return {...query,data}
}
