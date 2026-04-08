import { CustomerType, PaymentMethod } from "@/types/branch";
import { GetCustomers, GetPaymentMethods } from "@/service/API/branchApi";
import { useQuery } from "@tanstack/react-query";

interface Props{
  search?:string,
  branchId:string
}
export const usePayment=({branchId,search=""}:Props)=>{
  console.log("paymentmethod is  running")

  const query=useQuery({
    queryKey:["paymentMethod",branchId,search],
    queryFn:()=>GetPaymentMethods(branchId,search),
      staleTime: 2 * 60 * 1000,
   
  
  }) 
  console.log("this is the query data",query.data)
  const paymentMethod:PaymentMethod[]=query.data?.data??[]


  return {
    ...query,
    paymentMethod,

  }  
}
