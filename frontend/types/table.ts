import { ReactNode } from "react"

export type FloorPayload={
    branchId:string,
    floorName:string,
    count:number
}
export type FloorTableData={
    _id:string,
    branchId:string,
    name:string,
    count:number,
    restaurant:string,
    action?:ReactNode
}
export type TablePayload={
    branchId:string,
    floorName:string,
   table:string,
   capacity:number
}
export type TableData={
    _id:string,
    branchId:string,
    table:string,
    floor:string,
    floorName:string,
    capacity:number,
    restaurant:string,
    action?:ReactNode
}