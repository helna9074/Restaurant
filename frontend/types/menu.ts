import  { ReactNode } from "react"

export type categoryTableData={
    _id:string,
    branchId:string,
    category:string,
    img:string,
    offer?:{
        isActive?:boolean,
         startDate?:string,
    endDate?:string,
    discount?:number,
    },
   
    action?:ReactNode
}
export type menuTableData={
    _id:string,
    branchId:string,
    menutype:string,
    action?:ReactNode
}