import { CustomerRow, CustomerType, PaymentMethod, Paymentrow } from "@/types/branch"

import { MenuItems } from "@headlessui/react"

export const FormatDate=(date:any)=>{
    if(!date) return "-"
    const d=new Date(date)
    const yyy=d.getFullYear()
    const mm=String(d.getMonth()+1).padStart(2,"0")
    const dd=String(d.getDate()).padStart(2,"0")
    return `${yyy}-${mm}-${dd}`
}
export const Rows=(data:CustomerType[]):CustomerRow[]=>{
    return data.flatMap(item=>
        item.types.map(type=>({
            branchId:item.branch._id,
            branchName:item.branch.name,
            type
        }))
    )

   
}
export const PaymentRows=(data:PaymentMethod[]):Paymentrow[]=>{
    console.log("thi si the data",data)
    return data.flatMap(item=>
        item.paymethods.map(paymethod=>({
            branchId:item.branchId,
            paymethod:paymethod,

        }))
    )
}
export const getValue = (obj: any, path: string) => {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
};