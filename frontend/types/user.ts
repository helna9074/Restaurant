import { ReactNode } from "react"

export type loginuser={

    username:string,
    role:string
}
export type AddUserData={
    email:string,
    password:string,
    employeeId:string,
    branchId:string
  
}
export type UserTableData={
   _id:string,
   employeeId:string,
    email:string,
    name:string,
    department:string,
    position:string,
    
    action?:ReactNode
}
export type UpdateUserData={
    id?:string,
    email:string,
    newpassword?:string,
    employeeId:string,
    branchId:string
}
export type UserFormValues = {
  email: string;
  employeeId: string;
  branchId: string;
  position: string;
  department: string;

  password?: string;
  confirmPassword?: string;
  newpassword?: string;
};
export type UserPayload = {
  email: string;
  employeeId: string;
  branchId: string;
  password?: string;
  newpassword?: string;
};