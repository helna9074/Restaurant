import { GetFloors } from "@/service/API/Floor&Table"
import { FloorTableData } from "@/types/table"
import { useQuery } from "@tanstack/react-query"

export const useFloor=(branchId:string,search="")=>{
    const query=useQuery({
        queryKey:["floor",branchId],
        queryFn:()=>GetFloors(branchId,search),
        enabled:!!branchId,
        staleTime: 2 * 60 * 1000,
    })
    const data:FloorTableData[]=query.data?.data||[]
    return {...query,data}
}
