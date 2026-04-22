import z from "zod";

export const DepartmentSchema=z.object({
    selectedBranches:z.array(z.string()).min(1,"Select at least one branch").max(3,"Maximum 3 branches allowed"),
    departments:z.array(z.string()).min(1,"Select at least one department").max(5,"Maximum 5 departments allowed")
})
export type DepartmentFormData=z.infer<typeof DepartmentSchema>

export const PositionSchema=z.object({
    selectedBranches:z.string().min(1,"Select at least one branch"),
    selectedDepartment:z.string().min(1,"Select at least one department"),
    positions:z.array(z.string()).min(1,"Select at least one position").max(5,"Maximum 5 positions allowed")

})
export type PositionFormData=z.infer<typeof PositionSchema>

export const PersonalSchema=z.object({

    branch:z.string().min(1,"Select at least one branch"),
    firstName:z.string().min(2,"First name is required"),
    lastName:z.string().optional(),
    email:z.string().min(10,"email is required").email("invalid email"),
    phone:z.string().min(10,"phone is required"),
   address:z.string().optional(),
   nationality:z.string().min(2,"Nationality is required"),
   gender:z.string().min(3,"Gender is required"),
})
export type PersonalFormData=z.infer<typeof PersonalSchema>

export const WorkSchema=z.object({
    department:z.string().min(1,"Select at least one department"),
    position:z.string().min(1,"Select at least one position"),
    joiningDate: z
.string()
.min(1,"date is requird")
.regex(
    /^\d{4}-\d{2}-\d{2}$/,
    "Use YYYY-MM-DD"
  ),
    
    salary:z.number().min(1,"salary is required")

})
export type WorkFormData=z.infer<typeof WorkSchema>