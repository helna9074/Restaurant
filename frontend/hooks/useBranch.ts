import page from "@/app/(dashboard)/page";
import { getBranches } from "@/service/API/branchApi";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "./useDebounce";
import { Branch } from "@/types/branch";
interface Props{
    page?:number,
    search?:string
}
export const useBranches=({page=1,search=""}:Props={})=>{
    const query=useQuery({
     queryKey:["branches",page,search],
     queryFn:()=>getBranches({page,limit:10,search}),
       staleTime: 2 * 60 * 1000,
})

const branches:Branch[]=query.data?.data.branches??[]
const totalPage:number=query.data?.data?.totalPages ?? 1;
return{
    ...query,
    branches,
    totalPage
}
}