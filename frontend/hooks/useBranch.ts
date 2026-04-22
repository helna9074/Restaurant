import page from "@/app/(dashboard)/page";
import { getBranches } from "@/service/API/branchApi";
import { useQuery } from "@tanstack/react-query";
import { Branch } from "@/types/branch";
interface Props{
    page?:number,
    search?:string
    all?:boolean
}
export const useBranches=({page=1,search="",all}:Props={})=>{
    const query=useQuery({
     queryKey:["branches",page,search,all],
     queryFn:()=>getBranches({page,limit:all?undefined :10,search,all}),
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