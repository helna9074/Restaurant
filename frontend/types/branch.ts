import { ReactNode } from "react"

export type Branch={
    _id:string,
    name:string,
    address:string,
    actions:React.ReactNode,
    state:string,
    country:string,
    city:string,
    phone:string,
    email:string,
    logo?:string|null
    createdAt?:string,
    reservationRequired?:boolean,
    HalalCertified?:boolean,
    workingDays?:string
}
export type Pagination={
  
    page:number,
    limit?:number,
    search?:string,
    all?:boolean

}
export type CustomerType={
  _id:string,
   branch:{
    _id:string,
    name:string
   },
    types:string[],
   
   
}
export type CustomerRow={
    branchId:string,
    branchName:string,
    type:string,
    action?:ReactNode

}
export type CustomerPayload={
    branchId:string,
   
    types:string[],


}
export type PaymentMethod={
    _id:string,
   branchId:string,
    paymethods:string[],
    

}
export type Paymentrow={
    branchId:string,
   
    paymethod:string,
    action?:ReactNode
}
export type PaymentPayload={
 
    branchId:string,
    paymethods:string[],
}