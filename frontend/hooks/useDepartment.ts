import { GetAllDepartments } from "@/service/API/departmentApi";
import { departmentType } from "@/types/department";
import { useQuery } from "@tanstack/react-query";

export const useDepartment=(branchId="",search="",)=>{
    const query=useQuery({
     queryKey:["departments",branchId,search],
     queryFn:()=>GetAllDepartments(branchId,search),
     enabled:!!branchId,
       staleTime: 2 * 60 * 1000,
})

const data:departmentType[]=query.data??[]

return {
    ...query,
    data,
   
}
}