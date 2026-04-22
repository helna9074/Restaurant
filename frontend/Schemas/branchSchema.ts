import {z} from 'zod'
export const branchSchema=z.object({
    name:z.string().min(4,"name is required"),
    address:z.string().min(5,"address is required"),
    country:z.string(),
    state:z.string().min(2,"select state"),
    city:z.string().min(2,"city is required"),
    workingDays:z.string().optional(),
    reservationRequired:z.boolean(),
    LanLine:z.string(),
    logo:z.any().optional(),
    openingtime:z.string().optional(),
    closingtime:z.string().optional(),
    ownername:z.string().min(2,"owner name is required"),
    email:z.string().min(10,"email is required").email("invalid email"),
    pretime:z.string().optional(),
    ordervalue:z.coerce.number().optional(),
    currency:z.string(),
    currencySymbol:z.string(),
    HalalCertified:z.boolean(),
    phone:z.string().min(10,"phone is required"),
})
export type BranchFormDAta=z.infer<typeof branchSchema>

export const CustomerSchema=z.object({
    selectedBranches:z.array(z.string()).min(1,"Select at least one branch"),
    customer:z.array(z.string()).min(1,"Select at least one customer type")
})
export type CustomerFormData=z.infer<typeof CustomerSchema>

export const PaymentSchema=z.object({
    selectedBranches:z.array(z.string()).min(1,"Select at least one branch"),
    payment:z.array(z.string()).min(1,"Select at least one customer type")
})
export type PaymentFormData=z.infer<typeof PaymentSchema>