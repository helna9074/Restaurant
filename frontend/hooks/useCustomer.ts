import { CustomerType } from "@/types/branch";
import { GetCustomers } from "@/service/API/branchApi";
import { useQuery } from "@tanstack/react-query";

interface Props {
 
  search?: string;
  branchId:string;
}
export const useCustomer=({search="",branchId}:Props)=>{
  console.log("useCustomer running")

  const query=useQuery({
    queryKey:["customerType",search,branchId],
    queryFn:()=>GetCustomers(search,branchId),
      staleTime: 2 * 60 * 1000,
   
  
  }) 
  console.log("this is the query data",query.data)
  const customerType:CustomerType[]=query.data?.data??[]

  console.log("this is the customerType",customerType)
  return {
    ...query,
    customerType,
   
  }  
}
