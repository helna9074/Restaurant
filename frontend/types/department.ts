import { PersonalFormData, WorkFormData } from "@/Schemas/departmentSchema"
import { ReactNode } from "react"

export type departmentType={
   _id:string,
    branch:{
        _id:string,
        name:string
    },
    department:string
        action?:ReactNode

}

export type departmentPayload={
    
    id:string,
    department:string
}
export type PositionType={
   _id:string,
    branch:{
        _id:string,
        name:string
    },
    department:{
        _id:string,
        department:string
    },
    position:string
        action?:ReactNode

}
export type PositionPayload={
    
    id:string,
    department:string,
    position:string
}
export type EmployeeFormState={
    personal:PersonalFormData|null,
    work:WorkFormData|null,
  
}
export type EmployeePayload={
   branch:string,
    personal:PersonalPayload|null,
    work:WorkFormData|null,
}
export type EmployeeTableData={
    _id:string,
    employeeCode?:string,
    branch?:string,
    firstName:string,
    lastName:string,
    email:string,
    phone:string,
   
    department:string,
    position:string,
   
    action?:ReactNode}
    export type PersonalPayload = Omit<PersonalFormData, "branch">;